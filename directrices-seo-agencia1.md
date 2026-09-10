# Directrices SEO — AGENCIA1 (Step to Santiago)

**Documento-prompt para implementación** (usable tal cual en Claude Code / OpenCode).
**Auditoría:** 27 agosto 2026 · Repositorio: `Pablotero05/AGENCIA1` (privado, rama `main`) · Deploy: `steptosantiago.vercel.app`

---

## 0. Estado actual auditado (verificado en el repositorio)

- Sitio **estático en HTML puro** (sin framework). Tres idiomas duplicados a mano: `/en`, `/es`, `/por`.
- `index.html` raíz de 179 bytes: redirección por idioma (stub).
- Páginas por idioma: `index.html` (~40 KB), `pages/rutas.html`, `pages/ruta.html`, `pages/servicios.html` (~46 KB), `pages/nosotros.html`, `pages/contacto.html`, `legal.html` (~59 KB), `politicas.html` (~48 KB), `terminos.html` (~24 KB).
- Datos de rutas centralizados en `en/data/rutas.json` (9,3 KB) — `ruta.html` actúa como plantilla alimentada por JS.
- `node_modules/` y `fontawesome/` **commiteados** en el repo; `package.json` (595 B) con script `remove-defer.js`.
- **No existe `robots.txt` ni `sitemap.xml`** en la raíz.
- **El deploy no responde a ningún rastreador externo** (verificado: fallan todas las peticiones a la raíz, `/en/`, `/es/` y páginas internas). Síntoma de *Vercel Deployment Protection* activa.

> No pude leer el contenido íntegro de los HTML desde la API (limitación del conector), así que las directrices de `<head>` van en formato "verificar + aplicar": incluyen el código exacto a implementar.

---

## 1. BLOQUEANTE — Indexabilidad (hacer hoy)

1. **Vercel → Project Settings → Deployment Protection → OFF** para producción (o "Only preview deployments"). Ahora mismo Google no puede ver nada.
2. **Dominio propio** antes de lanzar (`steptosantiago.com` o similar). Nunca posicionar el subdominio `.vercel.app`. Configurar en Vercel: redirect permanente de `*.vercel.app` → dominio canonical (o `X-Robots-Tag: noindex` en el subdominio).
3. Crear `/robots.txt` en la raíz:
```
User-agent: *
Allow: /
Disallow: /node_modules/
Disallow: /assets/private/
Sitemap: https://www.steptosantiago.com/sitemap.xml
```
4. Crear `/sitemap.xml` estático con **todas las URLs × 3 idiomas** y enlaces `xhtml:link` hreflang cruzados en cada entrada. Regenerarlo con un script de build cada vez que cambie `rutas.json`.
5. Verificación día 1: Google Search Console + Bing Webmaster Tools; enviar sitemap; "Inspección de URL" en 3 páginas clave para confirmar renderizado.

---

## 2. Arquitectura de URLs (corregir antes de indexar nada)

Problemas actuales: nombres de archivo en español dentro de `/en` y `/por` (`/en/pages/rutas.html`), código de idioma no estándar (`/por` → debe ser `/pt`), extensión `.html` visible, y rutas individuales servidas por plantilla JS (sin URL estática propia por camino).

### Estructura objetivo

```
/                            → redirect 301 a /en/ (o detector con hreflang x-default)
/en/  /es/  /pt/             → homes localizadas
/en/routes/                  → hub de caminos            | /es/rutas/  | /pt/rotas/
/en/routes/camino-frances/   → página por RUTA (estática)| /es/rutas/camino-frances/
/en/routes/camino-frances/from-sarria/  → EXPERIENCIA transaccional (precio+reserva)
/en/services/luggage-transfer/          → /es/servicios/transporte-mochilas/
/en/guides/ …                → hub informacional
/en/about/  /en/contact/     → /es/nosotros/  /es/contacto/
/en/legal/…                  → noindex follow (no compiten por nada)
```

