# Informe — Optimización profesional de la landing de Gestian

Fecha: 7/6/2026 · Archivo afectado: `05_Web/landing/index.html` (+ assets nuevos)

Estudio y mejoras en cuatro dimensiones: conversión (CRO), SEO, diseño/accesibilidad y performance. Todo verificado en navegador real (Chromium) en desktop (1280px) y mobile (390px), sin romper nada de lo que ya funcionaba (Formspree, descarga del checklist, Cal.com, Meta Pixel, GA4, rutas a `/assets`).

---

## Resumen ejecutivo

La landing ya partía de una base sólida (estructura, marca, SEO básico, FAQ con schema). El trabajo se concentró en **subir la tasa de conversión** y **profesionalizar la prueba social**, además de un salto fuerte de **performance** (la imagen del hero pesaba 441 KB y bloqueaba la carga). El cambio de mayor impacto fue **reemplazar los testimonios falsos con placeholders `[Nombre]`** —que se veían poco serios— por una sección honesta de "por qué probarlo no tiene riesgo".

---

## 1. Conversión (CRO)

**Hallazgos**
- Los **testimonios eran placeholders** (`"[Nombre] · [Desarrolladora]"`). Publicarlos así resta credibilidad. Al ser pre-lanzamiento, no hay testimonios reales todavía.
- Faltaban **señales de confianza** above-the-fold y **reversión de riesgo** cerca de los CTA.
- El formulario no tenía microcopy que bajara la ansiedad ("¿me van a spamear?").
- En mobile, al hacer scroll el CTA principal desaparecía.

**Qué cambié y por qué**
- **Reemplacé la sección de testimonios** por **"Probarlo no tiene riesgo"**: 4 tarjetas honestas (Demo de 15 min · Migramos tu Excel con vos · Sin tarjeta, sin permanencia · Atención directa del equipo). Maneja objeciones reales sin inventar clientes ni métricas.
- **Trust strip bajo el hero**: "App web sin instalar · Demo sin tarjeta · Datos exportables · Hecho en Argentina". Credibilidad inmediata.
- **Badge de acceso anticipado** ("sumando las primeras obras"): escasez honesta de pre-lanzamiento, sin números inventados.
- **Microcopy en el formulario**: "🔒 Sin spam. Te llega al instante. Te podés dar de baja cuando quieras."
- **Reversión de riesgo en el CTA final**: "Sin tarjeta · sin compromiso · respondemos el mismo día".
- **Sticky CTA en mobile**: barra fija inferior "Demo de 15 min · gratis / Agendar demo →". El CTA siempre a un toque.
- Mantuve el **CTA único = demo** (coherente con la estrategia) y el lead magnet como segunda vía.

## 2. SEO técnico y on-page

**Hallazgos**
- Title correcto pero sin liderar con la keyword. Faltaba schema de **Organization**. El copy podía reflejar mejor términos reales de búsqueda.
- Competidores (Calipso, Dataobra, Nativo, Flexxus, Softland) dominan "ERP / software de gestión de obra" apoyados en "presupuesto y ejecución". Gestian se diferencia en **simple + dólar real + facturas con IA** (y, por estrategia de marca, evita el término "presupuesto").

**Qué cambié**
- **Title** ahora lidera con la keyword: *"Software de gestión de obra en dólares para desarrolladores y constructoras | Gestian"*.
- **Meta description** ampliada con "en Argentina", "sin planillas de Excel" y "demo gratis de 15 min".
- **Nuevo JSON-LD de Organization** (logo, áreaServida Argentina, slogan) sumado al de SoftwareApplication (al que le agregué `featureList`).
- **Keywords reflejadas naturalmente** en el copy del hero y los `alt`: "software de gestión de obra", "costo de obra en dólares", "sin Excel", "para desarrolladores y constructoras".
- **Un solo H1** (verificado en navegador), jerarquía H2/H3 correcta.
- `alt` de imágenes más descriptivos y con keywords.
- Ya estaban OK y se conservan: `canonical`, `lang="es"`, Open Graph + Twitter cards, `sitemap.xml`, `robots.txt`, favicon + apple-touch-icon.

## 3. Diseño y accesibilidad

**Qué cambié**
- **Animaciones de entrada sutiles** (reveal al hacer scroll) con `IntersectionObserver`, respetando `prefers-reduced-motion` y con *failsafe* (si algo falla, el contenido se muestra igual; sin JS, también).
- **Focus visible** en todos los elementos interactivos (`:focus-visible` dorado) — clave para accesibilidad y teclado.
- **Skip link** ("Saltar al contenido") para lectores de pantalla.
- **Form accesible**: `label` asociado, `aria-label`, `aria-live` en el mensaje de estado, `autocomplete="email"`.
- **Hover states** nuevos en las tarjetas (elevación + borde dorado).
- Consistencia con la identidad "plano nocturno" (violeta profundo + líneas doradas) mantenida en todos los componentes nuevos.

## 4. Performance

**Hallazgos**
- `dashboard.png` (441 KB) era la imagen LCP del hero **pero estaba con `loading="lazy"`** → retrasaba el render de lo más importante.
- Capturas en PNG sin comprimir.

**Qué cambié**
- **Convertí las capturas a WebP** (con fallback PNG vía `<picture>`):

  | Imagen | PNG | WebP | Ahorro |
  |---|---|---|---|
  | dashboard | 441 KB | 72 KB | −84% |
  | gastos | 124 KB | 26 KB | −79% |
  | unidades | 96 KB | 17 KB | −82% |
  | cobros | 152 KB | 32 KB | −79% |
  | checklist_cover | 197 KB | 50 KB | −75% |

- **Hero optimizado para LCP**: saqué el `lazy`, agregué `fetchpriority="high"`, `<link rel="preload">` del WebP y dimensiones explícitas (`width`/`height`) para evitar *layout shift* (CLS).
- Resto de imágenes con `loading="lazy"` + `decoding="async"`.
- Fuentes ya cargaban con `preconnect` + `display=swap` (se conserva).

---

## Verificación final (navegador real)
- ✅ Desktop y mobile renderizan sin errores JS.
- ✅ `fbq` y `gtag` activos; formulario, Cal.com y descarga del checklist intactos.
- ✅ Hero sirve `dashboard.webp`; un solo H1; sticky CTA solo en mobile.
- ✅ Reveals con failsafe; focus visible operativo.

## Lo que queda como recomendación (no aplicado)
1. **Testimonios reales**: apenas tengas las primeras obras, pedí 1–2 frases concretas y reemplazá/ sumá una sección de prueba social real (lo de mayor impacto pendiente).
2. **Logos de clientes / "usado en X obras"**: cuando haya datos reales (nunca inventarlos).
3. **Video corto** (15–30 s) del producto en acción en el hero o la demo.
4. **Página de precios** o rango orientativo, si la estrategia lo permite (hoy se define en demo).
5. **Completar IDs**: GA4 (`G-XXXXXXXXXX`) y Meta Pixel (`TU_PIXEL_ID_AQUI`) en el `<head>`, y `FORM_ENDPOINT`.
6. **Reemplazar** los links `REEMPLAZAR` de Instagram/LinkedIn cuando existan las cuentas.

> **Recordatorio:** estos cambios están en la carpeta local. Para que queden online hay que **volver a subir `05_Web/landing/` a Netlify** (drag & drop), idealmente una sola vez con todo (IDs + form + estas mejoras).
