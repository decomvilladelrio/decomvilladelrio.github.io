const endpoint = "https://btgdhddlxqwezdzvngmg.supabase.co/functions/v1/public-download";
export async function downloadFile(asset, button) {
  if (button?.getAttribute("aria-busy") === "true") return;
  const label = button?.innerHTML;
  if (button) { button.setAttribute("aria-busy", "true"); button.textContent = "Preparando…"; }
  try {
    const source = new URL(asset.url || asset.dataUrl || "", location.href);
    let url = source.href, objectUrl;
    if (source.hostname.endsWith('.supabase.co') && /^\/storage\/v1\/object\/(public|sign)\//.test(source.pathname)) {
      source.searchParams.set('download', asset.name || 'archivo'); url = source.href;
    } else if (["drive.google.com", "www.drive.google.com", "elon-file.s3.us-east-1.amazonaws.com"].includes(source.hostname)) {
      const proxy = new URL(endpoint);
      proxy.searchParams.set("url", source.href);
      proxy.searchParams.set("name", asset.name || "archivo");
      const check = await fetch(proxy, { method: "HEAD", cache: "no-store" });
      if (!check.ok) throw new Error("El archivo no está disponible para descarga. Intenta nuevamente o avisa a DECOM.");
      url = check.headers.get('X-Download-URL');
      if (!url || new URL(url).origin !== new URL(endpoint).origin) throw new Error('No se pudo preparar el enlace de descarga. Intenta nuevamente.');
    } else if (source.protocol !== "blob:") {
      const response = await fetch(url);
      if (!response.ok) throw new Error("No se pudo descargar el archivo.");
      if (response.headers.get('content-type')?.includes('text/html') && !/\.html?$/i.test(asset.name || '')) throw new Error('El proveedor no entregó el archivo solicitado.');
      objectUrl = URL.createObjectURL(await response.blob());
      url = objectUrl;
    }
    // Attachment responses stream directly to the browser download manager; no full-file buffer.
    const link = document.createElement("a");
    link.href = url; link.download = asset.name || "archivo";
    document.body.append(link); link.click(); link.remove();
    if (objectUrl) setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
  } finally {
    if (button) { button.removeAttribute("aria-busy"); button.innerHTML = label; }
  }
}
