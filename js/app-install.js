(() => {
  const button = document.getElementById("install-button");
  const status = document.getElementById("install-status");
  const update = document.getElementById("update-button");
  const standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  let prompt = null;
  const installed = () => { prompt = null; button.hidden = true; status.textContent = "Ya estás usando IPUC como app instalada."; };
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  document.getElementById(ios ? "ios-instructions" : "android-instructions").classList.add("recommended");
  if (standalone()) installed();
  else if (ios) status.textContent = "En iPhone, sigue los pasos de Safari que aparecen abajo.";
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault(); prompt = event;
    if (!standalone()) { button.hidden = false; status.textContent = "Tu navegador permite instalar la app en este dispositivo."; }
  });
  window.addEventListener("appinstalled", installed);
  button.addEventListener("click", async () => {
    if (!prompt) return;
    const offered = prompt; prompt = null; button.disabled = true;
    try {
      await offered.prompt();
      const choice = await offered.userChoice;
      status.textContent = choice.outcome === "accepted" ? "Instalación solicitada. Abre la app desde el icono de IPUC." : "Puedes instalarla más adelante desde el menú del navegador.";
    } catch { status.textContent = "Abre el menú del navegador y selecciona Instalar aplicación o Añadir a pantalla de inicio."; }
    finally { button.hidden = true; button.disabled = false; }
  });
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("/service-worker.js?v=20261003-mobile-1").then(async reg => {
    const offerUpdate = () => { update.hidden = !reg.waiting; };
    offerUpdate();
    reg.addEventListener("updatefound", () => { reg.installing?.addEventListener("statechange", offerUpdate); });
    update.addEventListener("click", () => {
      if (!reg.waiting) return;
      update.disabled = true; status.textContent = "Actualizando la app…";
      navigator.serviceWorker.addEventListener("controllerchange", () => location.reload(), {once:true});
      reg.waiting.postMessage("ACTIVATE_UPDATE");
    });
    await reg.update(); offerUpdate();
  }).catch(() => {
    status.textContent = "Comprueba tu conexión y recarga para preparar la instalación. Los pasos de tu teléfono están abajo.";
  });
})();
