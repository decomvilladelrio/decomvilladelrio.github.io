alter table public.committee_items add constraint committee_details_object check(jsonb_typeof(details)='object');
alter table public.committee_items add constraint committee_files_metadata_limit check(length(files::text)<=50000);
alter table public.committees add constraint committee_color_format check(color ~ '^#[a-fA-F0-9]{6}$');
alter table public.committee_leaders add constraint committee_directory_scope_fk foreign key(committee) references public.committees(id);
alter table public.committee_leaders add constraint committee_directory_email_format check(email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$');
drop policy committee_team_role_create on public.committee_team_roles;
drop policy committee_team_role_update on public.committee_team_roles;
create policy committee_team_role_create on public.committee_team_roles for insert to authenticated with check(
 committee_private.allowed(committee,'team') and exists(select 1 from public.committee_team(committee) t where t.id=member_id));
create policy committee_team_role_update on public.committee_team_roles for update to authenticated using(committee_private.allowed(committee,'team')) with check(
 committee_private.allowed(committee,'team') and exists(select 1 from public.committee_team(committee) t where t.id=member_id));
