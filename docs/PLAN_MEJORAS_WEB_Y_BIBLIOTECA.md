# Plan de mejoras del portal IPUC Villa del Río

**Estado:** documento de alcance para revisión · **Fecha:** 14 de octubre de 2026

**Repositorio de trabajo:** `D:\DECOM\PAGINA WEB DECOM VILLA DEL RIO`

**Sitio actual:** [decomvilladelrio.github.io](https://decomvilladelrio.github.io/)

## Propósito y límites

Mejorar la web existente por etapas, conservando la Tierra 3D, la identidad IPUC,
las rutas y los módulos que ya funcionan. La prioridad de producto es convertir
**Recursos** en una biblioteca clara para encontrar, previsualizar y descargar
materiales junto con sus archivos fuente autorizados. Las referencias visuales
de Magnific sirven como inspiración de navegación y descubrimiento; se conserva
el diseño propio de Villa del Río y no se reutilizan sus imágenes ni código.

Este documento describe trabajo propuesto y criterios para decidir si queda
listo. No autoriza ni representa una publicación. El código de la biblioteca
nueva sigue siendo un borrador local; el estado de la base de datos se explica
en [ESTADO_RECURSOS_IMPLEMENTACION.md](ESTADO_RECURSOS_IMPLEMENTACION.md).

## Arquitectura actual observada

- Sitio estático servido por GitHub Pages; enrutamiento y gran parte de las
  pantallas están en `js/app.js`.
- Recursos actuales combina objetos del bucket S3 público
  `elon-file.s3.us-east-1.amazonaws.com/Elon/descargas/` y enlaces de Google
  Drive. `js/downloads.js` prepara descargas de S3/Drive mediante la función
  Supabase `public-download`.
- Supabase ya se usa para autenticación, datos y Storage. Las cuentas
  administrativas existentes usan `public.is_ipuc_admin()` como control de
  acceso en base de datos.
- PWA/service worker y despliegue de GitHub Pages ya existen. El código web y las
  funciones/migraciones de Supabase se publican por vías separadas.

## Prioridades propuestas

### Fase 1 · Estabilidad y datos correctos

1. Cambiar metadatos sociales y canonical que todavía apuntan a
   `esteban7145.github.io` en `index.html` y `404.html` al dominio actual.
2. Corregir el catálogo S3 para seguir `IsTruncated` y `NextContinuationToken`;
   actualmente consulta una página con `max-keys=1000` y puede omitir objetos.
3. Probar descargas de S3, Drive y Supabase: que el botón descargue el archivo,
   maneje archivos grandes y presente errores entendibles.
4. Verificar categorías activas, búsqueda, filtros y navegación por carpetas en
   Recursos sin perder resultados al cambiar de filtro.
5. Mantener horarios confirmados por las piezas entregadas: cultos ordinarios
   martes, jueves y sábado a las 7:00 p. m.; domingo a las 10:00 a. m. No
   cambiar a 7:15 p. m. sin una fuente nueva de la iglesia.

### Fase 2 · Biblioteca de recursos

**Experiencia de visitante**

- Encabezado corto con buscador global y categorías comprensibles: Proyección,
  Diseños y plantillas, Estudios bíblicos, Multimedia, Institucional y
  Departamentos.
- Tarjeta con vista previa, título, uso, etiquetas, formato, orientación,
  resolución y tamaño. Acciones separadas: «Vista previa» y «Descargar».
- Ficha compartible por recurso con descripción, galería/video/PDF cuando aplique,
  y descargas claramente identificadas: archivo listo para usar y archivo
  editable/original.
- Filtros por formato, orientación, uso, departamento y tipo (estático,
  animado, documento, audio o editable); búsqueda por título, etiquetas y texto.
- Favoritos únicamente para usuarios autenticados; la biblioteca pública se
  puede explorar sin iniciar sesión.

**Gestión administrativa**

- Alta/edición desde Administración: título, descripción, categoría, etiquetas,
  uso, dimensiones, departamento, colección, licencia/atribución, vista previa,
  muestra audiovisual opcional, fuente editable y publicación destacada.
- Borrador privado mientras se carga; publicar requiere confirmar permiso para
  redistribuir. Reemplazar archivo debe conservar la versión anterior y dejar
  un historial de quién cambió qué y cuándo.
- La vista previa puede ser pública solo para recursos publicados; los archivos
  fuente permanecen en un bucket privado y se entregan con URL temporal luego
  de verificar que el recurso está publicado (o que el usuario es administrador).
- Validar tamaño y MIME real en servidor/Storage, no solo en el formulario.
  Extensiones habituales: imágenes JPG/PNG/WebP/SVG, video MP4/WebM, audio
  compatible y fuentes PSD/AI/SVG/PDF/ZIP. Configurar límites según el plan real
  de Supabase y probar archivos grandes antes de aceptar el flujo.
- Usar miniaturas optimizadas, `loading="lazy"`, paginación y consultas por
  filtros. No descargar archivos editables para construir una miniatura en el
  navegador.

**Modelo de datos deseado**

`library_resources` describe el recurso y referencia preview, muestra y fuente;
`library_resource_versions` guarda instantáneas de cambios; `library_favorites`
asocia recursos favoritos a `auth.uid()`. Los objetos se guardan en
`resource-previews` y `resource-files`. No duplicar el sistema existente de
cuentas ni poner archivos privados en caché pública.

### Fase 3 · Rendimiento sin rediseño innecesario

- Cargar Three.js solo en la página Inicio, conservando exactamente la Tierra
  3D. Revisar import maps y scripts en Inicio, Recursos, Podcast y 404; quitar
  duplicación solo tras comparar la experiencia existente.
- Reducir la espera artificial del cargador de `js/app.js` de forma gradual,
  comprobando que no aparezca contenido sin estilos ni un parpadeo.
- Usar imágenes pequeñas para tarjetas y reservar los originales para la
  previsualización. No bloquear el render por el catálogo o el audio.
- La auditoría indicó que Inicio termina casi enseguida del planeta y el
  versículo. Evaluar debajo agenda próxima, anuncio y accesos rápidos sin
  alterar el hero ni la Tierra.

### Fase 4 · Navegación, contenido y acceso móvil

- Eventos: enlaces compartidos deberían mostrar metadatos específicos; el HTML
  social requiere una solución compatible con rastreadores que no ejecutan
  JavaScript. Probar enlaces reales en WhatsApp antes de considerarlo resuelto.
- Calendario: conservar vistas actuales y revisar una vista «Esta semana» para
  móvil. Anuncios: verificar si las tarjetas ya tienen caducidad, imagen y acción
  antes de agregar duplicados.
- Membresía, cuenta y líderes: mantener campos, PWA y permisos actuales. Probar
  acceso real por rol y reglas RLS desde Supabase; ocultar botones no constituye
  autorización.
- Podcast, ubicación y música: revisar en dispositivos reales. El video/audio
  debe poder controlarse y no debe empezar música inesperadamente.
- Accesibilidad: contraste, foco, teclado, texto alternativo, etiquetas de
  formulario y `prefers-reduced-motion`.

## Criterios para aceptar Recursos

- Cada elemento muestra una imagen o reproductor de vista previa y distingue
  claramente la descarga de uso final de la descarga editable.
- Usuario anónimo solo puede ver elementos publicados y sus previews/muestras.
  Un recurso sin publicar y su fuente no se pueden leer desde una sesión anónima.
- Solo administradores aprobados pueden cargar, editar, publicar, retirar y
  borrar materiales. La decisión se aplica con RLS y políticas de Storage.
- Al reemplazar la fuente no se pierde el historial ni se rompe el enlace de la
  ficha; los fallos de subida dejan el registro en borrador.
- Todas las acciones de descarga producen un archivo descargado con nombre
  razonable; fallos de red se informan y permiten reintentar.
- Catálogo completo con paginación, filtros combinables, móvil y teclado.
- Los permisos de redistribución quedan registrados antes de publicar.

## Publicación

Publicar solo después de que la persona responsable revise estos documentos y
el borrador, se integren los cambios aprobados, pasen las pruebas de
[PLAN_PRUEBAS_PREPUBLICACION.md](PLAN_PRUEBAS_PREPUBLICACION.md), y se confirme
qué cambios de Supabase ya están aplicados. El despliegue del sitio en GitHub
Pages no despliega funciones de Supabase.
