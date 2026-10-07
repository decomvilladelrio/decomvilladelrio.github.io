begin;
create schema if not exists committee_private;
revoke all on schema committee_private from public, anon;
grant usage on schema committee_private to authenticated;

create table public.committees (
  id text primary key check (id ~ '^[a-z0-9-]{2,60}$'),
  name text not null check (length(name) between 2 and 100),
  color text not null default '#173b5b', active boolean not null default true
);
insert into public.committees(id,name) values
('decom','DECOM'),('damas','Damas Dorcas'),('caballeros','Caballeros'),('jovenes','Jóvenes'),
('evangelismo','Evangelismo'),('misiones','Misiones'),('musica','Música'),('familias','Red de familias'),
('escuela-dominical','Escuela Dominical'),('edad-dorada','Edad Dorada');
alter table public.committees enable row level security;
grant select,insert,update on public.committees to authenticated;
create policy committee_catalog on public.committees for select to authenticated using (true);
create policy committee_catalog_insert on public.committees for insert to authenticated with check (public.is_ipuc_admin());
create policy committee_catalog_update on public.committees for update to authenticated using (public.is_ipuc_admin()) with check (public.is_ipuc_admin());

alter table public.committee_leaders drop constraint committee_leaders_email_key;
create unique index committee_leader_email_scope on public.committee_leaders(lower(email),committee);
alter table public.committee_leaders add column role text not null default 'presidente' check (role in ('presidente','secretario','tesorero','coordinador','integrante','colaborador'));
alter table public.committee_leaders add column display_name text check(length(display_name)<=120);
alter table public.committee_leaders add column permissions text[] not null default '{}' check(permissions <@ array['task','meeting','invitation','file','announcement','team']);
-- Close the legacy administrator alias to the same two existing authorized accounts.
create or replace function public.ipuc_is_admin() returns boolean language sql stable set search_path=public,pg_catalog as $$ select public.is_ipuc_admin(); $$;

create function committee_private.member_in_scope(m public.church_members, c text)
returns boolean language sql stable set search_path=public,pg_catalog as $$
 select m.status='activo' and (
   exists(select 1 from jsonb_array_elements(coalesce(m.church_assignments,'[]')) a
     join public.committees k on k.id=c
     where lower(a->>'committee')=lower(k.name) or lower(a->>'committee')=lower(k.id))
   or exists(select 1 from public.committees k where k.id=c and
     lower(k.name)=any(string_to_array(lower(coalesce(m.church_committee,'')),' | ')))
 ); $$;
-- Narrow elevated lookup: reads only verified identity/directory and approved assignment membership.
-- Not exposed through PostgREST; never uses editable user_metadata or caller-supplied user IDs.
create function committee_private.allowed(c text, capability text default 'read') returns boolean
language plpgsql stable security definer set search_path=public,pg_catalog as $$
declare r public.committee_leaders; u uuid:=auth.uid();
begin
 if u is null or not exists(select 1 from auth.users where id=u and email_confirmed_at is not null
   and lower(email)=lower(auth.jwt()->>'email')) then return false; end if;
 if public.is_ipuc_admin() then return true; end if;
 if not exists(select 1 from public.committees where id=c and active) then return false; end if;
 select * into r from public.committee_leaders where lower(email)=lower(auth.jwt()->>'email') and committee=c and active limit 1;
 if r.id is null then return false; end if;
 if exists(select 1 from public.church_members where auth_user_id=u)
    and not exists(select 1 from public.church_members m where m.auth_user_id=u and committee_private.member_in_scope(m,c)) then return false; end if;
 return capability='read' or r.role in ('presidente','coordinador') or capability=any(r.permissions)
   or (r.role='secretario' and capability in ('meeting','file','announcement','team'));
end; $$;
revoke all on function committee_private.allowed(text,text) from public,anon;
grant execute on function committee_private.allowed(text,text) to authenticated;
revoke all on function committee_private.member_in_scope(public.church_members,text) from public,anon;

