# Pruebas antes de publicar cambios

**Uso:** registrar resultado, fecha, navegador/dispositivo y persona que prueba.
No se ejecutaron estas pruebas como parte de la preparación documental.

## A. Recursos: recorrido principal

| Caso | Prueba | Resultado esperado |
|---|---|---|
| R1 | Abrir Recursos como visitante sin sesión | Catálogo publicado se muestra; no hay error si el módulo nuevo no está aún integrado. |
| R2 | Buscar por título, etiqueta y frase con tildes | Coincidencias relevantes; acentos no impiden encontrar el material. |
| R3 | Combinar categoría, formato, orientación y departamento | Cada filtro se refleja visualmente; limpiar filtros devuelve el conjunto esperado. |
| R4 | Abrir preview de imagen, video, audio y PDF | Preview conserva proporción, tiene controles accesibles y no descarga por accidente. |
| R5 | Descargar un material de S3, Drive y Supabase | Se descarga con nombre correcto, no se abre solo una pestaña ni se guarda HTML de error. |
| R6 | Interrumpir o bloquear red durante una descarga | Mensaje accionable, sin indicador cargando infinito; se puede reintentar. |
| R7 | Catálogo mayor a 1.000 objetos | Se llega al último recurso sin omisiones ni duplicados. |
| R8 | Abrir la ficha en celular | Botones cómodos, preview legible, filtros utilizables, sin desbordamiento horizontal. |

## B. Recursos: controles de acceso (Supabase)

Usar sesión anónima, usuario autenticado normal y una cuenta administradora
autorizada. No probar solo ocultando controles de interfaz.

| Caso | Intento | Resultado esperado |
|---|---|---|
| S1 | Leer filas publicadas sin sesión | Solo filas publicadas. |
| S2 | Leer o descargar fila no publicada sin sesión | Bloqueado en base y Storage. |
| S3 | Descargar fuente publicada sin sesión | Solo por mecanismo previsto; la URL privada no debe ser permanente ni permitir otras rutas. |
| S4 | Insertar/editar/publicar desde usuario normal | Rechazado por RLS y Storage. |
| S5 | Subir preview/fuente como administrador autorizado | Permitido dentro del bucket/ruta y el límite definidos. |
| S6 | Editar favorito de otra cuenta | Rechazado; cada usuario gestiona solo sus propios favoritos. |
| S7 | Alterar ID, nombre de bucket o ruta en petición | Nunca revela fuente privada ni permite escribir fuera de la ruta autorizada. |
| S8 | Retirar recurso publicado | Deja de mostrarse al público; el manejo de archivos/versiones sigue la política acordada. |

**Registrar** usuario/rol de prueba, operación, respuesta y política revisada.
No incluir documentos, correos ni tokens en capturas o logs.

## C. Administración de archivos

- Crear borrador con preview JPG/PNG/WebP y fuente editable (PSD/AI/SVG/PDF/ZIP).
- Comprobar archivos permitidos, extensión engañosa, MIME incorrecto, archivo
  vacío, tamaño justo bajo y sobre el límite configurado (50 MiB actualmente).
- Subir una muestra MP4/WebM y un audio permitido; verificar reproducción y
  descarga por separado.
- Simular desconexión o cerrar pestaña durante cada carga. No crear un recurso
  publicado roto ni perder silenciosamente objetos huérfanos.
- Publicar con redistribución confirmada; intentar publicar sin confirmación y
  comprobar que se bloquea.
- Reemplazar una versión; comprobar que el historial conserva la anterior y la
  ficha apunta a la versión activa.
- Retirar/limpiar recurso con confirmación, manteniendo auditoría y evitando
  borrar archivos compartidos por otro recurso.

## D. Regresión de la web actual

- Inicio: Tierra 3D, versículo, audio/música y contenido inicial; comparar
  escritorio y móvil con la versión conocida.
- Navegación: menú, rutas directas, recarga en páginas internas y 404.
- Calendario: año, mes, semana y día; horarios confirmados martes/jueves/sábado
  7:00 p. m. y domingo 10:00 a. m.; eventos y enlaces `.ics`.
- Eventos: imagen portada después de editar, galería y materiales descargables.
- Membresía, cuenta, DECOM offline, líderes y administración con usuarios de
  cada rol; comprobar que visitantes no ven información privada.
- Podcast e historias: reproducción, pausa y convivencia con música.
- PWA: instalación/actualización, online/offline y que el service worker no deje
  una versión anterior atrapada.
- Compartir: probar URL y preview social del inicio, evento y recurso desde
  WhatsApp (y otros destinos usados por la iglesia).

## E. SEO, rendimiento y accesibilidad

- Canonical, `og:url`, `og:image` y Twitter metadata deben usar el dominio
  `decomvilladelrio.github.io`, no el dominio histórico.
- Medir Inicio, Recursos y Podcast en escritorio y móvil con Lighthouse; guardar
  informe antes y después. Registrar red, equipo, ruta y caché.
- Comprobar carga diferida del planeta solo en Inicio y que Three.js no se
  descargue en Recursos/Podcast si no se necesita allí.
- Probar tabulación y foco visible, lector de pantalla en controles principales,
  etiquetas de inputs, textos alternativos, contraste y reducción de movimiento.
- Verificar que no se registren datos personales, rutas privadas ni tokens en
  consola, telemetría o URL.

## F. Criterio de salida

No publicar hasta que todos los casos de seguridad de la sección B pasen, las
descargas principales y las rutas actuales no tengan regresiones, haya una
revisión visual móvil, y la persona responsable haya revisado los documentos y
el diff final. Documentar cualquier excepción con causa, riesgo y aceptación.

### Registro de ejecución

| Fecha | Versión/commit | Dispositivo y navegador | Casos | Resultado / incidencias | Revisor |
|---|---|---|---|---|---|
| Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
