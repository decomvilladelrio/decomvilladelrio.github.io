# IPUC Villa del Río

Para editar esta copia unificada en VS Code, empieza por [LEEME-PARA-EDITAR.md](LEEME-PARA-EDITAR.md).

Aplicación web pública para consultar cultos, oraciones,
vigilias, ayunos y eventos de la congregación.

## Funciones

- Inicio con reflexión diaria, próximos eventos y anuncios.
- Calendario por año, mes, semana y día con colores por tipo de evento.
- Agenda mensual, búsqueda y filtros.
- Detalles compartibles por WhatsApp y descarga de calendarios `.ics`.
- Panel privado con Supabase Auth, base de datos y Storage.
- Cronograma interno DECOM.
- Banco de recursos IPUC con búsqueda, navegación por carpetas y descarga desde el repositorio oficial.

## Estructura

- `index.html`: estructura y metadatos.
- `css/`: estilos base y capa visual glassmorphism.
- `js/app.js`: datos, rutas, calendario, Supabase y administración.
- `assets/`: logo y vista previa social.
- `firestore.rules` y `storage.rules`: acceso público de lectura y escritura
  restringida al equipo autorizado.

La aplicación pública se despliega en GitHub Pages y conserva el enlace
existente. Los datos administrativos se conectan al proyecto Supabase
configurado en `js/app.js`.

Para cargar imágenes, videos, audios y archivos desde Administración debe
existir un bucket público llamado `event-media` en Supabase. Si el bucket no
está disponible, la interfaz bloquea las cargas y muestra el motivo sin perder
los datos del formulario.
