-- One Auth identity may own at most one membership. Existing records stay unlinked.
alter table public.church_members add column if not exists auth_user_id uuid references auth.users(id) on delete set null;
create unique index if not exists church_members_auth_user_unique on public.church_members(auth_user_id) where auth_user_id is not null;

create table if not exists public.account_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  providers text[] not null default '{}',
  email_verified boolean not null default false,
  last_sign_in_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.account_profiles enable row level security;
revoke all on public.account_profiles from public, anon, authenticated;
grant select on public.account_profiles to authenticated;
grant all on public.account_profiles to service_role;
create policy "Account owner and administrators read profiles" on public.account_profiles
  for select to authenticated using ((select auth.uid()) = id or public.is_ipuc_admin());

-- Metadata is used only for display. It never grants privileges.
create or replace function public.refresh_account_profile()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.account_profiles(id,email,display_name,avatar_url,providers,email_verified,last_sign_in_at,created_at)
  values(new.id,new.email,left(coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name',''),140),
    case when new.raw_user_meta_data->>'avatar_url' like 'https://%' then new.raw_user_meta_data->>'avatar_url' else null end,
    array(select jsonb_array_elements_text(coalesce(new.raw_app_meta_data->'providers','[]'::jsonb))),
    new.email_confirmed_at is not null,new.last_sign_in_at,new.created_at)
  on conflict(id) do update set email=excluded.email, display_name=excluded.display_name,
    avatar_url=excluded.avatar_url, providers=excluded.providers,email_verified=excluded.email_verified,last_sign_in_at=excluded.last_sign_in_at;
  return new;
end $$;
revoke all on function public.refresh_account_profile() from public,anon,authenticated;
create trigger refresh_ipuc_account after insert or update of email,email_confirmed_at,raw_user_meta_data,raw_app_meta_data,last_sign_in_at
  on auth.users for each row execute function public.refresh_account_profile();
insert into public.account_profiles(id,email,display_name,avatar_url,providers,email_verified,last_sign_in_at,created_at)
select id,email,left(coalesce(raw_user_meta_data->>'full_name',raw_user_meta_data->>'name',''),140),
  case when raw_user_meta_data->>'avatar_url' like 'https://%' then raw_user_meta_data->>'avatar_url' else null end,
  array(select jsonb_array_elements_text(coalesce(raw_app_meta_data->'providers','[]'::jsonb))),
  email_confirmed_at is not null,last_sign_in_at,created_at from auth.users on conflict(id) do nothing;

-- Only the authenticated Edge Function can call this, after checking the Auth user.
-- Row lock + unique index prevent concurrent claims and duplicate memberships.
create or replace function public.link_member_account(p_user_id uuid,p_email text,p_document_type text,p_document_number text,p_birth_date date)
returns uuid language plpgsql security invoker set search_path = '' as $$
declare member_id uuid; existing_owner uuid;
begin
  select id,auth_user_id into member_id,existing_owner from public.church_members
    where lower(trim(email))=lower(trim(p_email)) and document_type=p_document_type
      and upper(document_number)=upper(trim(p_document_number)) and birth_date=p_birth_date for update;
  if member_id is null or (existing_owner is not null and existing_owner<>p_user_id) then raise exception 'identity_not_verified'; end if;
  update public.church_members set auth_user_id=p_user_id where id=member_id;
  return member_id;
end $$;
revoke all on function public.link_member_account(uuid,text,text,text,date) from public,anon,authenticated;
grant execute on function public.link_member_account(uuid,text,text,text,date) to service_role;
