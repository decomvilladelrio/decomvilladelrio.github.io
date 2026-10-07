revoke all on public.committees,public.committee_items,public.committee_audit,public.committee_team_roles,public.committee_comments,public.committee_notification_reads from anon;
revoke all on public.committees,public.committee_items,public.committee_audit,public.committee_team_roles,public.committee_comments,public.committee_notification_reads from authenticated;
grant select,insert,update on public.committees,public.committee_items,public.committee_team_roles,public.committee_notification_reads to authenticated;
grant select,insert on public.committee_comments to authenticated;
grant select on public.committee_audit to authenticated;
create or replace function committee_private.member_in_scope(m public.church_members, c text)
returns boolean language sql stable set search_path=public,pg_catalog as $$
 select m.status='activo' and (
   exists(select 1 from jsonb_array_elements(coalesce(m.church_assignments,'[]')) a join public.committees k on k.id=c
     where replace(lower(a->>'committee'),'red de familias','red de familia')=replace(lower(k.name),'red de familias','red de familia') or lower(a->>'committee')=lower(k.id))
   or exists(select 1 from public.committees k where k.id=c and
     replace(lower(k.name),'red de familias','red de familia')=any(string_to_array(replace(lower(coalesce(m.church_committee,'')),'red de familias','red de familia'),' | ')))
 ); $$;
