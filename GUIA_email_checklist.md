# Guía — Email automático del checklist (MailerLite + Netlify)

Cómo queda el flujo: alguien deja su email en la landing → la función serverless lo suscribe a un grupo de MailerLite → una automatización le envía el checklist **desde francisco@gestian.com.ar**. (La descarga en el navegador sigue siendo instantánea, igual que ahora.)

Ya están hechos: ✅ dominio autenticado, ✅ función serverless (`netlify/functions/subscribe.js`), ✅ `netlify.toml`, ✅ el form de la landing apunta a la función.

Te quedan 5 pasos (todos por única vez):

---

## PASO 1 · Crear el grupo en MailerLite
1. MailerLite → menú izquierdo **Subscribers** (Suscriptores) → **Groups** (Grupos).
2. **Create group** / **Crear grupo** → nombre: **`Checklist landing`** → crear.
3. Entrá al grupo. En la **URL del navegador** vas a ver un número largo, ej.
   `dashboard.mailerlite.com/subscribers?group=160848374...` → ese número es el **GROUP ID**. Copialo.

## PASO 2 · Generar la API key
1. MailerLite → **Integrations** (Integraciones) → buscá **"MailerLite API"** → **Use** / **Generar token**.
2. Ponele un nombre (ej. "Landing Gestian") y generá. **Copiá el token completo** (se ve una sola vez).
3. ⚠️ No lo pegues en ningún archivo del sitio ni me lo pases. Va directo a Netlify (paso 4).

## PASO 3 · Armar la automatización (el email con el checklist)
1. MailerLite → **Automations** (Automatizaciones) → **Create automation**.
2. **Trigger** (disparador): *"When subscriber joins a group"* → elegí **Checklist landing**.
3. Agregá un paso **Email**:
   - **From / Remitente:** `francisco@gestian.com.ar` (tu dominio ya autenticado).
   - **Asunto:** ej. *"Tu checklist para controlar la obra en dólares 📋"*.
   - **Contenido:** un saludo + un botón/enlace de descarga del PDF apuntando a
     `https://gestian.com.ar/assets/checklist_gestian.pdf`
     (el PDF ya viaja con la landing). Opcional: presentá la demo al final.
4. **Activá** la automatización (botón Enable / Activar).

## PASO 4 · Cargar las claves en Netlify (NO en el código)
1. Netlify → tu sitio → **Site configuration** → **Environment variables** → **Add a variable**.
2. Creá estas dos:
   - **Key:** `MAILERLITE_API_KEY` · **Value:** (el token del paso 2)
   - **Key:** `MAILERLITE_GROUP_ID` · **Value:** (el GROUP ID del paso 1)
3. Guardá.

## PASO 5 · Re-subir la landing a Netlify
Arrastrá la carpeta `05_Web/landing/` completa a Netlify (sobre el sitio existente o en app.netlify.com/drop).
- Importante: la carpeta **`netlify/`** y el **`netlify.toml`** tienen que ir incluidos (van adentro de `landing/`, así que con arrastrar la carpeta entera alcanza).
- Esto sube de una sola vez: las mejoras de la landing + el Pixel/GA4 (si ya pusiste los IDs) + la función del formulario.

---

## Probar que funciona
1. Abrí la landing publicada → dejá tu email en el checklist.
2. Deberías: (a) descargar el PDF al instante, (b) aparecer en **Subscribers → Checklist landing**, (c) recibir el email desde francisco@gestian.com.ar a los segundos.
3. Si no llega el email: revisá que la automatización esté **activa** y que las 2 variables de entorno estén bien escritas en Netlify.

> Nota técnica: la función vive en `https://gestian.com.ar/.netlify/functions/subscribe`. La API key se lee de la variable de entorno del servidor, nunca se expone en el navegador.
