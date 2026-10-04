/* One Supabase session for members, servers and administrators. No member data is persisted here. */
(() => {
  const esc = v => String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const preference = "ipuc-auth-remember";
  const storage = {
    getItem: key => sessionStorage.getItem(key) || localStorage.getItem(key),
    setItem: (key,value) => {const keep=localStorage.getItem(preference)!=="false";(keep?localStorage:sessionStorage).setItem(key,value);(keep?sessionStorage:localStorage).removeItem(key);},
    removeItem: key => {localStorage.removeItem(key);sessionStorage.removeItem(key);}
  };
  function remember(keep) {
    localStorage.setItem(preference,String(keep));
    for (const source of [localStorage,sessionStorage]) {
      for(const key of Object.keys(source).filter(k=>/^sb-.*-auth-token$/.test(k))){const value=source.getItem(key);if(value!==null)storage.setItem(key,value);}
    }
  }
  let previewUrl="", revision=0;
  const cleanPreview=()=>{if(previewUrl)URL.revokeObjectURL(previewUrl);previewUrl="";};
  async function api(ctx,body) {
    const {data,error}=await ctx.client.auth.getSession();
    if(error || !data.session)throw new Error("Inicia sesión para continuar.");
    const response=await fetch(`${ctx.config.url}/functions/v1/member-account`,{method:"POST",cache:"no-store",headers:{apikey:ctx.config.publishableKey,Authorization:`Bearer ${data.session.access_token}`,"Content-Type":"application/json"},body:JSON.stringify(body)});
    const result=await response.json();
    if(!response.ok || !result.ok)throw new Error(result.error || "No se pudo cargar la cuenta.");
    return result;
  }
  async function providers(ctx) {
    try {const response=await fetch(`${ctx.config.url}/auth/v1/settings`,{headers:{apikey:ctx.config.publishableKey}});if(!response.ok)return {};return (await response.json()).external || {};}catch{return {};}
  }
  function errorText(error) {
    const message=String(error?.message || "");
    if(/invalid login credentials/i.test(message))return "Revisa tu correo y contraseña.";
    if(/email not confirmed/i.test(message))return "Confirma tu correo desde el enlace recibido antes de entrar.";
    if(/rate limit|too many|security purposes/i.test(message))return "Espera unos minutos antes de volver a intentarlo.";
    if(/provider.*not enabled|unsupported provider/i.test(message))return "Esta forma de acceso aún necesita activarse en la plataforma.";
    if(/manual linking.*disabled/i.test(message))return "La vinculación de proveedores aún necesita activarse en Supabase.";
    return message || "No se pudo completar la operación. Inténtalo de nuevo.";
  }
  async function render(ctx) {
    const current=++revision;cleanPreview();
    const root=ctx.root;
    root.innerHTML='<section class="account-panel"><p role="status">Abriendo tu cuenta…</p></section>';
    if(!ctx.client){root.innerHTML='<section class="account-panel"><h1>Mi cuenta</h1><p role="status">Conectando con el sistema de cuentas…</p></section>';return;}
    const {data:{session},error}=await ctx.client.auth.getSession();
    if(current!==revision)return;
    if(error || !session || ["crear","recuperar","nueva-clave"].includes(ctx.route.id) || ctx.recovery){await login(ctx,session,current);return;}
    try {
      const data=await api(ctx,{action:"get"});if(current!==revision)return;
      dashboard(ctx,data,current);
    }catch(error){if(current!==revision)return;root.innerHTML=`<section class="account-panel"><h1>Mi cuenta</h1><p role="alert">${esc(errorText(error))}</p><button class="primary-link" data-account-retry>Volver a intentar</button> <button class="small-action" data-account-out>Cerrar sesión</button></section>`;root.querySelector('[data-account-retry]').onclick=()=>render(ctx);root.querySelector('[data-account-out]').onclick=()=>logout(ctx);}
  }
  async function logout(ctx){cleanPreview();ctx.lock?.();await ctx.client.auth.signOut({scope:"local"});ctx.navigate("/cuenta/");}
  async function login(ctx,session,current) {
    const root=ctx.root, mode=ctx.recovery?"nueva-clave":ctx.route.id || "login";
    const create=mode==="crear",forgot=mode==="recuperar",reset=mode==="nueva-clave";
    const title=create?"Crear cuenta":forgot?"Recuperar contraseña":reset?"Crear nueva contraseña":"Iniciar sesión";
    root.innerHTML=`<section class="account-auth"><div class="account-auth-intro"><img src="/assets/favicon.png" alt="IPUC Villa del Río"><p class="eyebrow">Tu espacio en IPUC Villa del Río</p><h1>${title}</h1><p>Una cuenta para tu perfil, tu membresía y tus herramientas de servicio.</p></div><div class="account-auth-box">${!forgot&&!reset?`<div class="account-providers"><button type="button" data-provider="google"><b aria-hidden="true">G</b> Continuar con Google</button></div><p class="account-provider-note" data-provider-note role="status"></p><div class="account-divider">o continúa con tu correo</div>`:""}<form data-account-auth>${!reset?'<label>Correo electrónico<input name="email" type="email" autocomplete="email" required maxlength="254"></label>':""}${!forgot?`<label>Contraseña<input name="password" type="password" autocomplete="${create||reset?"new-password":"current-password"}" required minlength="${create||reset?8:1}" maxlength="128"></label>`:""}${create||reset?'<label>Confirmar contraseña<input name="confirmation" type="password" autocomplete="new-password" required minlength="8" maxlength="128"></label>':""}${!forgot&&!reset?`<label class="account-check"><input name="remember" type="checkbox" ${localStorage.getItem(preference)!=="false"?"checked":""}> Mantener la sesión iniciada en este equipo</label>`:""}<p data-account-message role="status" aria-live="polite"></p><button class="primary-link" type="submit">${forgot?"Enviar enlace de recuperación":reset?"Guardar contraseña":title}</button></form><div class="account-auth-links"><a href="/cuenta/">Iniciar sesión</a><a href="/cuenta/crear">Crear cuenta</a><a href="/cuenta/recuperar">Recuperar contraseña</a></div></div></section>`;
    const form=root.querySelector('[data-account-auth]'),message=root.querySelector('[data-account-message]');
    form.onsubmit=async event=>{
      event.preventDefault();if(!form.reportValidity())return;
      const button=form.querySelector('[type=submit]');button.disabled=true;message.textContent="Procesando…";
      try {
        const email=form.elements.email?.value.trim().toLowerCase(), password=form.elements.password?.value;
        if((create||reset) && password!==form.elements.confirmation.value)throw new Error("Las contraseñas deben coincidir.");
        if(form.elements.remember)remember(form.elements.remember.checked);
        if(forgot){const result=await ctx.client.auth.resetPasswordForEmail(email,{redirectTo:`${location.origin}/cuenta/nueva-clave`});if(result.error)throw result.error;message.textContent="Si existe una cuenta con ese correo, recibirás un enlace para recuperar la contraseña.";}
        else if(reset){if(!session)throw new Error("Abre el enlace de recuperación recibido en tu correo.");const result=await ctx.client.auth.updateUser({password});if(result.error)throw result.error;ctx.clearRecovery?.();ctx.navigate("/cuenta/");}
        else if(create){const result=await ctx.client.auth.signUp({email,password,options:{emailRedirectTo:`${location.origin}/cuenta/`}});if(result.error)throw result.error;if(result.data.session)ctx.navigate("/cuenta/");else message.textContent="Revisa tu correo y confirma tu cuenta con el enlace recibido. Luego inicia sesión.";}
        else{const result=await ctx.client.auth.signInWithPassword({email,password});if(result.error)throw result.error;ctx.navigate("/cuenta/");}
      }catch(error){message.textContent=errorText(error);}finally{if(button.isConnected)button.disabled=false;}
    };
    if(!forgot&&!reset){
      root.querySelectorAll('[data-provider]').forEach(button=>{button.disabled=true;});
      const enabled=await providers(ctx);if(current!==revision)return;
      const pending=[];
      root.querySelectorAll('[data-provider]').forEach(button=>{
        const provider=button.dataset.provider;button.disabled=!enabled[provider];if(!enabled[provider]){pending.push("Google");button.title="Pendiente de activación por administración";}
        button.onclick=async()=>{remember(form.elements.remember.checked);const {error}=await ctx.client.auth.signInWithOAuth({provider,options:{redirectTo:`${location.origin}/cuenta/`}});if(error)message.textContent=errorText(error);};
      });
      root.querySelector('[data-provider-note]').textContent=pending.length?`${pending.join(" y ")} pendiente${pending.length>1?"s":""} de activación. Puedes entrar con correo y contraseña.`:"";
    }
  }
  function dashboard(ctx,data,current) {
    const {member,profile,pending,permissions}=data,root=ctx.root;
    const tab=ctx.route.id||"inicio";
    const isDecomAccount=String(profile?.email || "").trim().toLowerCase()==="decomvilladelrio@gmail.com";
    const name=member?.full_name || profile.display_name || "Usuario";
    const photo=member?.photo_url || profile.avatar_url;
    const photoMarkup=photo?`<img src="${esc(photo)}" alt="Tu fotografía" referrerpolicy="no-referrer">`:`<span aria-hidden="true">${esc(name.slice(0,1))}</span>`;
    const menu=[["","Inicio"],["perfil","Mi perfil"],...(isDecomAccount?[["registro-decom","Registro DECOM sin conexión","/membresia/decom/"]]:[["membresia","Mi membresía"],["carne","Mi carné"]]),...(permissions.server||permissions.leader||permissions.admin?[["servidor","Servidor"]]:[]),["configuracion","Configuración"]];
    root.innerHTML=`<section class="account-workspace"><header class="account-top"><div><p class="eyebrow">IPUC Villa del Río</p><h1>Mi cuenta</h1></div><button type="button" class="small-action" data-account-out>Cerrar sesión</button></header><div class="account-layout"><nav aria-label="Tu cuenta">${menu.map(([id,title,url])=>`<a href="${url||`/cuenta/${id}`}" ${url?"":tab===(id||"inicio")?'aria-current="page"':""}>${title}</a>`).join("")}${permissions.admin?'<a href="/admin">Panel administrativo</a>':""}</nav><div class="account-content"><div class="account-welcome"><div class="account-avatar">${photoMarkup}</div><div><p class="eyebrow">Tu espacio privado</p><h2>${esc(tab==="inicio"?`Bienvenido, ${name.split(" ")[0]}`:name)}</h2><p>${esc(isDecomAccount?"Cuenta del equipo DECOM · acceso administrativo":member?`Membresía ${member.status} · ${member.member_number}`:"Completa o vincula tu información de membresía")}</p></div></div><p data-account-message role="status" aria-live="polite"></p><div data-account-body></div></div></div></section>`;
    root.querySelector('[data-account-out]').onclick=()=>logout(ctx);
    root.querySelector('.account-avatar img')?.addEventListener("error",event=>{event.currentTarget.replaceWith(Object.assign(document.createElement("span"),{textContent:name.slice(0,1)}));},{once:true});
    const body=root.querySelector('[data-account-body]'),message=root.querySelector('[data-account-message]');
    if(tab==="configuracion"){settings(ctx,body,message,profile,current);return;}
    if(tab==="servidor"){
      body.innerHTML=`<h2>Servicio en la iglesia</h2><p>${esc(member?.church_committee || permissions.committee || "")}</p><p>${esc(member?.church_role || "")}</p>${permissions.admin||permissions.leader?'<a class="primary-link" href="/admin">Abrir mis herramientas</a>':permissions.server?'<p>Consulta tu comité y cargo aquí. Las herramientas de líderes se habilitan por administración según los permisos del equipo.</p>':'<p>Esta cuenta no tiene herramientas de servidor habilitadas.</p>'}`;return;
    }
    if(isDecomAccount){body.innerHTML='<div class="account-empty"><h2>Cuenta del equipo DECOM</h2><p>Esta cuenta se utiliza para administrar la plataforma y no requiere un registro personal de membresía.</p><a class="primary-link" href="/admin">Abrir panel administrativo</a></div>';return;}
    if(tab==="carne"){card(ctx,body,message,member,current);return;}
    if(!member){
      body.innerHTML=`<div class="account-empty"><h2>Completa tu información de membresía</h2><p>Si todavía no tienes registro, completa el formulario una vez. Quedará guardado en tu cuenta.</p><button class="primary-link" data-account-new>Completar membresía</button></div><details class="account-link"><summary>Ya tengo una membresía registrada</summary><p>Confirma tus datos. El correo de esta cuenta debe coincidir con el que registraste en la iglesia. Si hay diferencias, administración te ayudará a vincularlos.</p><form data-account-claim><label>Tipo de documento<select name="documentType" required>${["CC","TI","CE","PA","RC","PPT"].map(v=>`<option>${v}</option>`).join("")}</select></label><label>Número de documento<input name="documentNumber" required minlength="3" maxlength="32" autocomplete="off"></label><label>Fecha de nacimiento<input name="birthDate" type="date" required></label><button class="primary-link">Vincular mi membresía</button></form></details>`;
      body.querySelector('[data-account-new]').onclick=()=>ctx.editForm(null,{email:profile.email,full_name:profile.display_name});
      body.querySelector('[data-account-claim]').onsubmit=async event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const button=form.querySelector('button');button.disabled=true;try{await api(ctx,{action:"link",...Object.fromEntries(new FormData(form))});await render(ctx);}catch(error){message.textContent=errorText(error);}finally{button.disabled=false;}};return;
    }
    if(pending)body.insertAdjacentHTML("beforeend",`<div class="account-notice">Tienes una actualización pendiente de revisión. Tu información y el carné oficiales se actualizarán al aprobarla.</div>`);
    const fields=[["Nombre",member.full_name],["Correo de contacto",member.email],["Teléfono",member.phone],["Dirección",member.address],["Nacimiento",member.birth_date],["Documento",`${member.document_type || ""} ${member.document_number || ""}`],["Bautismo",member.is_baptized===null?"Sin información":member.is_baptized?"Sí":"No"],["Fecha de bautismo",member.baptism_date],["Espíritu Santo",member.filled_with_holy_spirit===null?"Sin información":member.filled_with_holy_spirit?"Sí":"No"],["Comité",member.church_committee],["Cargo",member.church_role]];
    body.insertAdjacentHTML("beforeend",`<div class="account-facts">${fields.map(([label,value])=>`<div><small>${esc(label)}</small><strong>${esc(value || "Sin registrar")}</strong></div>`).join("")}</div>${window.MemberProfile.facts(member)}<p><strong>Habilidades:</strong> ${esc((member.skills || []).join(" · ") || "Sin registrar")}</p><p><strong>Intereses de servicio:</strong> ${esc((member.support_interests || []).join(" · ") || "Sin registrar")}</p><div class="account-actions"><button class="primary-link" data-account-edit ${pending?"disabled":""}>Actualizar mi información</button><a class="small-action" href="/cuenta/carne">Mi carné</a></div>`);
    body.querySelector('[data-account-edit]').onclick=()=>ctx.editForm(member);
  }
  async function card(ctx,body,message,member,current) {
    body.innerHTML='<h2>Mi carné</h2>';
    if(!member?.has_church_role || !member?.photo_url || !member.document_number){body.insertAdjacentHTML("beforeend",'<p>Tu registro todavía no tiene los datos necesarios para generar el carné. Completa tu membresía o contacta a administración.</p><a class="primary-link" href="/cuenta/membresia">Mi membresía</a>');return;}
    if(member.status!=="activo"){body.insertAdjacentHTML("beforeend",'<p>El carné estará disponible cuando administración active tu membresía.</p>');return;}
    try {
      const blob=await ctx.cardBlob(member,"png",member.photo_url);if(current!==revision)return;
      previewUrl=URL.createObjectURL(blob);
      body.insertAdjacentHTML("beforeend",`<img class="account-card-preview" src="${previewUrl}" alt="Vista frontal de tu carné"><p>Datos del registro aprobado. La plantilla actual tiene una vista frontal.</p><div class="account-actions"><button class="primary-link" data-card-download="png">Descargar PNG para impresión</button><button class="small-action" data-card-download="svg">Descargar SVG editable</button><button class="small-action" data-card-print>Imprimir</button><a class="small-action" href="/cuenta/membresia">Actualizar datos o fotografía</a></div>`);
      body.querySelectorAll('[data-card-download]').forEach(button=>button.onclick=async()=>{button.disabled=true;try{const format=button.dataset.cardDownload;const file=format==="png"?blob:await ctx.cardBlob(member,format,member.photo_url);const link=document.createElement("a"),url=URL.createObjectURL(file);link.href=url;link.download=`Mi-carne-IPUC.${format}`;link.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}catch(error){message.textContent=errorText(error);}finally{button.disabled=false;}});
      body.querySelector('[data-card-print]').onclick=()=>{const popup=window.open("","_blank","width=650,height=850");if(!popup){message.textContent="Permite abrir la ventana de impresión en tu navegador.";return;}popup.document.open();popup.document.write(`<!doctype html><title>Mi carné IPUC</title><style>@page{size:auto;margin:15mm}img{width:52.83mm;height:81.62mm;object-fit:contain}</style><img src="${previewUrl}" alt="Carné IPUC">`);popup.document.close();popup.document.querySelector('img').onload=()=>popup.print();};
    }catch(error){message.textContent=errorText(error);}
  }
  async function settings(ctx,body,message,profile,current) {
    body.innerHTML=`<h2>Configuración de la cuenta</h2><p>Correo de acceso: ${esc(profile.email)}</p><p>Accesos vinculados: ${esc((profile.providers || []).join(" · "))}</p><form data-account-email><label>Nuevo correo de acceso<input name="email" type="email" required autocomplete="email"></label><button class="small-action">Cambiar correo y verificar</button></form><p>Confirma el cambio mediante los mensajes recibidos. El correo de contacto de la membresía se actualiza por separado.</p><a class="small-action" href="/cuenta/nueva-clave">Cambiar o crear contraseña</a><h3>Conectar Google</h3><p>Vincula Google desde esta sesión para conservar la misma cuenta.</p><div class="account-providers"><button data-link-provider="google">Vincular Google</button></div><p data-link-note></p><label class="account-check"><input data-remember type="checkbox" ${localStorage.getItem(preference)!=="false"?"checked":""}> Mantener la sesión iniciada en este equipo</label>`;
    body.querySelector('[data-remember]').onchange=event=>remember(event.target.checked);
    body.querySelector('[data-account-email]').onsubmit=async event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const button=form.querySelector('button');button.disabled=true;try{const {error}=await ctx.client.auth.updateUser({email:form.elements.email.value.trim()},{emailRedirectTo:`${location.origin}/cuenta/`});if(error)throw error;message.textContent="Confirma el cambio desde tu correo. Tu membresía seguirá asociada a esta cuenta.";}catch(error){message.textContent=errorText(error);}finally{button.disabled=false;}};
    const enabled=await providers(ctx);if(current!==revision)return;
    body.querySelectorAll('[data-link-provider]').forEach(button=>{const provider=button.dataset.linkProvider;button.disabled=!enabled[provider]||(profile.providers || []).includes(provider);button.onclick=async()=>{const {error}=await ctx.client.auth.linkIdentity({provider,options:{redirectTo:`${location.origin}/cuenta/configuracion`}});if(error)message.textContent=errorText(error);};});
    body.querySelector('[data-link-note]').textContent=!enabled.google?"Google está pendiente de activación por administración.":"";
  }
  function fill(form,member={}) {
    const fields={fullName:"full_name",address:"address",email:"email",phone:"phone",birthDate:"birth_date",baptismDate:"baptism_date",documentType:"document_type",documentNumber:"document_number",guardianFullName:"guardian_full_name",occupation:"occupation",educationLevel:"education_level",experienceLevel:"experience_level",experienceNotes:"experience_notes",availabilityNotes:"availability_notes",trainingWillingness:"training_willingness",serviceNotes:"service_notes"};
    for(const[name,key]of Object.entries(fields)){const input=form.elements.namedItem(name);if(input){input.value=member[key] || "";input.dispatchEvent(new Event("change",{bubbles:true}));}}
    for(const[name,key]of [["hasChurchRole","has_church_role"],["isBaptized","is_baptized"],["filledWithHolySpirit","filled_with_holy_spirit"]]){if(member[key]===null||member[key]===undefined)continue;const value=name==="hasChurchRole"?(member[key]?"si":"no"):String(member[key]);const radio=form.querySelector(`[name="${name}"][value="${value}"]`);if(radio){radio.checked=true;radio.dispatchEvent(new Event("change",{bubbles:true}));}}
    let assignments=member.church_assignments?.length?member.church_assignments:(member.church_role || "").split(" | ").filter(Boolean).map((role,i)=>({role,committee:(member.church_committee || "").split(" | ")[i] || ""}));
    assignments.forEach((item,i)=>{if(i)form.querySelector('[data-add-member-assignment]').click();const row=form.querySelectorAll('[data-member-assignment]')[i];if(!row)return;row.querySelector('[data-assignment-role]').value=item.role;const select=row.querySelector('[data-assignment-committee]');const known=[...select.options].some(o=>o.value===item.committee);select.value=known?item.committee:"__otro__";select.dispatchEvent(new Event("change",{bubbles:true}));row.querySelector('[data-assignment-custom-name]').value=known?"":item.committee;});
    for(const[name,key]of [["currentSituation","current_situation"],["availability","availability"],["skills","skills"],["supportInterests","support_interests"]]){const values=member[key] || [];form.querySelectorAll(`[name="${name}"]`).forEach(input=>{input.checked=values.includes(input.value);});const known=[...form.querySelectorAll(`[name="${name}"]`)].map(i=>i.value);const other=values.filter(v=>!known.includes(v));if(name==="skills"&&other.length){form.querySelector('[name="skills"][value="Otro conocimiento o habilidad"]').checked=true;form.elements.additionalSkills.value=other.map(v=>v.replace(/^Otra habilidad: /,"")).join("\n");}if(name==="supportInterests"&&other.length){form.querySelector('[name="supportInterests"][value="Otro"]').checked=true;form.elements.supportInterestsOther.value=other.map(v=>v.replace(/^Otro: /,"")).join(", ");}}
    for(const[name,key]of [["photoConsent","photo_consent"],["sensitiveDataConsent","sensitive_data_consent"],["attendanceConsent","attendance_consent"],["guardianConsent","guardian_consent"],["minorInformedConsent","minor_informed_consent"]]){if(form.elements[name])form.elements[name].checked=Boolean(member[key]);}
    form.dispatchEvent(new Event("change",{bubbles:true}));form.querySelector('.member-capability-fields')?.dispatchEvent(new Event("change",{bubbles:true}));
    if(member.photo_url || member.photo_preview_url){const preview=form.querySelector('[data-member-photo-preview]');preview.src=member.photo_url || member.photo_preview_url;preview.hidden=false;form.elements.photo.required=false;}
  }
  window.AccountUI={render,api,storage,remember,fill,esc,cleanPreview,cancel:()=>{revision++;cleanPreview();}};
})();
