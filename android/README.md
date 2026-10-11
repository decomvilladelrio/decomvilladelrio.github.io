# App Android — IPUC Villa del Río

Esta app es un contenedor Android liviano de la web publicada de IPUC Villa del Río. Conserva la misma plataforma, rutas, autenticación, calendario, música, multimedia y panel administrativo; no duplica ni migra la lógica del sitio.

## Compilar

Desde esta carpeta, con Java 17 y el Android SDK configurados:

```powershell
.\gradlew.bat assembleRelease
```

El APK generado queda en `app/build/outputs/apk/release/`.

## Alcance del contenedor

- carga la web oficial desde `https://esteban7145.github.io/#/inicio`;
- mantiene JavaScript, almacenamiento local, cookies y reproducción multimedia;
- conserva dentro de la app los enlaces del mismo sitio;
- abre enlaces externos en el navegador del teléfono;
- permite el selector de archivos requerido por el panel administrativo;
- respeta el botón Atrás de Android para navegar por el historial web.
