/* Shared, structured catalogue for the public form and authorized directory. */
(() => {
  const groups = {
    "Comunicaciones y tecnología": ["Fotografía", "Video", "Edición de video", "Diseño gráfico", "Redes sociales", "Transmisiones en vivo / streaming", "Manejo de cámaras", "Proyección / Holyrics", "Sonido", "Iluminación", "Informática", "Soporte técnico", "Programación", "Desarrollo web", "Ofimática / Word / Excel / PowerPoint", "Inteligencia artificial"],
    "Música": ["Canto", "Piano / teclado", "Guitarra", "Bajo", "Batería", "Otro instrumento", "Dirección musical", "Producción musical / audio"],
    "Enseñanza y trabajo con personas": ["Enseñanza", "Trabajo con niños", "Trabajo con adolescentes", "Trabajo con jóvenes", "Trabajo con adultos", "Trabajo con adulto mayor", "Atención al público", "Recepción", "Liderazgo", "Consejería / acompañamiento", "Organización de grupos"],
    "Administración": ["Administración", "Contabilidad", "Finanzas", "Archivo", "Secretariado", "Digitación", "Organización de eventos", "Logística", "Compras", "Inventarios"],
    "Oficios y servicios": ["Electricidad", "Electrónica", "Construcción", "Plomería", "Carpintería", "Pintura", "Mecánica", "Conducción de vehículos", "Cocina", "Repostería", "Costura / confección", "Decoración", "Manualidades", "Aseo", "Mantenimiento general"],
    "Salud y emergencias": ["Medicina", "Enfermería", "Primeros auxilios", "Psicología", "Seguridad y emergencias"],
    "Otros": ["Redacción", "Locución", "Traducción / idiomas", "Ventas", "Emprendimiento", "Mercadeo", "Otro conocimiento o habilidad"]
  };
  const education = ["Primaria", "Bachillerato", "Técnico", "Tecnólogo", "Universitario", "Especialización", "Maestría", "Doctorado", "Otro", "Prefiero no responder"];
  const situations = ["Estudio actualmente", "Trabajo actualmente", "Estudio y trabajo", "Trabajo independiente", "Emprendimiento propio", "Actualmente no estudio ni trabajo", "Pensionado", "Otro"];
  const interests = ["DECOM / Comunicaciones", "Sonido", "Música", "Recepción", "Escuela Dominical", "Jóvenes", "Damas Dorcas", "Caballeros", "Evangelismo", "Misiones", "Red de Familia", "Edad Dorada", "Logística", "Administración", "Mantenimiento", "Cocina", "Apoyo en eventos", "Otro", "Por ahora no tengo preferencia"];
  const days = ["Martes", "Jueves", "Sábado", "Domingo", "Entre semana", "Fines de semana", "Según disponibilidad", "Otro"];
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const select = (label, name, values) => `<label>${label}<select name="${name}"><option value="">Selecciona una opción</option>${values.map(v=>`<option>${esc(v)}</option>`).join("")}</select></label>`;
  const checks = (name, values) => `<div class="skills-checks">${values.map(v=>`<label><input type="checkbox" name="${name}" value="${esc(v)}"><span>${esc(v)}</span></label>`).join("")}</div>`;
  function mount(section) {
    section.innerHTML = `<h2>Perfil de habilidades y servicio</h2><p>Esta información nos ayudará a conocer tus conocimientos, experiencia y habilidades, con el propósito de identificar áreas en las que podrías apoyar o servir en la iglesia. Registrar esta información no implica una asignación automática a ningún ministerio o responsabilidad.</p><p class="skills-note">Información voluntaria. Puedes dejar estos campos sin responder.</p><div class="skills-fields">${select("Nivel de estudios", "educationLevel", education)}<label>¿Qué estudias, estudiaste o cuál es tu profesión u oficio?<input name="occupation" maxlength="120" placeholder="Ingeniería de Sistemas, enfermería, electricidad, confección, administración, estudiante…"></label></div><fieldset><legend>Estado actual</legend>${checks("currentSituation",situations)}</fieldset><fieldset><legend>¿Qué sabes hacer o en qué áreas tienes conocimientos?</legend><p>Selecciona todas las opciones que apliquen.</p><div class="skills-categories">${Object.entries(groups).map(([title,values])=>`<details><summary>${esc(title)} <small data-skills-count>0 seleccionadas</small></summary>${checks("skills",values)}</details>`).join("")}</div><label data-skill-other hidden>¿Cuál otra habilidad o conocimiento tienes?<textarea name="additionalSkills" maxlength="1000" placeholder="Una habilidad por línea (hasta 10)"></textarea></label><input name="skillsOther" type="hidden"></fieldset>${select("¿Tienes experiencia utilizando alguna de estas habilidades?","experienceLevel",["Sí","No","Estoy aprendiendo"])}<label data-experience-notes hidden>Cuéntanos brevemente sobre tu experiencia (opcional)<textarea name="experienceNotes" maxlength="1500"></textarea></label><fieldset><legend>¿En qué áreas de la iglesia te gustaría servir o apoyar?</legend>${checks("supportInterests",interests)}<label data-interest-other hidden>¿Cuál otra área?<input name="supportInterestsOther" maxlength="100"></label></fieldset><fieldset><legend>¿Cuándo podrías apoyar actividades o servir?</legend>${checks("availability",days)}<label>Horario o disponibilidad adicional (opcional)<input name="availabilityNotes" maxlength="500"></label></fieldset>${select("¿Estarías dispuesto(a) a recibir capacitación para servir en alguna área?","trainingWillingness",["Sí","No","Tal vez"])}<label>¿Hay algo más que quieras contarnos sobre tus habilidades, experiencia o forma en la que te gustaría apoyar?<textarea name="serviceNotes" maxlength="1500"></textarea></label>`;
    const update = () => {
      section.querySelectorAll("details").forEach(d => d.querySelector("[data-skills-count]").textContent = `${d.querySelectorAll(":checked").length} seleccionadas`);
      section.querySelector("[data-skill-other]").hidden = !section.querySelector('[name="skills"][value="Otro conocimiento o habilidad"]').checked;
      section.querySelector("[data-experience-notes]").hidden = section.querySelector('[name="experienceLevel"]').value !== "Sí";
      section.querySelector("[data-interest-other]").hidden = !section.querySelector('[name="supportInterests"][value="Otro"]').checked;
      section.querySelector('[name="supportInterestsOther"]').required = !section.querySelector("[data-interest-other]").hidden;
    };
    section.addEventListener("change", update); update();
  }
  function serialize(form, data) {
    ["currentSituation","availability"].forEach(n=>data.set(n,JSON.stringify(new FormData(form).getAll(n))));
    const other = form.querySelector('[name="additionalSkills"]');
    data.set("additionalSkills",JSON.stringify(other?.closest("label").hidden ? [] : (other?.value || "").split(/\n/).map(x=>x.trim()).filter(Boolean)));
    data.set("skillsOther", "");
  }
  function facts(member) {
    const fields = [["Nivel de estudios","education_level"],["Estado actual","current_situation"],["Experiencia","experience_level"],["Sobre su experiencia","experience_notes"],["Disponibilidad","availability"],["Horario adicional","availability_notes"],["Capacitación","training_willingness"],["Observaciones","service_notes"]];
    return `<section class="skills-admin-facts"><h3>Perfil de habilidades</h3>${fields.map(([title,key])=>member[key]?.length ? `<span><small>${title}</small><strong>${esc(Array.isArray(member[key]) ? member[key].join(" · ") : member[key])}</strong></span>` : "").join("")}</section>`;
  }
  function wizard(form) {
    const pages=["Tus datos","Documento","Membresía","Habilidades","Autorizaciones"].map((title,i)=>{const pane=document.createElement("section");pane.className="member-step";pane.dataset.step=i;pane.innerHTML=`<h2>${title}</h2>`;return pane;});
    const fields=form.querySelector(".membership-fields");
    [...fields.children].forEach(child=>{
      const page=child.matches(".member-document-fields")?1:child.matches(".member-capability-fields")?3:child.matches(".member-profile-fields,.member-role-question,.member-assignment-fields")?2:0;
      pages[page].append(child);
    });
    const birthDate=form.querySelector('[name="birthDate"]');
    if(birthDate)pages[0].append(birthDate.closest("label"));
    pages[1].insertAdjacentHTML("beforeend",'<p>El documento es obligatorio para el registro DECOM y para quienes declaran un cargo en la iglesia.</p>');
    form.querySelectorAll(":scope > .member-consent").forEach(c=>pages[4].append(c));
    const status=form.querySelector("[data-member-status]"), submit=form.querySelector('[type="submit"]');
    pages[4].append(status,submit);fields.remove();form.querySelector(".membership-form-heading")?.remove();
    const head=document.createElement("div");head.className="membership-decom-brand";head.innerHTML='<img src="/assets/favicon.png" alt="IPUC Villa del Río"><div><strong>IPUC VILLA DEL RÍO</strong><span>Registro de membresía</span></div>';
    const steps=document.createElement("nav");steps.className="member-steps";steps.setAttribute("aria-label","Pasos del registro");steps.innerHTML=pages.map((p,i)=>`<span data-progress="${i}"><b>${i+1}</b>${p.querySelector("h2").textContent}</span>`).join("");
    form.prepend(head,steps);pages.forEach(p=>form.append(p));
    const actions=document.createElement("div");actions.className="member-step-actions";actions.innerHTML='<button type="button" class="small-action" data-step-back>Anterior</button><button type="button" class="primary-link" data-step-next>Siguiente →</button>';form.append(actions);
    let active=0;
    const show=i=>{active=i;pages.forEach((p,j)=>p.hidden=j!==i);steps.querySelectorAll("[data-progress]").forEach((s,j)=>{s.classList.toggle("active",i===j);s.setAttribute("aria-current",i===j?"step":"false");});actions.querySelector("[data-step-back]").hidden=i===0;actions.querySelector("[data-step-next]").hidden=i===4;};
    actions.querySelector("[data-step-back]").onclick=()=>show(Math.max(0,active-1));
    actions.querySelector("[data-step-next]").onclick=()=>{const invalid=[...pages[active].querySelectorAll("input,select,textarea")].find(el=>!el.disabled&&!el.checkValidity());if(invalid){invalid.reportValidity();return;}show(Math.min(4,active+1));pages[active].querySelector("h2").setAttribute("tabindex","-1");pages[active].querySelector("h2").focus({preventScroll:true});};
    form.addEventListener("submit",()=>{const invalid=form.querySelector(":invalid:not(:disabled)");if(invalid){const pane=invalid.closest("[data-step]");if(pane)show(Number(pane.dataset.step));}},true);
    show(0);
  }
  window.MemberProfile = {groups,education,situations,interests,days,mount,serialize,facts,esc,wizard};
})();
