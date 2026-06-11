# Landing Gestian — cómo ponerla online

Carpeta lista para publicar. Es un sitio estático (1 archivo HTML + carpeta `assets`). No necesita servidor ni base de datos.

## 1. Reemplazá los placeholders
Abrí `index.html` con cualquier editor de texto y buscá estos placeholders:

**En el `<head>` (arriba de todo) — analítica:**
1. **`G-XXXXXXXXXX`** → tu Measurement ID de Google Analytics 4. Aparece **2 veces**, cambialo en las dos. (De dónde sacarlo: ver sección 4.)
2. **`TU_PIXEL_ID_AQUI`** → tu ID de Meta Pixel. Aparece **3 veces**, cambialo en las tres. (De dónde sacarlo: ver sección 4.)

**En el `<script>` de CONFIG (al final) — funcionalidad:**
3. **`CAL_USERNAME`** → tu usuario y evento de Cal.com, ej. `"gestian/demo"`.
   - Si lo dejás vacío (`""`), la web muestra igual un botón "Agendar demo en Cal.com" + WhatsApp (modo respaldo).
4. **`FORM_ENDPOINT`** → endpoint para capturar los emails del checklist (Formspree o MailerLite), ej. `"https://formspree.io/f/xxxxx"`.
   - Si lo dejás vacío, el checklist igual se descarga; solo que no te guarda el email. (Recomendado: ponelo para no perder leads.)

**En el HTML — contacto:**
5. **WhatsApp / Redes / mail** → buscá `REEMPLAZAR` (Instagram, LinkedIn) y `francisco@gestian.com.ar`.

> Nota: si dejás los placeholders de analítica sin cambiar, la web funciona igual; solo que GA4 y el Pixel no registran datos hasta que pongas tus IDs reales.

## 2. Subila a internet (gratis)
Cualquiera de estas opciones, arrastrando la carpeta:
- **Netlify Drop:** https://app.netlify.com/drop → arrastrás la carpeta `landing` y queda online al toque.
- **Vercel** o **Cloudflare Pages:** similar, gratis.
- **Tu hosting** (Hostinger, etc.): subí el contenido por FTP a la raíz del dominio.

Conviene comprar el dominio `gestian.com.ar` y apuntarlo ahí.

## 3. Conectala con el resto
- En tu bio de Instagram y LinkedIn, poné el link a la landing.
- En la **secuencia de outbound** (`secuencia_outbound.md`), donde dice `[link-demo]` y `[link-web]`, usá esta landing / el link de Cal.com.

## 4. Analítica: de dónde saco cada ID y dónde lo pego
Los dos scripts (Google Analytics 4 y Meta Pixel) **ya están instalados** en el `<head>` del `index.html`. Solo tenés que reemplazar los placeholders por tus IDs reales.

### A) Google Analytics 4 — `G-XXXXXXXXXX`
1. Entrá a https://analytics.google.com con tu cuenta de Google.
2. **Administrar** (rueda dentada, abajo a la izquierda) → **Crear** → **Propiedad**. Ponele nombre (ej. "Gestian"), zona horaria Argentina y moneda ARS/USD.
3. Te va a pedir crear un **flujo de datos** (data stream): elegí **Web** → poné la URL `https://gestian.com.ar` y un nombre.
4. Al crearlo aparece el **"ID de medición"** (Measurement ID): tiene el formato **`G-XXXXXXXXXX`**. Copialo.
5. En `index.html`, buscá `G-XXXXXXXXXX` y reemplazá **las 2 apariciones** por tu ID.

### B) Meta Pixel — `TU_PIXEL_ID_AQUI`
1. Entrá a https://business.facebook.com → **Events Manager** (Administrador de eventos).
2. Clic en **Conectar orígenes de datos** / **Conectar datos** → elegí **Web** → **Meta Pixel** → **Conectar**.
3. Ponele un nombre al pixel (ej. "Gestian Pixel") y, si te lo pide, la URL del sitio.
4. Cuando se crea, arriba del nombre del pixel vas a ver un **número largo** (15-16 dígitos): ese es el **ID del Pixel**. Copialo.
5. En `index.html`, buscá `TU_PIXEL_ID_AQUI` y reemplazá **las 3 apariciones** por tu ID.

### Qué se mide ya configurado
- **PageView** — se dispara solo en cada visita (GA4 y Pixel).
- **Lead** (conversión en Meta) — se dispara cuando alguien **completa el form del checklist** o **hace clic en un CTA de "Agendar demo"**. En GA4 esos eventos llegan como `DescargaChecklist` y `AgendarDemo`.
  - Tip: en Events Manager podés marcar **"Lead"** como evento de conversión para optimizar campañas; en GA4 podés marcar `DescargaChecklist` y `AgendarDemo` como **eventos clave**.

### Verificá que quedó andando
- Instalá la extensión de Chrome **Meta Pixel Helper**: al abrir tu sitio publicado debería mostrar el pixel en verde y el PageView.
- En GA4 → **Informes → Tiempo real**: abrí tu sitio en otra pestaña y deberías verte como 1 usuario activo.

## Qué incluye la landing
- Hero con el pitch central (controlar el costo de obra al dólar en tiempo real) + mock del dashboard real.
- Sección de dolor, cómo funciona (con capturas reales), diferenciales.
- Captura de email que entrega el **checklist** (lead magnet) automáticamente.
- Testimonios (placeholders — reemplazalos con frases reales apenas tengas clientes).
- CTA final con embed de Cal.com (o botón de respaldo).
- Responsive (se ve bien en celular) y con la identidad de Gestian.

## Archivos
- `index.html` — la página (editá acá los placeholders).
- `assets/` — logo, capturas, portada y PDF del checklist.
