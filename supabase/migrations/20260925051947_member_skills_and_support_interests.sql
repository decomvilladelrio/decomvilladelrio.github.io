alter table public.church_members
  add column if not exists skills text[] not null default '{}',
  add column if not exists occupation text,
  add column if not exists support_interests text[] not null default '{}',
  add constraint church_members_skills_limit check (cardinality(skills) <= 20),
  add constraint church_members_support_interests_limit check (cardinality(support_interests) <= 20),
  add constraint church_members_occupation_length check (occupation is null or char_length(occupation) <= 120);

alter table public.member_change_requests
  add column if not exists skills text[] not null default '{}',
  add column if not exists occupation text,
  add column if not exists support_interests text[] not null default '{}',
  add constraint member_change_requests_skills_limit check (cardinality(skills) <= 20),
  add constraint member_change_requests_support_interests_limit check (cardinality(support_interests) <= 20),
  add constraint member_change_requests_occupation_length check (occupation is null or char_length(occupation) <= 120);

comment on column public.church_members.skills is 'Habilidades declaradas voluntariamente; visibles solo para administración autorizada.';
comment on column public.church_members.occupation is 'Oficio o profesión declarado voluntariamente; visible solo para administración autorizada.';
comment on column public.church_members.support_interests is 'Áreas en las que el miembro desea apoyar; no asigna cargos automáticamente.';

grant update on public.member_change_requests to authenticated;
drop policy if exists "Admins update member changes" on public.member_change_requests;
create policy "Admins update member changes" on public.member_change_requests
  for update to authenticated using (public.is_ipuc_admin()) with check (public.is_ipuc_admin());

create or replace function public.review_member_change_request(p_request_id uuid, p_approve boolean)
returns void
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare request_row public.member_change_requests%rowtype;
begin
  if not public.is_ipuc_admin() then raise exception 'not authorized'; end if;
  select * into request_row from public.member_change_requests where id = p_request_id for update;
  if not found or request_row.status <> 'pendiente' then raise exception 'request unavailable'; end if;
  if p_approve then
    update public.church_members set
      full_name = request_row.full_name, address = request_row.address, email = request_row.email,
      phone = request_row.phone, document_type = request_row.document_type, document_number = request_row.document_number,
      birth_date = request_row.birth_date, is_baptized = request_row.is_baptized, baptism_date = request_row.baptism_date,
      filled_with_holy_spirit = request_row.filled_with_holy_spirit,
      has_church_role = request_row.has_church_role, church_role = request_row.church_role,
      church_committee = request_row.church_committee,
      skills = request_row.skills, occupation = request_row.occupation, support_interests = request_row.support_interests,
      photo_path = coalesce(request_row.photo_path, photo_path), attendance_consent = request_row.attendance_consent,
      attendance_consent_at = case when request_row.attendance_consent then coalesce(attendance_consent_at, now()) else null end,
      photo_consent = request_row.photo_consent, photo_consent_at = request_row.photo_consent_at,
      sensitive_data_consent = request_row.sensitive_data_consent,
      sensitive_data_consent_at = request_row.sensitive_data_consent_at,
      consent_version = request_row.consent_version,
      guardian_full_name = request_row.guardian_full_name,
      guardian_consent = request_row.guardian_consent,
      minor_informed_consent = request_row.minor_informed_consent,
      updated_at = now()
    where id = request_row.member_id;
  end if;
  update public.member_change_requests set status = case when p_approve then 'aprobado' else 'rechazado' end,
    reviewed_at = now(), reviewed_by = auth.uid() where id = p_request_id;
end;
$$;
revoke all on function public.review_member_change_request(uuid, boolean) from public, anon;
grant execute on function public.review_member_change_request(uuid, boolean) to authenticated;
