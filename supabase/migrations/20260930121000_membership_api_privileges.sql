-- The signup limiter is an internal server operation, not a public RPC.
revoke all on function public.take_member_signup_slot(text) from public, anon, authenticated;
grant execute on function public.take_member_signup_slot(text) to service_role;
revoke all on public.church_members, public.member_change_requests, public.member_attendance, public.member_signup_limits from anon;
