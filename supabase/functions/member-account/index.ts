import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const url = Deno.env.get("SUPABASE_URL")!;
const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}").default;
const admin = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const origins = new Set(["https://decomvilladelrio.github.io", "http://localhost:4173", "http://127.0.0.1:4173", "http://localhost:4176", "http://127.0.0.1:4176"]);
const memberFields = "id,member_number,full_name,address,email,phone,document_type,document_number,birth_date,is_baptized,baptism_date,filled_with_holy_spirit,has_church_role,church_role,church_committee,church_assignments,status,photo_path,photo_consent,attendance_consent,sensitive_data_consent,guardian_full_name,guardian_consent,minor_informed_consent,skills,occupation,support_interests,education_level,current_situation,experience_level,experience_notes,availability,availability_notes,training_willingness,service_notes,updated_at,auth_user_id";
function reply(req: Request, payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: {
    "Content-Type": "application/json", "Cache-Control": "no-store", "Vary": "Origin",
    "Access-Control-Allow-Origin": origins.has(req.headers.get("Origin") || "") ? req.headers.get("Origin")! : "https://decomvilladelrio.github.io",
    "Access-Control-Allow-Headers": "authorization,apikey,content-type,x-client-info", "Access-Control-Allow-Methods": "POST,OPTIONS"
  } });
}
Deno.serve(async req => {
  if (req.headers.get("Origin") && !origins.has(req.headers.get("Origin")!)) return reply(req, { error: "Origen no autorizado." }, 403);
  if (req.method === "OPTIONS") return reply(req, null);
  if (req.method !== "POST") return reply(req, { error: "Método no permitido." }, 405);
  try {
    const token = req.headers.get("Authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
    if (!token) return reply(req, { error: "Inicia sesión para continuar." }, 401);
    const { data: { user }, error: authError } = await admin.auth.getUser(token);
    if (authError || !user || !user.email_confirmed_at || !user.email) return reply(req, { error: "Confirma tu correo e inicia sesión para continuar." }, 401);
    if (Number(req.headers.get("Content-Length") || 0) > 5000) return reply(req, { error: "Petición no válida." }, 400);
    const body = await req.json();
    const userClient = createClient(url,key,{global:{headers:{Authorization:`Bearer ${token}`}},auth:{persistSession:false,autoRefreshToken:false}});
    const {data:isAdmin,error:roleError} = await userClient.rpc("is_ipuc_admin");
    if (roleError) throw roleError;
    if (body.action === "admin-link") {
      if (!isAdmin) return reply(req,{error:"Sin autorización."},403);
      if (!/^[0-9a-f-]{36}$/i.test(body.memberId || "") || !/^[0-9a-f-]{36}$/i.test(body.userId || "")) return reply(req,{error:"Identificadores no válidos."},400);
      const {data:{user:target},error:targetError}=await admin.auth.admin.getUserById(body.userId);
      if(targetError || !target?.email_confirmed_at) return reply(req,{error:"La cuenta debe tener correo verificado."},400);
      // Explicit administrator review; never replace a different existing owner.
      const {data,error}=await admin.from("church_members").update({auth_user_id:target.id}).eq("id",body.memberId).is("auth_user_id",null).select("id").maybeSingle();
      if(error || !data)return reply(req,{error:"No se pudo vincular: revisa si la cuenta o la membresía ya están vinculadas."},409);
      return reply(req,{ok:true});
    }
    if (body.action === "link") {
      const fingerprint=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(`account-link:${user.id}`))),b=>b.toString(16).padStart(2,"0")).join("");
      const {data:attempts,error:limitError}=await admin.rpc("take_member_signup_slot",{p_fingerprint:fingerprint});
      if(limitError)throw limitError;
      if(Number(attempts)>5)return reply(req,{error:"Espera 15 minutos antes de intentar vincular de nuevo."},429);
      if(!["CC","TI","CE","PA","RC","PPT"].includes(body.documentType) || !/^[A-Z0-9][A-Z0-9.-]{2,31}$/i.test(body.documentNumber || "") || !/^\d{4}-\d{2}-\d{2}$/.test(body.birthDate || "")) return reply(req,{error:"Revisa el documento y la fecha de nacimiento."},400);
      const {error}=await admin.rpc("link_member_account",{p_user_id:user.id,p_email:user.email,p_document_type:body.documentType,p_document_number:body.documentNumber,p_birth_date:body.birthDate});
      if(error)return reply(req,{error:"No pudimos verificar la coincidencia. Usa el correo registrado o solicita ayuda a administración."},409);
    } else if (body.action !== "get") return reply(req,{error:"Acción no válida."},400);
    const {data:member,error}=await admin.from("church_members").select(memberFields).eq("auth_user_id",user.id).maybeSingle();
    if(error)throw error;
    let photoUrl="";
    if(member?.photo_path){const signed=await admin.storage.from("membership-photos").createSignedUrl(member.photo_path,600);if(!signed.error)photoUrl=signed.data?.signedUrl || "";}
    const {data:pending,error:pendingError}=member ? await admin.from("member_change_requests").select("id,status,created_at").eq("member_id",member.id).eq("status","pendiente").maybeSingle() : {data:null,error:null};
    if(pendingError)throw pendingError;
    const {data:leader,error:leaderError}=await userClient.from("committee_leaders").select("committee").eq("active",true).ilike("email",user.email).limit(1);
    if(leaderError)throw leaderError;
    const {data:profile,error:profileError}=await admin.from("account_profiles").select("id,email,display_name,avatar_url,providers,last_sign_in_at").eq("id",user.id).single();
    if(profileError)throw profileError;
    return reply(req,{ok:true,profile,member:member ? {...member,photo_url:photoUrl,photo_path:undefined}:null,pending,permissions:{admin:Boolean(isAdmin),leader:Boolean(leader?.length),server:Boolean(member?.has_church_role),committee:leader?.[0]?.committee || member?.church_committee || ""}});
  } catch { return reply(req,{error:"No se pudo cargar tu cuenta. Revisa la conexión e inténtalo de nuevo."},400); }
});
