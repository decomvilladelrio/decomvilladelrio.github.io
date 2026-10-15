# Manual técnico de la web IPUC Villa del Río

**Para quién:** Esteban, equipo DECOM y cualquier persona que vaya a mantener el sitio.

**Fecha:** 14 de octubre de 2026 · **Carpeta principal:** `D:\DECOM\PAGINA WEB DECOM VILLA DEL RIO`

**Sitio público:** [https://decomvilladelrio.github.io/](https://decomvilladelrio.github.io/)

Este manual explica qué contiene el proyecto, cómo se conecta, dónde se modifica
cada parte y cómo trabajar sin publicar por accidente. Describe el código que
está en esta carpeta; no significa que cada idea de los planes ya esté
implementada. Para el estado de la nueva biblioteca, consulta
[Estado de Recursos](ESTADO_RECURSOS_IMPLEMENTACION.md).

## 1. ¿Qué es este proyecto?

Es una aplicación web congregacional estática. El navegador descarga archivos
HTML, CSS y JavaScript desde GitHub Pages. JavaScript arma las páginas y
consulta servicios externos cuando hace falta. Supabase guarda y protege datos,
usuarios y archivos administrativos; Google Drive y un bucket S3 alojan algunos
materiales anteriores.

```text
Chrome / Safari / Edge
        │ solicita archivos del sitio
        ▼
GitHub Pages ── HTML, CSS, JavaScript, imágenes, PWA
        │                         │
        │ llamadas HTTPS          └── Three.js / escena 3D del planeta
        ▼
Supabase Auth + Postgres + Storage + Edge Functions
        │
        ├── Google OAuth
        ├── Drive / S3 para contenido existente
        └── IndexedDB cifrada en el dispositivo para altas DECOM offline
```

El código del sitio no incluye el servidor de base de datos. Este repositorio
contiene archivos de migración y funciones del backend, pero los datos reales y
archivos subidos viven en cuentas externas. Por eso, cambiar CSS o ejecutar la
vista local no crea un respaldo de la base real.

## 2. Lenguajes y por qué se usan

| Tecnología | Para qué se usa aquí |
|---|---|
| HTML | Esqueleto de cada ruta, metadatos para navegadores y enlaces a CSS/JS/manifiesto. |
| CSS | Diseño, colores, tamaños, adaptación móvil, estados de botones y animaciones. |
| JavaScript moderno | Navegación, calendario, formularios, acceso a Supabase, renderizado y medios. Corre directamente en navegadores y permite mantener el sitio estático sin servidor propio. |
| SQL / PostgreSQL | Tablas, índices, validaciones, permisos RLS, funciones y migraciones de Supabase. Define reglas cerca de los datos. |
| TypeScript en Deno | Funciones Supabase ejecutadas en el servidor: validan peticiones y realizan operaciones que no deben confiarse al navegador. |
| JSON / Web Manifest | Configuración de Firebase, opciones PWA y de escena, y datos estructurados. |
| SVG | Logos, íconos e invitaciones escalables que conservan nitidez. |
| Node.js | Ejecuta la vista local de desarrollo; no convierte la web publicada en una aplicación Node ni reemplaza Supabase. |

No es una aplicación React/Vue ni hay un paso de compilación obligatorio: la
mayor parte es JavaScript del navegador escrito directamente. Se usan módulos
ES donde conviene (`import`, `export`) y objetos compartidos en `window` en
algunos módulos existentes. Esta mezcla refleja la evolución gradual del sitio.

## 3. Cómo se abre una página

1. El navegador recibe `index.html` al abrir `/`.
2. El HTML carga CSS, el script principal `js/app.js`, el import map de Three.js
   y la escena `js/earth-hero.js`.
3. `app.js` lee la URL, interpreta la ruta, consulta estado local/remoto y
   construye el contenido dentro del contenedor de la aplicación.
4. Si una página necesita sesión o datos privados, el cliente Supabase valida la
   sesión y las reglas del backend deciden qué se puede leer o cambiar.
5. En navegación interna, el código vuelve a dibujar la ruta. Al entrar por una
   URL directa o recargarla, GitHub Pages devuelve `404.html`, que sirve de
   carcasa para rutas virtuales; `app.js` reconoce la dirección y dibuja la vista.

Las páginas internas pueden tener su propio HTML (por ejemplo, `/cuenta/`),
pero varias rutas como `/admin` o `/evento/...` son vistas creadas desde la
aplicación principal. Primero identifica si el contenido proviene de HTML o de
una función `render...` de `js/app.js`.

## 4. Mapa de carpetas y archivos

| Ubicación | Contenido y función |
|---|---|
| `index.html` | Entrada del Inicio: idioma, título, metadatos sociales, CSS, import map y scripts principales. |
| `404.html` | Carcasa de enrutamiento para rutas internas de GitHub Pages. Si falla, rutas como `/admin` pueden fallar al recargar. |
| `js/app.js` | Aplicación central: datos, rutas, calendario, Inicio, eventos, administración, membresía e integración. Es el archivo más grande; buscar función antes de editar. |
| `js/user-account.js` | Interfaz de acceso, cuenta y sesión; llamadas a la función segura `member-account`. |
| `js/member-profile.js` | Campos estructurados de habilidades, estudios, disponibilidad e intereses. |
| `js/decom-registration.js` | Formulario DECOM, borrador, pendientes locales y sincronización. |
| `js/decom-store.js` | Almacén DECOM local: IndexedDB, cifrado Web Crypto y gestión de registros del dispositivo. |
| `js/committee-panel.js` | Panel de líderes por comité: equipo, invitaciones, calendario, tareas, reuniones, archivos e historial. |
| `js/earth-hero.js` | Escena Three.js de la Tierra, adaptación de tamaño, animación y fallback. |
| `js/downloads.js` | Utilidad común para descargas de Supabase, Drive y S3 mediante el mecanismo existente. |
| `js/app-install.js` | Instalación PWA y actualización del service worker. |
| `js/vendor/supabase-2.57.4.js` | Cliente Supabase de navegador; no editar código de proveedor. |
| `css/styles.css` | Estilos base y estructura global. |
| `css/modern.css` | Componentes y navegación moderna. |
| `css/platform-runtime.css` | Interfaz dinámica compartida. |
| `css/admin.css` | Panel administrativo y formularios de administración. |
| `css/home-hero.css` | Hero del Inicio y presentación de la Tierra. |
| `css/resources.css` | Tarjetas, filtros y vistas previas del catálogo actual de Recursos. |
| `css/podcast.css` | Historias/Podcast y reproductor. |
| `css/membership-decom.css` | Membresía, inscripción y pantallas DECOM. |
| `css/user-account.css` | Cuenta, acceso y perfil. |
| `css/committee-panel.css` | Panel de líderes/comités. |
| `service-worker.js` | Archivos guardados para PWA, solicitudes offline, versiones y limpieza de caché. |
| `manifest.webmanifest` | Nombre, icono, alcance, color y accesos rápidos de PWA. |
| `membresia/decom/manifest.webmanifest` | Manifiesto separado para instalar el modo de registro DECOM. |
| `cuenta/`, `membresia/`, `lideres/`, `recursos/`, `podcast/`, `instalar/` | Entradas HTML de secciones específicas. Revisar rutas absolutas antes de mover archivos. |
| `assets/` | Logos, carteles, escenas 3D, iconos e imágenes. |
| `supabase/functions/` | Funciones TypeScript/Deno del backend, desplegadas por separado. |
| `supabase/migrations/` | SQL que documenta cambios de tablas y permisos. Verificar el estado remoto antes de aplicar. |
| `tests/` | Pruebas de regresión y seguridad. |
| `scripts/serve.cjs` | Servidor HTTP local sin dependencias; solo vista previa. |
| `package.json` | Comandos npm y requisito de Node.js. No configura compilación frontend. |
| `IPUC-Villa-del-Rio.code-workspace` | Espacio de trabajo de VS Code y tareas del proyecto. |
| `firestore.rules`, `storage.rules`, `firebase.json`, `.firebaserc` | Configuración heredada de Firebase; no asumir que todas las funciones actuales lo usan. |
| `android/` | Proyecto Android en desarrollo, independiente del despliegue GitHub Pages. |
| `material-decom/`, `privado/`, `respaldo-desarrollo/` | Material local, secretos/firmas y respaldos. No compartir ni desplegar por accidente. |

## 5. Aplicación central: `js/app.js`

`app.js` contiene varias generaciones de código. Usa búsqueda de VS Code
(`Ctrl+Shift+F`) para localizar función y sus llamadas antes de editar.

| Tarea | Busca | Revisa también |
|---|---|---|
| Texto, categorías o colores de eventos | `TYPES`, `PROGRAMMED_EVENTS`, `AUTO_EVENT_DESCRIPTIONS`, `TAGS` | calendario, tarjetas y formulario admin. |
| Inicio | `renderHomePage`, `buildHeroSummary`, `dailyReflection` | `css/home-hero.css`, `js/earth-hero.js`. |
| Calendario y agenda | `renderCalendarPage`, `renderAgendaPage`, `renderCalendar`, `eventsFor`, `buildIcs` | estilos de calendario y descarga `.ics`. |
| Tarjetas y detalle de evento | `renderEventsPage`, `renderEventDetail`, `eventPageUrl`, `shareEventOnWhatsApp` | metadatos sociales, galería y descarga. |
| Guardar/borrar evento | `saveAdminEvent`, `deleteAdminEvent`, `loadAdminEvent` | permisos, archivos y Supabase. |
| Anuncios y reflexiones | `renderAnnouncements`, `saveAnnouncement`, `reflectionForDate` | configuración, expiración y estilos. |
| Catálogo actual de Recursos | `renderResourcesPage`, `loadResourceCatalog`, `resourceUrl`, `resourceKind` | `css/resources.css`, `js/downloads.js`. |
| Directorio de miembros | `loadMembershipAdmin`, `renderMembershipAdminModule`, `renderMemberDirectoryRow` | `js/member-profile.js`, funciones y RLS. |
| Cuenta / login | `renderUserAccountPage`, `renderLoginPage` | `js/user-account.js`, `css/user-account.css`, Supabase Auth. |
| Líderes / comité | `renderCommitteePage`, `renderLeaderPage` | `js/committee-panel.js`, CSS y permisos. |
| Registro offline | `renderDecomOnlyPage` | `js/decom-registration.js`, `js/decom-store.js`, PWA y backend. |
| Música y audio | `setupChurchMusic`, `stopChurchMusic`, `stopReflectionMedia` | reproductores y cambios de ruta. |
| Backend | `SUPABASE_CONFIG`, `cloud` y funciones de carga/guardado | Edge Functions, migraciones y RLS. |

La aplicación es principalmente imperativa: funciones crean HTML, lo asignan a
un contenedor y registran eventos. Para insertar texto en HTML usa helpers de
escape existentes como `escapeHtml`; valida también en backend. No pongas datos
personales en URL ni en `console`.

## 6. CSS: cambiar el aspecto

Busca el nombre de clase del HTML en `css/` con `Ctrl+Shift+F`. Cambia el CSS más
específico (por ejemplo `resources.css` para una tarjeta de Recursos). Si una
regla ya está en `styles.css`, `modern.css` o `platform-runtime.css`, entiende la
cascada: una regla posterior o más específica puede anularla.

Los HTML añaden `?v=...` a CSS/JS para invalidar caché al publicar. Después de
un cambio publicado, actualiza el valor de versión correspondiente. Cambiar una
clase del JavaScript sin cambiar sus selectores CSS puede dejar la pantalla sin
diseño. Para móvil revisa los `@media`, los textos largos, el foco y el
desbordamiento horizontal.

## 7. Servicios y datos

### Supabase y acceso

`SUPABASE_CONFIG` en `js/app.js` contiene URL del proyecto y clave publicable de
navegador. La clave publicable está diseñada para estar en el cliente, pero las
políticas RLS y las Edge Functions deben proteger los datos. Nunca pongas en JS
una `service_role`/secret key, contraseña, token privado o secreto OAuth.

Google funciona como proveedor de Supabase Auth. La identidad de usuario y su
registro de membresía son datos relacionados, pero separados. `user-account.js`
envía acciones a `member-account` con el token; el servidor decide qué miembro
puede consultar o cambiar.

### Funciones Edge

- `member-account`: cuenta, perfil y asociación con membresía bajo sesión.
- `member-registration`: alta/actualización de miembro y foto; valida campos,
  autorización y sincronización DECOM.
- `member-card-email`: entrega de carné por correo.
- `drive-upload`: operaciones de archivos autorizadas con Google Drive.
- `public-download`: prepara descargas de recursos publicados de Drive/S3.

Estas funciones se escriben en TypeScript y se ejecutan en Deno. Para cambiarlas,
edita su carpeta, valida permisos/variables, prueba y despliega la función por
separado. GitHub Pages no despliega el backend.

### SQL, tablas y RLS

Cada cambio de esquema se documenta con una nueva migración SQL; no reescribas
una migración ya aplicada. Antes de ejecutarla, confirma el estado remoto,
conserva datos, revisa RLS y limita permisos. RLS es la barrera real; ocultar un
botón no es autorización.

La migración `20261011201125_resource_library.sql` ya se aplicó en Supabase,
según la consulta registrada en
[el estado de Recursos](ESTADO_RECURSOS_IMPLEMENTACION.md). No volver a
ejecutarla a ciegas. El esquema nuevo todavía no está conectado a una pantalla
pública terminada.

## 8. Cuenta, membresía, DECOM y privacidad

- `user-account.js` mantiene la sesión de navegador y la pantalla de cuenta;
  `member-account` decide acciones válidas en el servidor.
- `member-profile.js` representa habilidades, estudios, disponibilidad e
  intereses en campos estructurados. La interfaz debe admitir nulos/listas
  vacías de miembros antiguos.
- `decom-registration.js` conduce la inscripción y sincronización. `decom-store.js`
  usa IndexedDB y Web Crypto; la contraseña local desbloquea ese equipo, no es el
  login Google ni una contraseña compartida con otros computadores.
- Fotos/documentos de membresía son privados. Abrirlos requiere autorización y
  enlaces firmados de corta duración. No agregarlos al caché público del service
  worker.
- Probar en el backend que un miembro solo accede a sus datos y que líderes solo
  acceden a su comité.

## 9. PWA y caché

`manifest.webmanifest` define nombre, icono y rutas rápidas. `service-worker.js`
guarda una lista de archivos y tiene un `CACHE_NAME` versionado. Al cambiar
recursos esenciales, actualizar lista/versión, comprobar limpieza de cachés
anteriores y evitar archivos privados. `app-install.js` facilita instalación y
actualizaciones.

El registro DECOM requiere preparar el dispositivo con conexión. La PWA no
convierte automáticamente videos, descargas ni el panel completo en offline.

## 10. Abrir y editar desde VS Code

1. Abre `IPUC-Villa-del-Rio.code-workspace` desde la carpeta D:.
2. En la terminal integrada de VS Code ejecuta:

   ```powershell
   npm run dev
   ```

3. Abre `http://127.0.0.1:4176/` en Chrome. El servidor sirve la copia D:.
4. Detén el servidor con `Ctrl+C` en esa terminal.
5. Comandos existentes para comprobar el código:

   ```powershell
   npm run check
   npm test
   ```

`npm run check` revisa sintaxis de algunos JavaScript; `npm test` ejecuta pruebas
de regresión. No prueban por sí solos OAuth, Storage, permisos ni visualización
real en cada teléfono.

La vista local usa el backend configurado. Abrirla no publica código, pero
iniciar sesión, enviar formularios, subir/borrar archivos o editar eventos puede
cambiar datos reales en Supabase/Drive. Para explorar, evita enviar formularios
de administración.

## 11. Recetas para cambios habituales

### Texto o sección

Busca el texto. Si está en `app.js`, ubica la función `render...`; si está en
HTML, edita la entrada de esa ruta. Busca el mismo texto/clase en CSS. Prueba la
URL directa y la navegación del menú.

### Diseño o colores

Busca la clase en `css/`, edita el archivo del módulo y prueba escritorio y móvil,
incluidos textos largos, teclado y movimiento reducido.

### Imagen de evento

Para una imagen predeterminada, cambia el archivo bajo `assets/` y actualiza la
referencia del evento. Para una imagen cargada por administración, el archivo
vive en Supabase/Drive. Verifica detalle, calendario, tarjetas, compartir y
descargar.

### Recursos y descargas

El catálogo publicado está en `renderResourcesPage()` y `loadResourceCatalog()`
de `app.js`; `js/downloads.js` prepara la descarga. El catálogo S3 consulta hasta
1.000 objetos en una sola página. `js/resource-library.js` es una propuesta
separada, aún sin integrar; no mezcles ambos sistemas sin revisar los documentos
de alcance y estado.

### Registro DECOM offline

Edita `decom-registration.js` para formularios y flujo; `decom-store.js` para
almacenamiento. Conserva UUID, Blob de foto, cifrado, borrador, sincronización,
confirmación en servidor e idempotencia. Verifica cierre/recuperación, varios
registros, reintentos y duplicados.

### Permisos

Localiza la Edge Function y tabla afectadas. Cambia servidor/RLS con una nueva
migración cuando corresponda. Prueba sin sesión, miembro, líder de otro comité y
administrador. Nunca autorices por el nombre visible.

### Planeta Tierra

La escena está en `js/earth-hero.js`, el modelo y configuración en
`assets/earth/`, y el estilo en `css/home-hero.css`. Si cambias el modelo, valida
materiales, objetos nombrados, rendimiento, móvil y fallback.

## 12. Reglas prácticas para no romper el sitio

- Haz cambios pequeños y revisa el diff antes de publicar.
- Conserva rutas que comienzan con `/`; al mover HTML verifica enlaces, service
  worker y retorno OAuth.
- No publiques claves privadas, `.env`, certificados Android ni `privado/`.
- En HTML dinámico escapa texto y maneja error, carga y estado vacío.
- Actualiza versiones `?v=...` y el caché del service worker cuando corresponda.
- No guardes fotos ni datos personales en caché público.
- Sigue las pruebas de [prepublicación](PLAN_PRUEBAS_PREPUBLICACION.md). Publicar
  solo después de revisar los cambios y con autorización expresa.

## 13. Publicación

El remoto de esta carpeta publica la rama `main` en GitHub Pages. El flujo normal
es revisar el estado y diff, validar cambios locales, y luego preparar commit y
push cuando la persona responsable lo pida. Supabase (migraciones y funciones)
se despliega por separado.

La interfaz nueva de Recursos no se ha publicado. El backend de Supabase sí
incluye su migración; cualquier integración posterior debe reconciliar primero
backend y repositorio usando el documento de estado.

## 14. Glosario

- **Ruta:** dirección de una vista, como `/cuenta/` o `/evento/identificador`.
- **Renderizar:** crear o actualizar el HTML visible.
- **Edge Function:** endpoint con código ejecutado en el servidor.
- **RLS:** reglas PostgreSQL que limitan las filas accesibles para cada rol.
- **Bucket:** espacio de almacenamiento de objetos/archivos.
- **URL firmada:** enlace temporal para un archivo privado.
- **Service worker:** script que coordina caché, offline y actualización.
- **IndexedDB:** base local del navegador que admite estructuras y fotos; se usa
  para registros pendientes DECOM.
- **PWA:** sitio instalable que usa capacidades del navegador.
- **Deploy/publicar:** poner código en el sitio real. Guardar o ver localhost no
  es publicar.