### Reglas
- **URLs localizadas** (la keyword va en la URL: `/en/routes/` no `/en/pages/rutas.html`).
- Sin `.html`: estructura de carpetas con `index.html` dentro → URLs limpias (`/en/routes/`). En Vercel añadir `vercel.json` con `"cleanUrls": true` y `"trailingSlash": true` para canonicalizar.
- **Cada camino = página HTML estática propia.** La plantilla `ruta.html` + JSON por query param (`?id=`) es invisible/inconsistente para SEO: generar las páginas de ruta en build desde `rutas.json` (script Node que renderiza la plantilla N veces). Esto es el germen del SEO programático: hoy 6-8 rutas, mañana etapas y localidades.
- Mapa de **redirecciones 301** de todas las URLs antiguas a las nuevas (en `vercel.json`).
- Profundidad máxima 3 clics a cualquier experiencia; breadcrumbs visibles en rutas/experiencias.

---

## 3. `<head>` de cada página (verificar + aplicar)

Patrón obligatorio por página e idioma (ejemplo EN, página Camino Francés desde Sarria):

```html
<html lang="en">
<title>Camino Frances from Sarria: Last 100 km Organized | Step to Santiago</title>
<meta name="description" content="Walk the last 100 km of the Camino Frances from Sarria: 6 nights, luggage transfer, handpicked hotels and 24h assistance. Instant booking from €427.">
<link rel="canonical" href="https://www.steptosantiago.com/en/routes/camino-frances/from-sarria/">
<link rel="alternate" hreflang="en" href="https://www.steptosantiago.com/en/routes/camino-frances/from-sarria/">
<link rel="alternate" hreflang="es" href="https://www.steptosantiago.com/es/rutas/camino-frances/desde-sarria/">
<link rel="alternate" hreflang="pt" href="https://www.steptosantiago.com/pt/rotas/camino-frances/desde-sarria/">
<link rel="alternate" hreflang="x-default" href="https://www.steptosantiago.com/en/routes/camino-frances/from-sarria/">
<meta property="og:title" content="…"> <meta property="og:description" content="…">
<meta property="og:image" content="…/og-sarria.jpg"> <meta property="og:locale" content="en_US">
```

- Titles: `Keyword principal + modificador | Step to Santiago`, ≤ 60 caracteres, **único por página e idioma**.
- Descriptions: 140–155 caracteres, con propuesta de valor + CTA ("Instant booking", "Free cancellation").
- hreflang recíproco obligatorio entre las 3 versiones (si una página no existe en un idioma, no enlazarla).
- `noindex` en `legal.html`, `politicas.html`, `terminos.html` (son ~130 KB de texto que diluye y no posiciona).

---

## 4. Datos estructurados (JSON-LD) — pack a implementar

1. **Global (todas las páginas):** `TravelAgency` con `name`, `url`, `logo`, `address` (Galicia), `geo`, `sameAs` (Instagram, YouTube, Google Business Profile, TripAdvisor cuando existan).
2. **Experiencias:** `Product` + `Offer` (`price`, `priceCurrency: EUR`, `availability`) + `FAQPage` (las 8–12 FAQs visibles de la página) + `BreadcrumbList`.
3. **Guías/blog:** `Article` con autor, `datePublished`, `dateModified`.
4. Validar todo con la prueba de resultados enriquecidos de Google antes de lanzar.

---

## 5. Keywords objetivo y dónde atacarlas

Base extraída de la auditoría de Tubuencamino y Pilgrim (sus páginas con más tráfico y estructura). **El pull del Keyword Planner de Google Ads quedó bloqueado por cuota de API (resetea ~21:45 CEST hoy); en cuanto se pueda, lo ejecuto con esta configuración y fusiono los volúmenes/CPC reales aquí:**

- Semillas URL: `tubuencamino.com`, `pilgrim.es`
- Semillas keyword EN: *camino de santiago tours, self guided camino, camino frances last 100km, sarria to santiago, camino portugues coastal, camino luggage transfer, camino by bike, camino with dog, camino cost, best time camino*
- Semillas ES: *camino de santiago organizado, camino frances desde sarria, camino portugues desde tui, camino ingles desde ferrol, transporte de mochilas camino, camino con perro, camino en bici, cuánto cuesta el camino*
- Geo: US, GB, IE, DE, ES · Idioma: EN + ES

### Mapa de trabajo mientras tanto

