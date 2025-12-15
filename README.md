# Mi Proyecto Digital — Plantilla: Uso debido del celular

Este repositorio es una plantilla completa para la entrega del proyecto "Mi Proyecto Digital: Creatividad, Comunidad y Tecnología", enfocada al tema **Uso debido del celular**. Está pensada para que el estudiante reemplace los recursos por contenido 100% original (póster PSD, imágenes, videos, audio, QR).

## Estructura del proyecto
<!-- galeria.html (la navegación ya no incluye una página llamada 'galeria'. El póster y recursos están en assets/ y la sección multimedia se usa para videos) -->

## Requisitos y dónde cumplirlos
  - `assets/poster.psd` (archivo PSD editable) — póster sobre "Uso debido del celular"
  - `assets/poster.jpg` / `assets/poster.png` (exportado) — imagen final para mostrar en la web (index o multimedia)
  - `assets/poster.svg` (póster exportado de ejemplo)
  - `multimedia/Poster.jpg` (versión adicional del póster — ya incluida en la carpeta `multimedia` y mostrada en `index.html` y `multimedia.html`)
  - `assets/videos/tutorial.mp4`, `assets/videos/lizzie_style.mp4` — vídeos relacionados con el tema
  - `multimedia/codigo-qr.png` (actualmente apunta al número de teléfono: tel:0999822182 — sustituye si quieres otro destino como correo o vCard). Escanea el QR con la cámara del teléfono para ver más información o añadir la tarjeta digital.

## Login simulado

## Instrucciones para abrir el proyecto
1. Abrir la carpeta del proyecto en Visual Studio Code (o NetBeans): `File -> Open Folder` y selecciona la carpeta.
2. Para ver la web localmente, puedes abrir `index.html` (doble clic) o usar una extensión "Live Server" en VS Code.

### Nota: botón "Volver arriba"

Se añadió un botón "volver arriba" en `contacto.html` que usa la imagen `multimedia/frecha-volver.png` como icono. El comportamiento está implementado en `script.js` y los estilos en `estilo.css`.

Sugerencias / opciones futuras:

- Renombrar recursos para evitar espacios (ya se hizo para la flecha) — ayuda con rutas y servidores que tratan espacios de forma especial.
- Considera usar un SVG para la flecha (mejor escalado, fácil cambio de color mediante CSS y menor peso). Puedo convertir el PNG a SVG o añadir una versión SVG si quieres.
- Ajustar el umbral de aparición del botón (actual: 180px) o cambiar su posición/estilo según preferencia.

## Sección informativa en `index.html`

La sección que antes mostraba "Proyectos Destacados" ahora es "Información sobre el uso debido del celular". Contiene tres tarjetas informativas con consejos sobre seguridad, control del tiempo y privacidad. Puedes editar esta sección en `index.html` dentro del bloque "Projects Section" para personalizar los textos o agregar más recursos.

### Páginas nuevas (informativas)

Se añadieron 3 páginas informativas enlazadas desde la sección principal del `index.html`:

- `seguridad.html` — consejos para evitar distracciones al conducir y buenas prácticas de seguridad.
- `bienestar.html` — recomendaciones para controlar el tiempo de uso, descansar y mejorar el bienestar digital.
- `privacidad.html` — medidas para proteger datos y mejorar la privacidad en el teléfono.

Edita cualquiera de esos archivos para ampliar o personalizar el contenido.

## Multimedia y navegación

- Se añadieron recursos multimedia a las páginas informativas: imagen ilustrativa (`assets/poster.svg`) en `seguridad.html`, un vídeo de ejemplo en `bienestar.html` (archivo en `multimedia/`), y el QR en `privacidad.html` (`multimedia/codigo-qr.png`).
- También se añadieron enlaces directos a `seguridad.html`, `bienestar.html` y `privacidad.html` en la barra de navegación del sitio para acceso rápido desde todas las páginas.

## Estética y contenido ampliado

Se mejoró el aspecto visual de las tarjetas informativas (sombra, animación hover, CTA buttons) y se añadieron más contenidos en las páginas:

- `seguridad.html` — imagen ilustrativa, checklist y recursos (descargar póster).
- `bienestar.html` — vídeo de ejemplo, consejos prácticos y apps recomendadas.
- `privacidad.html` — QR destacado, checklist de privacidad y enlaces útiles.

