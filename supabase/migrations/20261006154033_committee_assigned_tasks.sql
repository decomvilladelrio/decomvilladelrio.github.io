-- Minimal private identity lookup: membership rows remain inaccessible to ordinary accounts.
create function committee_private.is_assignee(member_id uuid) returns boolean language sql stable security definer set search_path=public,pg_catalog as $$
select auth.uid() is not null and exists(select 1 from public.church_members where id=member_id and auth_user_id=auth.uid() and status='activo');$$;
revoke all on function committee_private.is_assignee(uuid) from public,anon;
grant execute on function committee_private.is_assignee(uuid) to authenticated;
drop policy committee_item_update on public.committee_items;
create policy committee_item_update on public.committee_items for update to authenticated using (
 committee_private.allowed(committee,kind) or (kind='invitation' and committee_private.allowed(sender_committee,'invitation'))
 or kind='task' and committee_private.allowed(committee) and committee_private.is_assignee(assignee_id))
 with check (committee_private.allowed(committee) or kind='invitation' and committee_private.allowed(sender_committee));
create function public.committee_task_access(task_id uuid) returns boolean language sql stable security invoker set search_path=public,pg_catalog as $$
 select exists(select 1 from public.committee_items i where id=task_id and kind='task' and
 (committee_private.allowed(committee,'task') or committee_private.is_assignee(assignee_id)));$$;
revoke all on function public.committee_task_access(uuid) from public,anon;
grant execute on function public.committee_task_access(uuid) to authenticated;
create index committee_comments_item on public.committee_comments(item_id,created_at);