create table public.committee_items (
 id uuid primary key default gen_random_uuid(), committee text not null references public.committees,
 kind text not null check(kind in ('task','meeting','invitation','file','announcement')),
 title text not null check(length(title) between 1 and 180), description text not null default '' check(length(description)<=10000),
 status text not null default 'pendiente' check(status in ('pendiente','en-proceso','terminada','cancelada','aceptada','rechazada','en-revision','completada')),
 due_at timestamptz, event_id text, sender_committee text references public.committees,
 assignee_id uuid references public.church_members, priority text not null default 'normal' check(priority in ('baja','normal','alta')),
 details jsonb not null default '{}', files jsonb not null default '[]' check(jsonb_typeof(files)='array'),
 response_note text not null default '' check(length(response_note)<=4000), responded_by uuid references auth.users, responded_at timestamptz, responder_name text,
 created_by uuid not null default auth.uid() references auth.users, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index committee_items_scope on public.committee_items(committee,kind,due_at);
create index committee_items_sender on public.committee_items(sender_committee) where sender_committee is not null;
create index committee_items_assignee on public.committee_items(assignee_id) where assignee_id is not null;
alter table public.committee_items enable row level security;
grant select,insert,update on public.committee_items to authenticated;
create policy committee_item_read on public.committee_items for select to authenticated using (
 committee_private.allowed(committee) or (kind='invitation' and committee_private.allowed(sender_committee)));
create policy committee_item_create on public.committee_items for insert to authenticated with check (
 created_by=auth.uid() and (committee_private.allowed(committee,kind) and sender_committee is null
 or kind='invitation' and committee_private.allowed(sender_committee,'invitation')));
create policy committee_item_update on public.committee_items for update to authenticated using (
 committee_private.allowed(committee,kind) or (kind='invitation' and committee_private.allowed(sender_committee,'invitation'))
 or kind='task' and committee_private.allowed(committee) and exists(select 1 from public.church_members m where m.id=assignee_id and m.auth_user_id=auth.uid()))
 with check (committee_private.allowed(committee) or kind='invitation' and committee_private.allowed(sender_committee));

create table public.committee_audit (
 id bigint generated always as identity primary key, committee text not null references public.committees,
 item_id uuid, actor_id uuid not null, actor_name text not null default '', action text not null, title text not null, created_at timestamptz not null default now()
);
create index committee_audit_scope on public.committee_audit(committee,created_at desc);
alter table public.committee_audit enable row level security;
grant select on public.committee_audit to authenticated;
create policy committee_audit_read on public.committee_audit for select to authenticated using (committee_private.allowed(committee));
create function committee_private.guard_item() returns trigger language plpgsql set search_path=public,pg_catalog as $$
begin
 if length(new.details::text)>50000 or jsonb_array_length(new.files)>20 then raise exception 'Información demasiado extensa'; end if;
 if new.assignee_id is not null and not exists(select 1 from public.committee_team(new.committee) t where t.id=new.assignee_id) then raise exception 'Responsable fuera del comité'; end if;
 if exists(select 1 from jsonb_array_elements(new.files) f where f->>'bucket' is distinct from 'committee-files'
 or coalesce(f->>'path','') !~ '^[a-z0-9-]+/[a-f0-9-]{36}/[^/]+$'
 or (not public.is_ipuc_admin() and split_part(f->>'path','/',1)<>coalesce(new.sender_committee,new.committee))) then raise exception 'Archivo fuera del comité'; end if;
 if new.status<>all(case new.kind when 'task' then array['pendiente','en-proceso','terminada','cancelada'] when 'invitation' then array['pendiente','aceptada','rechazada','en-revision','completada'] when 'meeting' then array['pendiente','completada','cancelada'] else array['pendiente','completada'] end) then raise exception 'Estado inválido'; end if;
 if tg_op='INSERT' then
   new.created_by:=auth.uid(); new.created_at:=now(); new.responded_by:=null; new.responded_at:=null; new.responder_name:=null;new.response_note:='';
 else
   if (new.id,new.committee,new.kind,new.sender_committee,new.created_by,new.created_at) is distinct from (old.id,old.committee,old.kind,old.sender_committee,old.created_by,old.created_at) then raise exception 'Identidad inmutable'; end if;
   if not public.is_ipuc_admin() and new.kind='invitation' and new.sender_committee is not null then
     if committee_private.allowed(new.committee,'invitation') then
       if (to_jsonb(new)-array['status','response_note','responded_by','responded_at','responder_name','updated_at']) is distinct from (to_jsonb(old)-array['status','response_note','responded_by','responded_at','responder_name','updated_at']) then raise exception 'Solo puedes responder la invitación'; end if;
     elsif new.status<>old.status or new.response_note<>old.response_note then raise exception 'La respuesta corresponde al comité invitado'; end if;
   elsif not committee_private.allowed(new.committee,new.kind) then
     if (to_jsonb(new)-array['status','updated_at']) is distinct from (to_jsonb(old)-array['status','updated_at']) then raise exception 'Solo puedes actualizar el estado de tu tarea'; end if;
   end if;
   new.responded_by:=old.responded_by; new.responded_at:=old.responded_at;new.responder_name:=old.responder_name;
   if new.kind='invitation' and (new.status,new.response_note) is distinct from (old.status,old.response_note) then new.responded_by:=auth.uid();new.responded_at:=now();new.responder_name:=auth.jwt()->>'email'; end if;
 end if;
 new.updated_at:=now(); return new;
end; $$;
create trigger committee_guard before insert or update on public.committee_items for each row execute function committee_private.guard_item();
create function committee_private.audit_item() returns trigger language plpgsql security definer set search_path=public,pg_catalog as $$
begin
 if auth.uid() is null then raise exception 'Sesión requerida'; end if;
 insert into public.committee_audit(committee,item_id,actor_id,actor_name,action,title) values(new.committee,new.id,auth.uid(),auth.jwt()->>'email',case when tg_op='INSERT' then 'Creado' else 'Actualizado · '||new.status end,new.title);
 if new.sender_committee is not null and new.sender_committee<>new.committee then
 insert into public.committee_audit(committee,item_id,actor_id,actor_name,action,title) values(new.sender_committee,new.id,auth.uid(),auth.jwt()->>'email','Invitación · '||new.status,new.title); end if;
 return new;
end; $$;
revoke all on function committee_private.audit_item() from public,anon,authenticated;
create trigger committee_audit_write after insert or update on public.committee_items for each row execute function committee_private.audit_item();

create table public.committee_team_roles (
 committee text references public.committees, member_id uuid references public.church_members, function text not null check(length(function)<=120),
 primary key(committee,member_id)
);
alter table public.committee_team_roles enable row level security;
grant select,insert,update on public.committee_team_roles to authenticated;
create policy committee_team_role_read on public.committee_team_roles for select to authenticated using(committee_private.allowed(committee,'team'));
create policy committee_team_role_create on public.committee_team_roles for insert to authenticated with check(committee_private.allowed(committee,'team'));
create policy committee_team_role_update on public.committee_team_roles for update to authenticated using(committee_private.allowed(committee,'team')) with check(committee_private.allowed(committee,'team'));
-- Minimal authorized roster only: no document, address, religious answers, birthdate or entire member row.
create function committee_private.team(c text) returns table(id uuid,full_name text,church_role text,phone text,email text,status text,internal_function text,photo_path text)
language plpgsql stable security definer set search_path=public,pg_catalog as $$
begin
 if not committee_private.allowed(c,'team') then raise exception 'No autorizado' using errcode='42501'; end if;
 return query select m.id,m.full_name,m.church_role,m.phone,m.email,m.status,r.function,case when m.photo_consent then m.photo_path else null end from public.church_members m
 left join public.committee_team_roles r on r.member_id=m.id and r.committee=c
 where committee_private.member_in_scope(m,c) order by m.full_name;
end; $$;
revoke all on function committee_private.team(text) from public,anon;
grant execute on function committee_private.team(text) to authenticated;
create function public.committee_team(c text) returns table(id uuid,full_name text,church_role text,phone text,email text,status text,internal_function text,photo_path text)
language sql stable security invoker set search_path=public,pg_catalog as $$select * from committee_private.team(c);$$;
revoke all on function public.committee_team(text) from public,anon;
grant execute on function public.committee_team(text) to authenticated;

create function public.committee_access(c text) returns jsonb language sql stable security invoker set search_path=public,pg_catalog as $$
 select jsonb_build_object('read',committee_private.allowed(c),'task',committee_private.allowed(c,'task'),'meeting',committee_private.allowed(c,'meeting'),
 'invitation',committee_private.allowed(c,'invitation'),'file',committee_private.allowed(c,'file'),'announcement',committee_private.allowed(c,'announcement'),'team',committee_private.allowed(c,'team'),'admin',public.is_ipuc_admin()); $$;
revoke all on function public.committee_access(text) from public,anon;
grant execute on function public.committee_access(text) to authenticated;

create table public.committee_comments (
 id uuid primary key default gen_random_uuid(),item_id uuid references public.committee_items not null,
 author_id uuid not null default auth.uid(), author_name text not null default '',body text not null check(length(body) between 1 and 4000),created_at timestamptz not null default now()
);
alter table public.committee_comments enable row level security;
grant select,insert on public.committee_comments to authenticated;
create policy committee_comment_read on public.committee_comments for select to authenticated using(exists(select 1 from public.committee_items i where i.id=item_id));
create policy committee_comment_write on public.committee_comments for insert to authenticated with check(author_id=auth.uid() and exists(select 1 from public.committee_items i where i.id=item_id));
create function committee_private.guard_comment() returns trigger language plpgsql set search_path=public,pg_catalog as $$
begin new.author_id:=auth.uid();new.author_name:=auth.jwt()->>'email';new.created_at:=now();return new;end;$$;
create trigger committee_comment_identity before insert on public.committee_comments for each row execute function committee_private.guard_comment();
create table public.committee_notification_reads (
 user_id uuid not null default auth.uid(),committee text references public.committees,last_read timestamptz not null default now(),primary key(user_id,committee)
);
alter table public.committee_notification_reads enable row level security;
grant select,insert,update on public.committee_notification_reads to authenticated;
create policy committee_notifications_own on public.committee_notification_reads for all to authenticated using(user_id=auth.uid() and committee_private.allowed(committee)) with check(user_id=auth.uid() and committee_private.allowed(committee));

insert into storage.buckets(id,name,public,file_size_limit) values('committee-files','committee-files',false,52428800) on conflict(id) do nothing;
create policy committee_storage_read on storage.objects for select to authenticated using(bucket_id='committee-files' and (
 committee_private.allowed((storage.foldername(name))[1]) or exists(select 1 from public.committee_items i,jsonb_array_elements(i.files) f where f->>'path'=name and f->>'bucket'='committee-files')));
create policy committee_storage_write on storage.objects for insert to authenticated with check(bucket_id='committee-files' and committee_private.allowed((storage.foldername(name))[1],'file'));
create policy committee_storage_delete on storage.objects for delete to authenticated using(bucket_id='committee-files' and committee_private.allowed((storage.foldername(name))[1],'file'));

-- Add requested DECOM authorization without replacing any existing directory entry.
insert into public.committee_leaders(id,email,committee,role,display_name,active)
values('leader-esteban-decom','estebanarango1499@gmail.com','decom','presidente','Esteban Arango',true)
on conflict(lower(email),committee) do nothing;

create function committee_private.photo_allowed(p text) returns boolean language sql stable security definer set search_path=public,pg_catalog as $$
 select auth.uid() is not null and exists(select 1 from public.church_members m,public.committees c
 where m.photo_path=p and m.photo_consent and committee_private.member_in_scope(m,c.id) and committee_private.allowed(c.id,'team')); $$;
revoke all on function committee_private.photo_allowed(text) from public,anon;
grant execute on function committee_private.photo_allowed(text) to authenticated;
create policy committee_roster_photo on storage.objects for select to authenticated using(bucket_id='membership-photos' and committee_private.photo_allowed(name));

create unique index committee_meeting_commitment on public.committee_items((details->>'source_meeting'),(details->>'commitment_number')) where kind='task' and details ? 'source_meeting';
create function public.committee_commitments(meeting_id uuid) returns integer language plpgsql security invoker set search_path=public,pg_catalog as $$
declare m public.committee_items; line text; n integer:=0; added integer:=0; changed integer;
begin
 select * into m from public.committee_items where id=meeting_id and kind='meeting';
 if m.id is null or not committee_private.allowed(m.committee,'task') then raise exception 'No autorizado' using errcode='42501';end if;
 foreach line in array string_to_array(coalesce(m.details->>'commitments',''),E'\n') loop
 n:=n+1;
 if trim(line)<>'' then
 insert into public.committee_items(committee,kind,title,description,details)
 values(m.committee,'task',left(trim(line),180),'Compromiso de reunión: '||m.title,jsonb_build_object('source_meeting',m.id,'commitment_number',n)) on conflict do nothing;
 get diagnostics changed=row_count;added:=added+changed;
 end if;end loop;return added;
end;$$;
revoke all on function public.committee_commitments(uuid) from public,anon;
grant execute on function public.committee_commitments(uuid) to authenticated;

create function committee_private.audit_admin() returns trigger language plpgsql security definer set search_path=public,pg_catalog as $$
declare c text; title text;
begin
 if auth.uid() is null then raise exception 'Sesión requerida';end if;
 if tg_table_name='committee_leaders' then
 c:=case when tg_op='DELETE' then old.committee else new.committee end;title:='Permisos de cuenta';
 elsif tg_table_name='committee_team_roles' then c:=new.committee;title:='Función interna del equipo';
 else c:=new.id;title:='Configuración del comité';end if;
 insert into public.committee_audit(committee,actor_id,actor_name,action,title) values(c,auth.uid(),auth.jwt()->>'email',tg_op,title);
 if tg_op='DELETE' then return old;else return new;end if;
end;$$;
revoke all on function committee_private.audit_admin() from public,anon,authenticated;
create trigger committee_directory_audit after insert or update or delete on public.committee_leaders for each row execute function committee_private.audit_admin();
create trigger committee_catalog_audit after insert or update on public.committees for each row execute function committee_private.audit_admin();
create trigger committee_team_audit after insert or update on public.committee_team_roles for each row execute function committee_private.audit_admin();
revoke all on function committee_private.guard_item(),committee_private.guard_comment() from public,anon,authenticated;
commit;
