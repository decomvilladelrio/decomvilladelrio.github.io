/* Device-only encrypted vault. No personal information in localStorage or Cache Storage. */
(() => {
  const enc = new TextEncoder(), dec = new TextDecoder();
  let key = null, permit = null;
  const ready = new Promise((resolve,reject) => { const r=indexedDB.open("ipuc-decom-vault",1); r.onupgradeneeded=()=>{r.result.createObjectStore("meta");r.result.createObjectStore("records",{keyPath:"id"});};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error); });
  async function tx(store,mode,fn) { const db=await ready;return new Promise((resolve,reject)=>{const t=db.transaction(store,mode);let value;const r=fn(t.objectStore(store));r.onsuccess=()=>{value=r.result;};t.oncomplete=()=>resolve(value);t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error || new Error("No se guardó el registro."));}); }
  const meta = () => tx("meta","readonly",s=>s.get("access"));
  async function derive(password,salt) { const material=await crypto.subtle.importKey("raw",enc.encode(password),"PBKDF2",false,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:310000,hash:"SHA-256"},material,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]); }
  async function seal(value,k=key) { if(!k)throw new Error("Desbloquea este equipo.");const iv=crypto.getRandomValues(new Uint8Array(12));return {iv,data:await crypto.subtle.encrypt({name:"AES-GCM",iv},k,enc.encode(JSON.stringify(value)))}; }
  async function open(value,k=key) { if(!k)throw new Error("Desbloquea este equipo.");return JSON.parse(dec.decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:value.iv},k,value.data))); }
  async function prepare(password,authorization) {
    if(await meta())throw new Error("El equipo ya está preparado; utiliza Desbloquear.");
    if(password.length<10)throw new Error("Usa una contraseña local de al menos 10 caracteres.");
    const salt=crypto.getRandomValues(new Uint8Array(16)); const candidate=await derive(password,salt);
    const access={...authorization,expires:Date.now()+7*86400000};const check=await seal(access,candidate);
    await tx("meta","readwrite",s=>s.put({salt,check},"access"));key=candidate;permit=access;
    navigator.storage?.persist?.().catch(()=>{});
  }
  async function unlock(password) {const m=await meta();if(!m)throw new Error("Primero prepara el equipo con Internet.");const candidate=await derive(password,m.salt);let access;try{access=await open(m.check,candidate);}catch{throw new Error("La contraseña local no coincide.");}key=candidate;permit=access;return access;}
  async function renew(authorization) {const m=await meta();if(!key||!m)throw new Error("Desbloquea el equipo.");permit={...authorization,expires:Date.now()+7*86400000};const check=await seal(permit);await tx("meta","readwrite",s=>s.put({...m,check},"access"));}
  function assertWritable(){if(!key)throw new Error("Desbloquea el equipo.");if(permit.expires<Date.now())throw new Error("La autorización offline venció. Conéctate e inicia sesión para renovarla. Tus pendientes están conservados.");}
  async function put(record) {
    assertWritable();let photoMeta=null,photoBlob=null,photoIv=null;
    if(record.photo instanceof Blob){photoMeta={type:record.photo.type,name:record.photo.name||"foto"};photoIv=crypto.getRandomValues(new Uint8Array(12));photoBlob=new Blob([await crypto.subtle.encrypt({name:"AES-GCM",iv:photoIv},key,await record.photo.arrayBuffer())]);}
    const encrypted=await seal({...record,photo:photoMeta});await tx("records","readwrite",s=>s.put({id:record.id,...encrypted,photoBlob,photoIv}));
  }
  async function list() { const rows=await tx("records","readonly",s=>s.getAll());const values=[];for(const row of rows){const v=await open(row);if(v.photo&&row.photoBlob){const bytes=await crypto.subtle.decrypt({name:"AES-GCM",iv:row.photoIv},key,await row.photoBlob.arrayBuffer());v.photo=new File([bytes],v.photo.name,{type:v.photo.type});}values.push(v);}return values; }
  const remove=id=>tx("records","readwrite",s=>s.delete(id));
  async function clear() {await tx("records","readwrite",s=>s.clear());await tx("meta","readwrite",s=>s.clear());key=permit=null;}
  window.DecomStore={meta,prepare,unlock,renew,put,list,remove,clear,lock:()=>{key=permit=null;},get unlocked(){return Boolean(key);},get authorization(){return permit;}};
})();
