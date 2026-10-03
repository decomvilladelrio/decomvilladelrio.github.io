-- Keep administration limited to the two explicitly authorized accounts.
create or replace function public.is_ipuc_admin()
returns boolean
language sql
stable
set search_path = public, pg_catalog
as $$
  select lower(coalesce((select auth.jwt()->>'email'), '')) in (
    'decomvilladelrio@gmail.com',
    'estebanarango1499@gmail.com'
  );
$$;
