-- Run inside a transaction. Synthetic QA records and temporary permissions never persist.
begin;
create temporary table qa_identity as select id,email from auth.users where email_confirmed_at is not null
 and lower(email) not in ('decomvilladelrio@gmail.com','estebanarango1499@gmail.com') limit 1;
grant select on qa_identity to authenticated;
select set_config('request.jwt.claims',(select jsonb_build_object('sub',id,'email',email,'role','authenticated')::text from auth.users where lower(email)='decomvilladelrio@gmail.com'),true);
insert into public.committees(id,name) values('qa-scope-a','QA Scope A'),('qa-scope-b','QA Scope B');
insert into public.committee_leaders(id,email,committee,role) select 'qa-leader-a',email,'qa-scope-a','presidente' from qa_identity;
insert into public.committee_items(committee,kind,title) values('qa-scope-a','task','QA visible'),('qa-scope-b','task','QA hidden');
select set_config('request.jwt.claims',(select jsonb_build_object('sub',id,'email',email,'role','authenticated')::text from qa_identity),true);
set local role authenticated;
do $$ begin
 if not (public.committee_access('qa-scope-a')->>'task')::boolean then raise exception 'FAIL authorized leader';end if;
 if (public.committee_access('qa-scope-b')->>'read')::boolean then raise exception 'FAIL cross committee';end if;
 if (public.committee_summary('qa-scope-b',now()-interval '1 month')->>'pending_tasks')::integer<>0 then raise exception 'FAIL cross committee aggregates';end if;
 if (select count(*) from public.committee_items where committee like 'qa-scope-%')<>1 then raise exception 'FAIL RLS read isolation';end if;
 begin
  insert into public.committee_items(committee,kind,title) values('qa-scope-b','task','QA unauthorized');
  raise exception 'FAIL cross committee insert';
 exception when insufficient_privilege then null;end;
 begin
  update public.committee_items set committee='qa-scope-b' where title='QA visible';
  raise exception 'FAIL committee reassignment';
 exception when others then if sqlerrm like 'FAIL%' then raise;end if;end;
 if exists(select 1 from public.committee_items where title='QA visible' and committee='qa-scope-b') then raise exception 'FAIL scope transfer';end if;
 begin
  perform public.committee_team('qa-scope-b');raise exception 'FAIL private roster';
 exception when insufficient_privilege then null;end;
end $$;
reset role;
-- Workflows: idempotent meeting commitments and a reply authored by the invited committee.
select set_config('request.jwt.claims',(select jsonb_build_object('sub',id,'email',email,'role','authenticated')::text from auth.users where lower(email)='decomvilladelrio@gmail.com'),true);
insert into public.committee_items(committee,kind,title,details) values('qa-scope-a','meeting','QA meeting','{"commitments":"Preparar diseño\nRevisar sonido"}');
insert into public.committee_items(committee,kind,title,details) values('qa-scope-a','announcement','QA leaders only','{"target_audience":"leaders"}');
insert into public.committee_items(committee,sender_committee,kind,title) values('qa-scope-a','qa-scope-b','invitation','QA request');
select set_config('request.jwt.claims',(select jsonb_build_object('sub',id,'email',email,'role','authenticated')::text from qa_identity),true);
set local role authenticated;
do $$ declare meeting uuid; req uuid; first_count int;second_count int;begin
 select id into meeting from public.committee_items where title='QA meeting';
 first_count:=public.committee_commitments(meeting);second_count:=public.committee_commitments(meeting);
 if first_count<>2 or second_count<>0 then raise exception 'FAIL duplicate commitments';end if;
 select id into req from public.committee_items where title='QA request';
 update public.committee_items set status='aceptada',response_note='QA recibido' where id=req;
 if not exists(select 1 from public.committee_items where id=req and responded_by=auth.uid() and responded_at is not null) then raise exception 'FAIL response identity';end if;
 begin update public.committee_items set title='Cambio no permitido' where id=req;raise exception 'FAIL recipient edit';
 exception when others then if sqlerrm like 'FAIL%' then raise;end if;end;
 insert into public.committee_comments(item_id,body,author_name) values(req,'QA comentario','Intento de suplantación');
 if exists(select 1 from public.committee_comments where item_id=req and author_name='Intento de suplantación') then raise exception 'FAIL comment spoof';end if;
 if not exists(select 1 from public.committee_audit where item_id=req and actor_id=auth.uid() and action like 'Actualizado%') then raise exception 'FAIL audit';end if;
