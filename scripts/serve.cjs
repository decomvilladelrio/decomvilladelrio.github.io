// Vista previa local sin dependencias. No publica ni modifica datos del backend.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 4176);
const mime = { '.html':'text/html; charset=utf-8', '.js':'application/javascript', '.css':'text/css', '.json':'application/json', '.webmanifest':'application/manifest+json', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.ico':'image/x-icon', '.mp4':'video/mp4', '.mp3':'audio/mpeg', '.pdf':'application/pdf', '.zip':'application/zip', '.woff2':'font/woff2' };
const blocked = new Set(['privado', 'material-decom', 'respaldo-desarrollo', 'node_modules', 'supabase', 'tests', 'scripts', 'android', 'output', 'tmp']);
const inside = file => file === root || file.startsWith(root + path.sep);
const server = http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow:'GET, HEAD' }).end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  const parts = pathname.split(/[\\/]/).filter(Boolean);
  if (parts.some(part => part.startsWith('.') || blocked.has(part.toLowerCase())) || pathname.includes('\0')) { res.writeHead(403).end(); return; }
  let file = path.resolve(root, '.' + pathname);
  if (!inside(file)) { res.writeHead(403).end(); return; }
  try {
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) {
      if (path.extname(pathname)) { res.writeHead(404).end(); return; }
      file = path.join(root, '404.html'); // Shell con rutas absolutas para /admin, /evento/... y rutas internas.
    }
    if (!inside(fs.realpathSync(file))) { res.writeHead(403).end(); return; }
    const stat = fs.statSync(file);
    if (!stat.isFile()) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', mime[path.extname(file).toLowerCase()] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Accept-Ranges', 'bytes');
    let start = 0, end = stat.size - 1;
    if (req.headers.range) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!range || (!range[1] && !range[2])) { res.writeHead(416, { 'Content-Range':`bytes */${stat.size}` }).end(); return; }
      if (!range[1]) start = Math.max(0, stat.size - Number(range[2]));
      else { start = Number(range[1]); if (range[2]) end = Math.min(end, Number(range[2])); }
      if (start > end || start >= stat.size) { res.writeHead(416, { 'Content-Range':`bytes */${stat.size}` }).end(); return; }
      res.statusCode = 206;
      res.setHeader('Content-Range', `bytes ${start}-${end}/${stat.size}`);
    }
    res.setHeader('Content-Length', Math.max(0, end - start + 1));
    if (req.method === 'HEAD' || stat.size === 0) { res.end(); return; }
    fs.createReadStream(file, { start, end }).on('error', () => res.destroy()).pipe(res);
  } catch { if (!res.headersSent) res.writeHead(500); res.end(); }
});
server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? `El puerto ${port} está ocupado. Cierra la otra vista previa o cambia PORT.` : error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Vista local: http://127.0.0.1:${port}/`));
