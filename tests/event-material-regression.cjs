const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
const extract = name => source.match(new RegExp(`(?:async )?function ${name}\\([^)]*\\) \\{[\\s\\S]*?\\n      \\}`))[0];
const flags = ['isJovenesCulto','isMisionesCulto','isObraSocialCulto','isEscuelaDominicalCulto','isOracionEnsenanzaCulto','isRedFamiliasCulto','isEdadDoradaCulto','isMusicaCulto','isDamasDorcasEvent','isCaballerosEvent','isEvangelismoEvent'];
async function run() {
  const uploaded = { type:'image/jpeg', url:'https://example.test/new-image.jpg' };
  for (const selected of flags) {
    const ctx = { isImage:a => a.type.startsWith('image/'), assetSource:a => a.url, autoImage:()=>'auto', isRegularSundayWorship:()=>false, ...Object.fromEntries(flags.map(key => [key, () => key === selected])) };
    vm.createContext(ctx); vm.runInContext(extract('eventImage'), ctx);
    assert.equal(ctx.eventImage({image:uploaded}), uploaded.url);
    assert.equal(ctx.eventImage({invitations:{main:uploaded}}), uploaded.url);
    assert.match(ctx.eventImage({}), /^\/assets\/culto-/);
  }
  let stored, uploads = 0, clears = 0, warning;
  const current = { id:'scheduled-event', title:'Culto comité de Evangelismo', date:'2026-10-08', type:'culto', gallery:[{url:'existing-gallery'}], attachments:[{url:'existing-document'}] };
  const ctx = {
    cloud:{driveReady:true}, APP_STATE:{events:{}},
    requireCloudAdmin:()=>true, document:{getElementById:()=>({value:current.id})}, platformEventById:()=>current,
    pendingUploadFiles: id => id === 'uploadMainImage' ? [{name:'new-image.jpg'}] : [],
    uploadCloudFile:async () => { uploads++; return uploaded; },
    saveCloudDoc:async (collection,id,data) => { assert.equal(collection,'events'); assert.equal(id,current.id); stored=data; },
    clearPendingUpload:()=>clears++, setupChurchMusic:()=>{}, completeUploadProgress:()=>{}, renderAdminPage:()=>{}, alert:msg=>warning=msg
  };
  vm.createContext(ctx); vm.runInContext(extract('savePlatformMaterial'),ctx);
  await ctx.savePlatformMaterial();
  assert.equal(stored.title,current.title); assert.equal(stored.date,current.date);
  assert.equal(stored.type,'culto'); assert.equal(stored.custom,false);
  assert.equal(stored.image.url,uploaded.url); assert.equal(stored.gallery[0].url,'existing-gallery');
  assert.equal(stored.attachments[0].url,'existing-document'); assert.equal(uploads,1); assert.equal(clears,8);
  ctx.APP_STATE.events[current.id] = {description:'Conservar descripción',invitations:{whatsapp:{url:'old-whatsapp'}}};
  await ctx.savePlatformMaterial();
  assert.equal(stored.description,'Conservar descripción'); assert.equal(stored.invitations.whatsapp.url,'old-whatsapp');
  const before = uploads; current.title = '';
  await ctx.savePlatformMaterial();
  assert.equal(uploads,before); assert.match(warning,/nombre o fecha/);
  current.title = 'Evento'; const clearsBefore = clears;
  ctx.saveCloudDoc = async () => { throw new Error('save failed'); };
  await assert.rejects(ctx.savePlatformMaterial(),/save failed/); assert.equal(clears,clearsBefore);
  console.log('OK: uploaded covers override 11 committee defaults; scheduled events retain metadata/material; invalid events upload nothing; failed saves preserve pending files.');
}
run().catch(error => { console.error(error); process.exitCode=1; });
