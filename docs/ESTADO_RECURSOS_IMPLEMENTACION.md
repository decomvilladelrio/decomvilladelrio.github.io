# Estado de la biblioteca de recursos

**Corte:** 14 de octubre de 2026 · **Entorno:** copia local D: y proyecto Supabase
existente. No se publicó la web nueva.

## Resumen

| Parte | Estado observado | Qué significa |
|---|---|---|
| Catálogo web actual | En producción | S3 público más enlaces Drive, renderizados por `js/app.js`. |
| Descarga existente | Implementada | `js/downloads.js` delega S3/Drive a `public-download`; falta verificación end-to-end en el navegador de producción. |
| Gestor nuevo de recursos | Borrador local sin integrar | Existe `js/resource-library.js`, pero `js/app.js` no lo importa y no hay pantalla administrativa conectada. No usarlo como función terminada. |
| Migración SQL | Aplicada al proyecto Supabase | Esquema, políticas RLS y dos buckets ya existen en el backend; los cambios de esquema no equivalen a publicación de la web. |
| Subidas reales y descargas firmadas nuevas | No verificadas | No hay una prueba de flujo admin → publicar → visitante → bajar fuente registrada. |
| Publicación de código | No hecha | No ejecutar push/deploy hasta revisión explícita posterior. |

## Revisión de backend (consulta de solo lectura)

En el proyecto Supabase `btgdhddlxqwezdzvngmg` se confirmaron:

- Tablas `public.library_resources`, `public.library_resource_versions` y
  `public.library_favorites`.
- Buckets `resource-previews` y `resource-files`.
- Políticas RLS para lectura pública de recursos publicados, administración,
  versiones y favoritos asociados a la propia cuenta.
- Políticas de Storage para previews y fuentes, con acceso de administración
  validado por `public.is_ipuc_admin()`.

El archivo de migración local correspondiente es
[`../supabase/migrations/20261011201125_resource_library.sql`](../supabase/migrations/20261011201125_resource_library.sql).
La consulta del esquema confirmó objetos y políticas, pero no prueba que cada
combinación de permisos funcione en una sesión anónima y en cuentas de distintos
roles. La matriz pendiente está en el plan de pruebas.

### Atención: cambio remoto ya aplicado

La migración de biblioteca **sí se aplicó al Supabase conectado antes de que se
pidiera detener la implementación y dejar documentación**. Añade tablas,
políticas y buckets; no elimina datos preexistentes. Se debe incluir esta
realidad en cualquier revisión y no volver a aplicar la migración a ciegas. El
código nuevo aún no se ha publicado en GitHub Pages.

Los archivos fuente quedan en un bucket privado. El archivo de migración limita
cada objeto a 50 MiB. Revisar el límite del plan vigente y el tamaño real de
archivos PSD/AI antes de habilitar la subida; los límites del formulario y del
bucket deben coincidir.

## Estado del árbol de trabajo

- `js/resource-library.js`: archivo local no rastreado que contiene una
  implementación preliminar. Falta revisión de seguridad, accesibilidad,
  integración, errores de red, versionado y pruebas. No es visible en el sitio
  porque la aplicación no lo carga.
- `supabase/migrations/20261011201125_resource_library.sql`: archivo local de
  migración ya aplicada al backend. Conservarlo para que el historial del
  proyecto documente el esquema.
- `js/app.js`: el diff local visible solo convierte tres finales de línea
  CRLF/LF; no hay cambios funcionales en esas diferencias. El renderizador actual
  sigue cargando el catálogo anterior.
- No se ha añadido una pantalla de administración, no se han cargado materiales
  nuevos y no se ha desplegado el código de biblioteca.

## Hallazgos de catálogo existentes

1. `loadResourceCatalog()` solicita una única lista S3 con `max-keys=1000`, sin
   continuar con `NextContinuationToken`. Con más de 1.000 objetos algunos
   recursos no aparecerán.
2. Categorías existentes se derivan principalmente de las carpetas S3; para
   usuarios, se necesitan categorías/etiquetas editoriales consistentes.
3. Existe contenido que viene de Google Drive además del S3. La transición debe
   preservar esas fuentes y no cambiar enlaces hasta validar cada archivo.
4. `js/downloads.js` trata Supabase Storage añadiendo `download` y delega S3 o
   Drive a `public-download`. La biblioteca nueva usará fuentes privadas, por
   lo que hay que verificar la descarga autenticada/temporal y validar que el
   visitante no pueda solicitar un objeto no publicado.
5. La primera página del catálogo no debe ser la única fuente de la búsqueda:
   definir paginación o índice consultable y estados de carga/error/vacío.

## Pasos técnicos para retomar

1. Revisar el SQL y el módulo local contra los criterios de seguridad y
   aceptación del plan principal. Confirmar que nombres de buckets y rutas de
   objetos coinciden en ambos.
2. Reconciliar la migración ya aplicada con Git local y evitar cualquier
   ejecución duplicada. Obtener respaldo/esquema antes de cambios posteriores.
3. Terminar el módulo de Storage: preview público solo publicado, fuente privada
   servida temporalmente, límite de tamaño, MIME, limpieza segura tras fallo y
   reemplazo versionado.
4. Conectar la biblioteca al router y al panel administrativo con carga
   diferida. Dejar el catálogo legado disponible hasta validar paridad.
5. Poblar solo recursos con permiso de redistribución verificado; comenzar con
   un conjunto pequeño y revisar nombre, preview, editable y descarga.
6. Completar la matriz de pruebas y revisión manual. Solo después preparar el
   commit y solicitar/publicar el deploy.

## No verificado todavía

Inicio de sesión de administradores para las nuevas políticas; lecturas anónimas
de objetos publicados/no publicados; subidas mayores; reproducción de muestras;
URLs temporales; descarga desde iOS/Android; limpieza de versiones antiguas;
actualización del service worker; render móvil y catálogo con más de 1.000
archivos. No anunciar la biblioteca nueva como disponible hasta cubrir esto.
