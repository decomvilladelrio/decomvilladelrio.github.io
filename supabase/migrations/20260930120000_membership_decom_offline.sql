-- Additive profile fields; existing members keep their original data and permissions.
do $$
declare t text;
begin
  foreach t in array array['church_members','member_change_requests'] loop
    execute format('alter table public.%I
      add column if not exists education_level text,
      add column if not exists current_situation text[] not null default ''{}'',
      add column if not exists experience_level text,
      add column if not exists experience_notes text,
      add column if not exists availability text[] not null default ''{}'',
      add column if not exists availability_notes text,
      add column if not exists training_willingness text,
      add column if not exists service_notes text,
      add column if not exists church_assignments jsonb not null default ''[]''', t);
  end loop;
end $$;

alter table public.church_members drop constraint if exists church_members_skills_limit;
alter table public.church_members add constraint church_members_skills_limit check(cardinality(skills) <= 100);
alter table public.member_change_requests drop constraint if exists member_change_requests_skills_limit;
alter table public.member_change_requests add constraint member_change_requests_skills_limit check(cardinality(skills) <= 100);

alter table public.church_members
  add column if not exists sync_id uuid,
  add column if not exists registered_by uuid references auth.users(id),
  add column if not exists registered_offline_at timestamptz;
create unique index if not exists church_members_sync_id_unique on public.church_members(sync_id) where sync_id is not null;
create index if not exists church_members_skills_gin on public.church_members using gin(skills);
create index if not exists church_members_interests_gin on public.church_members using gin(support_interests);
create index if not exists church_members_availability_gin on public.church_members using gin(availability);

-- A DECOM registration needs a document, even when the member has no church role.
alter table public.church_members drop constraint if exists church_members_document_pair;
alter table public.church_members add constraint church_members_document_pair check (
  (document_type is null and document_number is null) or
  (document_type in ('CC','TI','CE','PA','RC','PPT') and document_number ~ '^[A-Z0-9][A-Z0-9.-]{2,31}$')
);

create or replace function public.can_register_decom()
returns boolean language sql stable security invoker
set search_path = pg_catalog, public
as $$ select auth.uid() is not null and public.is_ipuc_admin(); $$;
revoke all on function public.can_register_decom() from public, anon;
grant execute on function public.can_register_decom() to authenticated;

-- Copy the new profile when an administrator approves a verified change request.
create or replace function public.copy_member_service_profile()
returns trigger language plpgsql security invoker
set search_path = pg_catalog, public
as $$
begin
  if new.status = 'aprobado' and old.status = 'pendiente' then
    update public.church_members set education_level=new.education_level,
      current_situation=new.current_situation, experience_level=new.experience_level,
      experience_notes=new.experience_notes, availability=new.availability,
      availability_notes=new.availability_notes, training_willingness=new.training_willingness,
      service_notes=new.service_notes, church_assignments=new.church_assignments
    where id=new.member_id;
  end if;
  return new;
end $$;
revoke all on function public.copy_member_service_profile() from public, anon, authenticated;
drop trigger if exists copy_service_profile_on_approval on public.member_change_requests;
create trigger copy_service_profile_on_approval after update of status on public.member_change_requests
  for each row execute function public.copy_member_service_profile();