Si quieres que ajuste colores, tamaños de fuente o agregue más imágenes/videos propios, dímelo y lo adapto.

## Entrega final (lista de comprobación)

## Notas para el docente

Si quieres, puedo:
## Enviar mensajes del formulario al correo (Gmail)

Actualmente el formulario de contacto valida y muestra una simulación visual. Para recibir los mensajes en tu cuenta Gmail (o cualquier otro correo) tienes estas opciones sencillas:

1) Usar Formspree (recomendado para páginas estáticas)
  - Regístrate en https://formspree.io y sigue las instrucciones para crear un formulario.
  - Copia el ID que te proporcionen en el formato: https://formspree.io/f/YOUR_FORM_ID
  - Abre `script.js` y reemplaza la constante FORMSPREE_ENDPOINT con tu URL (Ej.: https://formspree.io/f/mnqzwxyz).
  - En el dashboard de Formspree configura el email receptor (tu Gmail) y activaciones adicionales (protección anti-spam, verificación).

2) Usar EmailJS (sin backend, más control)
  - Regístrate en https://www.emailjs.com/, configura un servicio (Gmail o SMTP) y crea una plantilla.
  - Añade las credenciales públicas en el front-end (seguro si usas su public key) y actualiza `script.js` para llamar a emailjs.send().

3) Backend propio (Node/PHP/Python) usando SMTP / OAuth2
  - Si dispones de un servidor, puedes crear un endpoint que reciba el formulario y reenvíe el correo usando nodemailer (Node) o PHPMailer (PHP).
  - Para enviar desde Gmail mediante SMTP actualmente suele ser necesario usar OAuth2 o un password de aplicación (si tu cuenta lo permite).

Si quieres, puedo implementar la integración con Formspree por ti: dime la dirección Gmail donde quieres recibir los mensajes y registraré el flujo con un placeholder en `script.js` — necesitarás confirmar la URL real de Formspree cuando la tengas.

-> He implementado una opción temporal "mailto" que abre la app de correo del visitante con el destinatario configurado (gutierrezmero7772@sagradocorazon.edu.ec). Esto funciona de inmediato — recuerda que depende del cliente de correo del visitante y no queda registro en el sitio.

Si prefieres que los mensajes lleguen directamente a Gmail sin depender del cliente del visitante (y que además queden guardados), te puedo ayudar a configurar Formspree o EmailJS.

### Estado de integración (Formspree)

He integrado el endpoint de Formspree proporcionado (https://formspree.io/f/xpwvrzqg) directamente en `script.js`. Con esto los formularios deberían enviarse al correo que tengas configurado en tu panel de Formspree.

Prueba rápida para verificar el envío:
1. Abre `contacto.html` en un navegador (o usa Live Server).
2. Rellena el formulario y pulsa "Enviar mensaje".
3. Si el envío fue aceptado por Formspree recibirás una confirmación en el panel de Formspree y el correo llegará a la dirección que configuraste (revisa la carpeta SPAM si no ves el correo). 
4. Si el navegador muestra un error CORS o de red, revisa que el endpoint sea correcto y que Formspree ha activado el formulario para recibir envíos desde tu dominio/local.

#### Troubleshooting rápido (si ves solo la simulación)

- Si abres `contacto.html` con `file://` (doble clic), algunos servicios remotos pueden bloquear el envío por políticas CORS. Usa un servidor local (extensión Live Server en VS Code o `python -m http.server`) para probar en `http://localhost`.
- Abre la consola del navegador (F12 → Consola) y revisa mensajes. `script.js` ahora escribe información de depuración: mostrará el endpoint configurado y los campos del formulario; también mostrará errores de red/CORS.
- Asegúrate de que en el panel de Formspree el formulario está activo y que el email receptor está configurado. Si no estás seguro, prueba crear un nuevo formulario en Formspree y reemplaza el endpoint en `script.js` y el atributo `action` del formulario.
- Si prefieres no usar un servicio externo, puedes usar el fallback `mailto:` (abre la app de correo del visitante) o configurar EmailJS/tu propio backend para enviar correos sin depender del cliente.

Si quieres que pruebe un envío de verificación (yo mismo no puedo enviar emails desde aquí), prueba un envío desde tu navegador y dime si te llegó el correo; yo te ayudo a interpretar cualquier error.
