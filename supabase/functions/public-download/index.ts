import { resourceIds } from "./catalog.ts";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS", "Access-Control-Allow-Headers": "range", "Access-Control-Expose-Headers": "Content-Disposition, Content-Length, Content-Range, Accept-Ranges, X-Download-URL" };
async function capabilityKey() {
  const secret = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!secret) throw new Error('Configuración no disponible');
  return await crypto.subtle.importKey('raw', new TextEncoder().encode(`IPUC public-download v1:${secret}`), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign','verify']);
}
const payload = (source: string,name: string,expiry: string) => new TextEncoder().encode(JSON.stringify([source,name,expiry]));
async function ticket(source: string,name: string,expiry: string) {
  const signed = new Uint8Array(await crypto.subtle.sign('HMAC', await capabilityKey(), payload(source,name,expiry)));
  return btoa(String.fromCharCode(...signed)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
}
async function verifyTicket(source: string,name: string,expiry: string,signature: string) {
  const seconds = Number(expiry),now = Math.floor(Date.now()/1000);
  if (!Number.isSafeInteger(seconds) || seconds < now || seconds > now+3600 || !/^[\w-]{43}$/.test(signature)) return false;
  try {
    const bytes = Uint8Array.from(atob(signature.replaceAll('-','+').replaceAll('_','/')+'='),c=>c.charCodeAt(0));
    return await crypto.subtle.verify('HMAC',await capabilityKey(),bytes,payload(source,name,expiry));
  } catch { return false; }
}
function driveId(value: string) { return value.match(/(?:\/d\/|[?&]id=)([A-Za-z0-9_-]{10,})/)?.[1]; }
async function publishedDrive(id: string) {
  if (resourceIds.has(id)) return true;
  const base = Deno.env.get("SUPABASE_URL")!, key = Deno.env.get("SUPABASE_ANON_KEY")!;
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const responses = await Promise.all([
    fetch(`${base}/rest/v1/events?select=image,invitations,attachments,gallery,media&published=eq.true`, { headers }),
    fetch(`${base}/rest/v1/settings?select=weekly_schedule&id=eq.site`, { headers })
  ]);
  for (const response of responses) {
    if (!response.ok) continue;
    const data = await response.json();
    const find = (item: unknown): boolean => {
      if (typeof item === "string") return driveId(item) === id;
      if (item && typeof item === "object") {
        const asset = item as Record<string, unknown>;
        if (asset.driveFileId === id) return true;
        return Object.values(asset).some(find);
      }
      return false;
    };
    if (find(data)) return true;
  }
  return false;
}
// Custom authentication: GET requires an expiring HMAC capability. Anonymous HEAD issues
// capabilities only for public catalog/published assets; private Drive IDs are never authorized.
Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (!["GET", "HEAD"].includes(req.method)) return new Response(null, { status: 405, headers: cors });
  let phase = "validate";
  try {
    const args = new URL(req.url).searchParams, source = new URL(args.get("url") || "");
    if (source.protocol !== "https:" || source.username || source.password) throw new Error("URL inválida");
    const name = (args.get("name") || "archivo").replace(/[\r\n\/\\"\x00-\x1f]/g, "_").slice(0, 180);
    if (req.method === 'GET' && !await verifyTicket(source.href,name,args.get('expires')||'',args.get('ticket')||'')) return new Response(null,{status:403,headers:cors});
    const id = ["drive.google.com", "www.drive.google.com"].includes(source.hostname) ? driveId(source.href) : null;
    let upstream: string, headers: Record<string, string> = { 'Accept-Encoding': 'identity' };
    if (id) {
      phase = "publication-check";
      if (!await publishedDrive(id)) return new Response(null, { status: 403, headers: cors });
      // All Drive sources are confirmed public assets. Download through Drive's public
      // endpoint so delivery does not depend on an OAuth refresh token.
      upstream = `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}`;
    } else if (source.hostname === "elon-file.s3.us-east-1.amazonaws.com" && decodeURIComponent(source.pathname).startsWith("/Elon/descargas/")) {
      source.search = ""; upstream = source.href;
    } else return new Response(null, { status: 403, headers: cors });
    // HEAD validates availability without reading the heavy file.
    const range = req.headers.get("range"); if (range && /^bytes=\d+-\d*$/.test(range)) headers.Range = range;
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 30000);
    let response: Response;
    phase = "upstream-file";
    try { response = await fetch(upstream, { method: req.method, headers, signal: controller.signal }); }
    finally { clearTimeout(timeout); }
    if (!response.ok || response.headers.get("content-type")?.includes("text/html")) {
      await response.body?.cancel(); return new Response(null, { status: 404, headers: cors });
    }
    const output = new Headers(cors);
    output.set("Content-Type", "application/octet-stream");
    output.set("Content-Disposition", `attachment; filename="${name.replace(/[^\x20-\x7e]/g, "_")}"; filename*=UTF-8''${encodeURIComponent(name)}`);
    output.set("Cache-Control", "no-store"); output.set("X-Content-Type-Options", "nosniff");
    if (req.method === 'HEAD') {
      phase = "capability-sign";
      const download = new URL(`${Deno.env.get('SUPABASE_URL')}/functions/v1/public-download`),expiry = String(Math.floor(Date.now()/1000)+3600);
      download.searchParams.set('url',source.href); download.searchParams.set('name',name);
      download.searchParams.set('expires',expiry); download.searchParams.set('ticket',await ticket(source.href,name,expiry));
      output.set('X-Download-URL',download.href);
    }
    const size = response.headers.get("content-length"); if (size && !response.headers.get('content-encoding')) output.set("Content-Length", size);
    for (const h of ["content-range", "accept-ranges"]) { const value = response.headers.get(h); if (value) output.set(h, value); }
    return new Response(req.method === "HEAD" ? null : response.body, { status: response.status, headers: output });
  } catch { console.error("public-download failed at", phase); return new Response(null, { status: 503, headers: cors }); }
});