| Prioridad | Keyword EN | URL | Tipo |
|---|---|---|---|
| P0 | camino frances last 100km / sarria to santiago | /en/routes/camino-frances/from-sarria/ | Experiencia |
| P0 | camino luggage transfer | /en/services/luggage-transfer/ | Servicio |
| P0 | camino portugues coastal route | /en/routes/camino-portugues/coastal/ | Experiencia |
| P1 | camino ingles from ferrol | /en/routes/camino-ingles/from-ferrol/ | Experiencia |
| P1 | camino de santiago by bike | /en/camino-by-bike/ | Vertical |
| P1 | camino with a dog | /en/camino-with-dog/ | Vertical (casi sin competencia EN) |
| P1 | how much does the camino cost | /en/guides/camino-cost/ | Guía + calculadora |
| P2 | best time to walk the camino | /en/guides/best-time/ | Guía |
| P2 | compostela certificate requirements | /en/guides/compostela/ | Guía |

Espejo ES/PT en sus carpetas con URLs localizadas. Una keyword = una URL (nada de canibalización entre idiomas si hreflang está bien).

---

## 6. Plantilla de página de experiencia (por ruta)

1. H1 con keyword exacta + datos (km · noches · etapas · dificultad) y **precio "desde €X"** visible sin scroll.
2. CTA de reserva inmediata (diferenciador frente a Pilgrim, que solo pide presupuesto).
3. Incluido / opcional en dos columnas.
4. Itinerario día a día (km, horas, puntos de interés) — ampliable a enlaces a páginas de etapa.
5. Galería AVIF + mapa.
6. FAQ 8–12 preguntas (schema FAQPage).
7. Reseñas cuando existan (`AggregateRating`).
8. Enlaces cruzados a rutas relacionadas + guía descargable (lead magnet).

---

## 7. Rendimiento e higiene de build

- Sacar `node_modules/` y `fontawesome/` completo del repo y del deploy: usar solo los iconos necesarios (subset SVG) o FA por CDN con `font-display: swap`. Añadir `.gitignore`.
- Imágenes: convertir a AVIF/WebP, `width/height` fijos (CLS), `loading="lazy"` salvo el hero (que lleva `fetchpriority="high"`).
- CSS: inline del crítico en el `<head>` y `defer` al resto (ojo: `remove-defer.js` sugiere peleas con esto — resolver en build, no en runtime).
- JS propio: un solo bundle minificado con `defer`; animaciones tras `requestIdleCallback` y respetando `prefers-reduced-motion`.
- Objetivos CWV móvil: LCP < 2,0 s · INP < 200 ms · CLS < 0,05.
- `vercel.json`: `cleanUrls`, redirects 301, headers `cache-control` largos para assets con hash.

---

## 8. Hoja de ruta de implementación

| Orden | Tarea | Esfuerzo |
|---|---|---|
| 1 | Quitar Deployment Protection + dominio propio + robots + sitemap | Horas |
| 2 | URLs limpias localizadas + redirects 301 + noindex legales | 1 día |
| 3 | Heads completos (titles/metas/canonical/hreflang/OG) en las ~20 páginas × 3 idiomas | 1–2 días |
| 4 | Script de build: rutas estáticas desde `rutas.json` (adiós plantilla por query param) | 1–2 días |
| 5 | JSON-LD pack + validación | 1 día |
| 6 | Dieta de assets (fontawesome, imágenes AVIF, CSS crítico) | 1 día |
| 7 | Search Console + GA4 + envío de sitemap | Horas |
| 8 | Contenido: 8 experiencias P0/P1 completas + 4 guías iniciales | 2–4 semanas |
| 9 | Keyword Planner (cuando resetee cuota) → ajustar titles y prioridades | Recurrente |
| 10 | Escalar: etapas/localidades programáticas → migrar a Next.js cuando el estático se quede corto | Mes 2–3 |

---

## 9. Checklist pre-lanzamiento

- [ ] Fetch externo de 5 URLs devuelve HTML completo (sin JS obligatorio)
- [ ] Sitemap enviado y 0 errores de cobertura en SC
- [ ] hreflang validado (sin enlaces rotos entre idiomas)
- [ ] Titles/descriptions únicos en todas las páginas × idiomas
- [ ] Rich Results Test OK en experiencia + guía
- [ ] Lighthouse móvil ≥ 90 en Performance/SEO en home y 1 experiencia
- [ ] Redirects 301 verificados uno a uno
