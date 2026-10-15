begin;
create table public.library_resources (
 id uuid primary key default gen_random_uuid(),
 title text not null check(length(trim(title)) between 2 and 160),
 description text not null default '' check(length(description)<=4000),
 category text not null check(length(category) between 2 and 100),
 tags text[] not null default '{}' check(cardinality(tags)<=30 and octet_length(tags::text)<=3000),
 usage text not null default '' check(length(usage)<=80),
 orientation text not null default '' check(orientation in ('','16:9','9:16','1:1','Horizontal','Vertical')),
 content_type text not null default 'editable' check(content_type in ('editable','estatico','animado','documento','audio','paquete')),
 department text not null default '' check(length(department)<=100),
 collection text not null default '' check(length(collection)<=100),
 resolution text not null default '' check(length(resolution)<=80),
 attribution text not null default 'IPUC Villa del Río' check(length(attribution)<=180),
 license text not null check(length(license) between 2 and 500),
 redistribution_confirmed boolean not null default false,
 preview_path text not null check(preview_path like id::text || '/preview/%'),
 sample_path text check(sample_path is null or sample_path like id::text || '/sample/%'),
 sample_mime text check(sample_mime is null or sample_mime in ('video/mp4','video/webm','audio/mpeg','audio/wav','audio/ogg')),
 file_path text not null check(file_path like id::text || '/source/%'),
 file_name text not null check(length(file_name) between 1 and 200 and file_name !~ '[\/\\]'),
 file_size bigint not null check(file_size between 1 and 52428800),
 published boolean not null default false,
 featured boolean not null default false,
 created_by uuid not null default auth.uid() references auth.users(id),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 check(not published or redistribution_confirmed),
 check((sample_path is null) = (sample_mime is null))
);
alter table public.library_resources enable row level security;
grant select on public.library_resources to anon, authenticated;
grant insert,update on public.library_resources to authenticated;
create policy library_public_read on public.library_resources for select to anon,authenticated using(published or public.is_ipuc_admin());
create policy library_admin_insert on public.library_resources for insert to authenticated with check(public.is_ipuc_admin() and created_by=(select auth.uid()));
create policy library_admin_update on public.library_resources for update to authenticated using(public.is_ipuc_admin()) with check(public.is_ipuc_admin());
create index library_resources_public_date on public.library_resources(updated_at desc,id) where published;
create index library_resources_category on public.library_resources(category) where published;

create table public.library_resource_versions (
 id bigint generated always as identity primary key,
 resource_id uuid not null references public.library_resources(id),
 snapshot jsonb not null,
 actor_id uuid default auth.uid() references auth.users(id),
 created_at timestamptz not null default now()
);
alter table public.library_resource_versions enable row level security;
grant select,insert on public.library_resource_versions to authenticated;
grant usage on sequence public.library_resource_versions_id_seq to authenticated;
create policy library_versions_read on public.library_resource_versions for select to authenticated using(public.is_ipuc_admin());
create policy library_versions_write on public.library_resource_versions for insert to authenticated with check(public.is_ipuc_admin() and actor_id=(select auth.uid()));
create index library_versions_resource on public.library_resource_versions(resource_id,created_at desc);
create function public.library_stamp() returns trigger language plpgsql set search_path=public,pg_catalog as $$
begin
 if tg_op='UPDATE' then new.id:=old.id;new.created_by:=old.created_by;new.created_at:=old.created_at;end if;
 new.updated_at:=now();return new;
end;$$;
create function public.library_version() returns trigger language plpgsql set search_path=public,pg_catalog as $$
begin
 insert into public.library_resource_versions(resource_id,snapshot,actor_id) values(new.id,to_jsonb(new),auth.uid());return new;
end;$$;
revoke all on function public.library_stamp(),public.library_version() from public,anon,authenticated;
create trigger library_stamp before insert or update on public.library_resources for each row execute function public.library_stamp();
create trigger library_version after insert or update on public.library_resources for each row execute function public.library_version();

create table public.library_favorites (
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 resource_key text not null check(length(resource_key) between 1 and 2048),
 created_at timestamptz not null default now(),
 primary key(user_id,resource_key)
);
alter table public.library_favorites enable row level security;
grant select,insert,delete on public.library_favorites to authenticated;
create policy library_favorites_read on public.library_favorites for select to authenticated using(user_id=(select auth.uid()));
create policy library_favorites_insert on public.library_favorites for insert to authenticated with check(user_id=(select auth.uid()));
create policy library_favorites_delete on public.library_favorites for delete to authenticated using(user_id=(select auth.uid()));

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
 ('resource-previews','resource-previews',true,52428800,array['image/jpeg','image/png','image/webp','video/mp4','video/webm','audio/mpeg','audio/wav','audio/ogg']),
 ('resource-files','resource-files',false,52428800,null)
on conflict(id) do nothing;
create policy library_preview_read on storage.objects for select to anon,authenticated using(bucket_id='resource-previews' and (public.is_ipuc_admin() or exists(select 1 from public.library_resources r where r.published and (r.preview_path=name or r.sample_path=name))));
create policy library_file_read on storage.objects for select to anon,authenticated using(bucket_id='resource-files' and (public.is_ipuc_admin() or exists(select 1 from public.library_resources r where r.published and r.file_path=name)));
create policy library_storage_insert on storage.objects for insert to authenticated with check(bucket_id in ('resource-previews','resource-files') and public.is_ipuc_admin());
create policy library_storage_update on storage.objects for update to authenticated using(bucket_id in ('resource-previews','resource-files') and public.is_ipuc_admin()) with check(bucket_id in ('resource-previews','resource-files') and public.is_ipuc_admin());
create policy library_storage_cleanup on storage.objects for delete to authenticated using(bucket_id in ('resource-previews','resource-files') and public.is_ipuc_admin());
commit;