end $$;
reset role;
update public.committee_leaders set role='integrante' where id='qa-leader-a';
select set_config('request.jwt.claims',(select jsonb_build_object('sub',id,'email',email,'role','authenticated')::text from auth.users where lower(email)='decomvilladelrio@gmail.com'),true);
insert into public.church_members(full_name,address,email,phone,consent_version,member_number,auth_user_id,status,has_church_role,church_role,church_committee,church_assignments)
select 'Prueba temporal QA','Dirección de prueba QA','qa@example.invalid','0000000','qa','QA-PANEL-TEST',id,'activo',true,'Integrante','QA Scope A','[{"committee":"QA Scope A","role":"Integrante"}]'::jsonb from qa_identity;
update public.committee_items set assignee_id=(select id from public.church_members where member_number='QA-PANEL-TEST') where title='QA visible';
select set_config('request.jwt.claims',(select jsonb_build_object('sub',id,'email',email,'role','authenticated')::text from qa_identity),true);
set local role authenticated;
do $$ begin
 if (public.committee_access('qa-scope-a')->>'task')::boolean then raise exception 'FAIL member escalation';end if;
 if exists(select 1 from public.committee_items where title='QA leaders only') then raise exception 'FAIL leader-only announcement';end if;
 if exists(select 1 from public.committee_audit where title='QA leaders only') then raise exception 'FAIL leader-only notification leak';end if;
 begin insert into public.committee_items(committee,kind,title) values('qa-scope-a','task','QA role forbidden');raise exception 'FAIL member create';
 exception when insufficient_privilege then null;end;
 update public.committee_items set status='en-proceso' where title='QA visible';
 if not exists(select 1 from public.committee_items where title='QA visible' and status='en-proceso') then raise exception 'FAIL assigned task update';end if;
 update public.committee_items set status='terminada' where title='Preparar diseño';
 if exists(select 1 from public.committee_items where title='Preparar diseño' and status='terminada') then raise exception 'FAIL other task update';end if;
 begin update public.committee_items set description='Cambio prohibido' where title='QA visible';raise exception 'FAIL assigned task fields';
 exception when others then if sqlerrm like 'FAIL%' then raise;end if;end;
end $$;
reset role;
update public.church_members set church_committee='QA Scope B',church_assignments='[{"committee":"QA Scope B","role":"Integrante"}]' where member_number='QA-PANEL-TEST';
set local role authenticated;
do $$ begin if (public.committee_access('qa-scope-a')->>'read')::boolean then raise exception 'FAIL committee change access';end if;end $$;
reset role;
-- Ordinary accounts without directory access must not inherit access from editable metadata.
delete from public.committee_leaders where id='qa-leader-a';
select set_config('request.jwt.claims',(select jsonb_build_object('sub',id,'email',email,'role','authenticated','user_metadata',jsonb_build_object('role','admin','committee','qa-scope-a'))::text from qa_identity),true);
set local role authenticated;
do $$ begin if (public.committee_access('qa-scope-a')->>'read')::boolean then raise exception 'FAIL metadata escalation';end if;end $$;
reset role;
set local role anon;
do $$ begin
 begin perform * from public.committee_items;raise exception 'FAIL anonymous table access';exception when insufficient_privilege then null;end;
 begin perform public.committee_team('qa-scope-a');raise exception 'FAIL anonymous roster access';exception when insufficient_privilege then null;end;
end $$;
reset role;
rollback;
select 'PASS: isolation, roles, private roster, anonymous denial, metadata escalation, invitation response, audit, comment identity, idempotent commitments, own-task-only updates, automatic membership access revocation' as result;
