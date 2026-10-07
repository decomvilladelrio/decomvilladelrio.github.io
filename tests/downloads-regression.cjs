const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const root=path.resolve(__dirname,'..'),mod=await import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync(path.join(root,'js/downloads.js'),'utf8')).toString('base64'));
 const originalFetch=global.fetch,originalTimeout=global.setTimeout;let clicks=[],requests=[];
 global.location={href:'https://decomvilladelrio.github.io/recursos',origin:'https://decomvilladelrio.github.io'};
 global.document={body:{append(){}},createElement(){return{click(){clicks.push({...this})},remove(){}}}};
 global.setTimeout=callback=>{callback();return 0};
 const button={innerHTML:'Descargar',textContent:'Descargar',attrs:{},getAttribute(k){return this.attrs[k]},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]}};
 global.fetch=async(url,options)=>{requests.push({url:String(url),options});return new Response(new Blob(['archivo']),{status:200,headers:{'content-type':'application/pdf','x-download-url':String(url)+'&ticket=test'}})};
 await mod.downloadFile({url:'https://drive.google.com/file/d/1-jzJb_AMazLvIJHu4oinfpn4NBCn2qO2/view',name:'Biblia.pdf'},button);
 assert.equal(requests[0].options.method,'HEAD');assert.match(clicks[0].href,/\/public-download\?/);assert.equal(clicks[0].download,'Biblia.pdf');assert.equal(clicks[0].target,undefined);assert.equal(button.innerHTML,'Descargar');
 clicks=[];requests=[];
 await mod.downloadFile({url:'https://btgdhddlxqwezdzvngmg.supabase.co/storage/v1/object/sign/committee-files/decom/a/test.pdf?token=private',name:'Acta.pdf'});
 assert.equal(requests.length,0);assert.match(clicks[0].href,/download=Acta.pdf/);assert.match(clicks[0].href,/token=private/);
 global.fetch=async()=>new Response(null,{status:403});clicks=[];
 await assert.rejects(()=>mod.downloadFile({url:'https://drive.google.com/file/d/unknownPRIVATE12345/view',name:'privado.pdf'},button));assert.equal(clicks.length,0);assert.equal(button.attrs['aria-busy'],undefined);
 global.fetch=async()=>new Response('<html>login</html>',{headers:{'content-type':'text/html'}});
 await assert.rejects(()=>mod.downloadFile({url:'https://example.com/login',name:'archivo.pdf'}));
 global.fetch=originalFetch;global.setTimeout=originalTimeout;
 const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8');const resourceHelper=app.slice(app.indexOf('async function downloadResource('),app.indexOf('function renderLocationPage()',app.indexOf('async function downloadResource(')));
 assert(!resourceHelper.includes('window.open'));assert.match(app,/resource-detail-primary[^\n]+data-resource-download/);
 const expected=[...app.slice(app.indexOf('const DRIVE_RESOURCE_ITEMS = ['),app.indexOf('const platform = {')).matchAll(/drive.google.com\/file\/d\/([\w-]+)/g)].map(m=>m[1]).sort();
 const catalog=fs.readFileSync(path.join(root,'supabase/functions/public-download/catalog.ts'),'utf8');const actual=JSON.parse(catalog.match(/new Set\((\[.*\])\)/)[1]).sort();assert.deepEqual(actual,expected);
 if(process.argv.includes('--live')){
   const base='https://btgdhddlxqwezdzvngmg.supabase.co/functions/v1/public-download';
   const valid=new URL(base);valid.searchParams.set('url','https://drive.google.com/file/d/1SSaGW7y2Jq0L_Tsh0bXqEGTTYhP-89PU/view');valid.searchParams.set('name','Rayos de Luz.jpg');
   const result=await fetch(valid,{method:'HEAD',signal:AbortSignal.timeout(25000)});assert.equal(result.status,200);assert.match(result.headers.get('content-disposition'),/^attachment;/);
   const signed=result.headers.get('x-download-url');assert.equal(new URL(signed).origin,new URL(base).origin);
   const bytes=await fetch(signed,{headers:{Range:'bytes=0-63'},signal:AbortSignal.timeout(25000)});assert([200,206].includes(bytes.status));assert.match(bytes.headers.get('content-disposition'),/^attachment;/);await bytes.body.cancel();
   const tampered=new URL(signed);tampered.searchParams.set('name','alterado.pdf');assert.equal((await fetch(tampered,{signal:AbortSignal.timeout(25000)})).status,403);
   for(const url of ['https://example.com/file.pdf','https://drive.google.com/file/d/unknownPRIVATE12345/view']){const denied=new URL(base);denied.searchParams.set('url',url);const response=await fetch(denied,{method:'HEAD',signal:AbortSignal.timeout(25000)});assert.equal(response.status,403);}
 }
 console.log('PASS: direct attachment downloads, signed private files, no tab opening, busy/error handling, catalog integrity'+(process.argv.includes('--live')?', live download headers and unauthorized-source denial':''));
})().catch(error=>{console.error(error.message);process.exitCode=1});
