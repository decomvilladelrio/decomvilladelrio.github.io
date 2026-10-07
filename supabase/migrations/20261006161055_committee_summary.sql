create function public.committee_summary(c text,month_start timestamptz) returns jsonb language sql stable security invoker set search_path=public,pg_catalog as $$
 select jsonb_build_object(
 'pending_tasks',count(*) filter(where kind='task' and status in ('pendiente','en-proceso')),
 'pending_invitations',count(*) filter(where kind='invitation' and status='pendiente'),
 'pending_meetings',count(*) filter(where kind='meeting' and status='pendiente'),
 'completed_tasks',count(*) filter(where kind='task' and status='terminada' and updated_at>=month_start),
 'monthly',jsonb_build_object(
 'task',count(*) filter(where kind='task' and created_at>=month_start),
 'meeting',count(*) filter(where kind='meeting' and created_at>=month_start),
 'invitation',count(*) filter(where kind='invitation' and created_at>=month_start),
 'file',count(*) filter(where kind='file' and created_at>=month_start),
 'announcement',count(*) filter(where kind='announcement' and created_at>=month_start)),
 'notifications',(select count(*) from public.committee_audit a where a.committee=c and a.actor_id<>(select auth.uid())
 and a.created_at>coalesce((select last_read from public.committee_notification_reads where committee=c and user_id=(select auth.uid())),'epoch'::timestamptz)))
 from public.committee_items where committee=c and committee_private.allowed(c);$$;
revoke all on function public.committee_summary(text,timestamptz) from public,anon;
grant execute on function public.committee_summary(text,timestamptz) to authenticated;
