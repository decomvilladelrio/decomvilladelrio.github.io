create function committee_private.leadership(c text) returns boolean language sql stable security invoker set search_path=public,pg_catalog as $$
 select committee_private.allowed(c) and (public.is_ipuc_admin() or exists(select 1 from public.committee_leaders
 where committee=c and active and lower(email)=lower(auth.jwt()->>'email') and role in ('presidente','coordinador','secretario','tesorero')));$$;
revoke all on function committee_private.leadership(text) from public,anon;
grant execute on function committee_private.leadership(text) to authenticated;
drop policy committee_item_read on public.committee_items;
create policy committee_item_read on public.committee_items for select to authenticated using (
 committee_private.allowed(committee) and (kind<>'announcement' or details->>'target_audience' is distinct from 'leaders' or committee_private.leadership(committee))
 or kind='invitation' and committee_private.allowed(sender_committee));
drop policy committee_audit_read on public.committee_audit;
create policy committee_audit_read on public.committee_audit for select to authenticated using (
 committee_private.allowed(committee) and (item_id is null or exists(select 1 from public.committee_items i where i.id=item_id)));
-- Leader-only broadcasts are text: private library files are otherwise shared with the whole committee.
alter table public.committee_items add constraint committee_leader_announcement_files check (
 kind<>'announcement' or details->>'target_audience' is distinct from 'leaders' or jsonb_array_length(files)=0);
create index committee_item_month on public.committee_items(committee,kind,created_at desc);
