# Landing Gestian — Analítica y retargeting (guía rápida)

La landing ya viene preparada para medir todo. Solo tenés que pegar 2 IDs en el `<script>` de CONFIG dentro de `index.html`. Si los dejás vacíos, no pasa nada (la web funciona igual, solo no mide).

## 1. Google Analytics 4 (GA_ID) — para ver cuánta gente entra y qué hace
1. Entrá a https://analytics.google.com → creá una propiedad para tu sitio.
2. Te da un **ID de medición** con forma `G-XXXXXXXXXX`.
3. En `index.html`, buscá `const GA_ID = "";` y poné tu ID entre las comillas.

## 2. Meta Pixel (META_PIXEL_ID) — para hacer retargeting en Instagram/Facebook
**Esto es lo más importante para los ads:** te permite mostrarle anuncios solo a quien ya entró a la web (los que más convierten).
1. Entrá a https://business.facebook.com → Administrador de eventos → Conectar orígenes → Web → Meta Pixel.
2. Te da un **ID de píxel** (una serie de números).
3. En `index.html`, buscá `const META_PIXEL_ID = "";` y pegá el número entre las comillas.

## 3. Qué se mide automáticamente (ya está programado)
- **PageView** — cada visita.
- **AgendarDemo** — cada clic en cualquier botón "Agendar demo", el de Cal.com y el de WhatsApp. (En Meta se registra como `Lead`.)
- **DescargaChecklist** — cuando alguien deja su email y baja el checklist. (En Meta, `Lead`.)

Con esos eventos vas a poder, en Meta:
- Crear un **público de retargeting** (gente que visitó pero no agendó) y mostrarle el anuncio de "Agendá tu demo".
- Crear un **público similar (lookalike)** a partir de los que descargaron el checklist.
- Medir el **costo por demo** y por lead real, no solo clics.

## 4. Después de instalar
- Verificá que el Pixel dispara con la extensión **Meta Pixel Helper** (Chrome).
- En GA4, en "Tiempo real", entrá a tu propia web y confirmá que aparece la visita.
- Dejá correr 1–2 semanas antes de armar campañas de retargeting (necesitás que se junte audiencia).

> Orden recomendado del plan: primero Pixel + GA (gratis, 20 min), después recién empezás con los ads de retargeting (ver `02_Estrategia/PLAN_NEGOCIO_GTM_Gestian.md`, sección 6).
