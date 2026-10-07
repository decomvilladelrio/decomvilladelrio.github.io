create or replace function committee_private.guard_item() returns trigger language plpgsql set search_path=public,pg_catalog as $$
begin
 if length(new.details::text)>50000 or jsonb_array_length(new.files)>20 then raise exception 'Información demasiado extensa'; end if;
 if new.assignee_id is not null and (tg_op='INSERT' or new.assignee_id is distinct from old.assignee_id) and not exists(select 1 from public.committee_team(new.committee) t where t.id=new.assignee_id) then raise exception 'Responsable fuera del comité'; end if;
 if exists(select 1 from jsonb_array_elements(new.files) f where f->>'bucket' is distinct from 'committee-files'
 or coalesce(f->>'path','') !~ '^[a-z0-9-]+/[a-f0-9-]{36}/[^/]+$'
 or (not public.is_ipuc_admin() and split_part(f->>'path','/',1)<>coalesce(new.sender_committee,new.committee))) then raise exception 'Archivo fuera del comité'; end if;
 if new.status<>all(case new.kind when 'task' then array['pendiente','en-proceso','terminada','cancelada'] when 'invitation' then array['pendiente','aceptada','rechazada','en-revision','completada'] when 'meeting' then array['pendiente','completada','cancelada'] else array['pendiente','completada'] end) then raise exception 'Estado inválido'; end if;
 if tg_op='INSERT' then
   new.created_by:=auth.uid(); new.created_at:=now(); new.responded_by:=null; new.responded_at:=null; new.responder_name:=null;new.response_note:='';
 else
   if (new.id,new.committee,new.kind,new.sender_committee,new.created_by,new.created_at) is distinct from (old.id,old.committee,old.kind,old.sender_committee,old.created_by,old.created_at) then raise exception 'Identidad inmutable'; end if;
   if not public.is_ipuc_admin() and new.kind='invitation' and new.sender_committee is not null then
     if committee_private.allowed(new.committee,'invitation') then
       if (to_jsonb(new)-array['status','response_note','responded_by','responded_at','responder_name','updated_at']) is distinct from (to_jsonb(old)-array['status','response_note','responded_by','responded_at','responder_name','updated_at']) then raise exception 'Solo puedes responder la invitación'; end if;
     elsif new.status<>old.status or new.response_note<>old.response_note then raise exception 'La respuesta corresponde al comité invitado'; end if;
   elsif not committee_private.allowed(new.committee,new.kind) then
     if (to_jsonb(new)-array['status','updated_at']) is distinct from (to_jsonb(old)-array['status','updated_at']) then raise exception 'Solo puedes actualizar el estado de tu tarea'; end if;
   end if;
   new.responded_by:=old.responded_by; new.responded_at:=old.responded_at;new.responder_name:=old.responder_name;
   if new.kind='invitation' and (new.status,new.response_note) is distinct from (old.status,old.response_note) then new.responded_by:=auth.uid();new.responded_at:=now();new.responder_name:=auth.jwt()->>'email'; end if;
 end if;
 new.updated_at:=now(); return new;
end; $$;
