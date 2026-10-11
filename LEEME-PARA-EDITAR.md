# Proyecto unificado · IPUC Villa del Río

Abre `IPUC-Villa-del-Rio.code-workspace` en VS Code. Esta carpeta contiene la última web publicada (`636acb7`), su historial Git, recursos, backend y el código Android recuperado del trabajo local.

## Ver la web en este computador

Con Node.js 18 o posterior instalado, abre la terminal de VS Code:

```powershell
npm run dev
```

Visita http://127.0.0.1:4176/ y actualiza el navegador después de guardar cambios. No necesitas instalar paquetes. También puedes pulsar F5 para abrir Chrome con el depurador, o ejecutar la tarea «Abrir vista local». Ctrl+C detiene el servidor.

```powershell
npm run check
npm test
```

No abras los HTML mediante doble clic: las rutas, módulos y el modo offline necesitan un servidor local.

## Dónde editar

- `js/`, `css/`: lógica y apariencia de la web actual.
- `index.html`, `cuenta/`, `membresia/`, `lideres/`, `recursos/`, `podcast/`, `instalar/`: entradas de las secciones. Otras rutas usan `404.html` y `js/app.js`.
- `assets/`: imágenes, recursos y archivos estáticos usados por la web.
- `supabase/functions/`, `supabase/migrations/`: código del backend y migraciones. La base y archivos subidos siguen en Supabase/Drive; no están almacenados dentro de esta carpeta.
- `android/`: código Android en desarrollo recuperado de la copia anterior. Su guía conserva la configuración original; no se compiló ni publicó durante esta reorganización.
- `material-decom/`: archivos locales de Holyrics y manual administrativo.
- `respaldo-desarrollo/`: cambios locales anteriores sin publicar, incluidas propuestas de ubicación y pruebas adicionales. Se conservaron sin reemplazar la web actual. La rama local `respaldo/desarrollo-anterior` conserva la versión Git de esa copia.
- `privado/`: firma Android y scripts locales de migración. No compartir con terceros ni publicar.

## Cuenta y datos

La vista local usa el backend existente. Editar el código es local; guardar datos mediante los formularios puede cambiar la base real. Google tiene configurado el retorno local de `/cuenta/` en el puerto 4176. No hace falta volver a ejecutar migraciones para abrir el proyecto. No ejecutes scripts de migración antiguos automáticamente.

## Compartir con otro desarrollador

Entrega el código y esta guía, excluyendo `privado/`, `material-decom/`, `respaldo-desarrollo/`, `.git/`, cachés de compilación y archivos `.env`. El historial completo puede compartirse mediante el repositorio. Las claves privadas se configuran por separado; no deben añadirse al código.

## Publicar después de editar

El remoto `origin` apunta al sitio existente: https://github.com/decomvilladelrio/decomvilladelrio.github.io. La rama principal es `main` y GitHub Pages despliega sus cambios. Revisa y prueba antes de hacer commit/push. Los cambios en funciones de Supabase se despliegan por separado; subir la web no actualiza el backend.

Esta reorganización no publicó cambios ni borró las carpetas originales. Usa esta carpeta de D: como copia principal a partir de ahora.
