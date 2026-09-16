# Plan maestro de implementación SEO y SEM — StepToSantiago

**Proyecto:** AGENCIA1 / StepToSantiago  
**Mercado inicial:** España, en español  
**Objetivo:** Construir la autoridad, experiencia de usuario y sistema de adquisición necesarios para competir de forma sostenible por la demanda comercial del Camino de Santiago, con foco inicial en Camino Portugués desde Tui, Camino Francés desde Sarria, Camino Inglés desde Ferrol, Camino Primitivo desde Lugo y variantes del Camino Portugués por la costa.

> Este documento es una especificación de ejecución para un agente. No deben publicarse páginas, campañas ni afirmaciones comerciales sin comprobar previamente que el producto, el precio, la disponibilidad y las condiciones son reales.

---

## 1. Principios de ejecución

### 1.1 Objetivo operativo

No buscar volumen por volumen ni crear páginas masivas de baja calidad. El objetivo es construir un sistema que:

1. Capte tráfico informacional y transaccional con intención relevante.
2. Convierta el tráfico en solicitud de presupuesto, conversación cualificada o reserva.
3. Mida el valor económico de cada fuente, campaña, ruta y palabra clave.
4. Aumente la confianza con información local, itinerarios claros, transparencia de precios y evidencia real.
5. Escale únicamente las URLs, contenidos y campañas que aporten margen o autoridad demostrable.

### 1.2 Principios no negociables

- Una URL debe responder a una intención principal. Evitar múltiples URLs casi iguales para la misma keyword.
- No usar contenido copiado, texto generado sin revisión humana, reseñas inventadas, fotografías sin licencia, precios falsos ni marcado estructurado que no corresponda a contenido visible y verificable.
- No comprar enlaces, reseñas, tráfico ni paquetes de “SEO garantizado”.
- No indexar filtros, parámetros, páginas de búsqueda internas ni variaciones sin valor único.
- Ninguna campaña de Ads debe escalar si no existe medición de conversiones y control de calidad del lead.
- Cada afirmación sobre dificultad, kilómetros, servicios, alojamientos, precios, disponibilidad, transporte, credenciales o reglas debe tener una fuente o validación operativa interna.

### 1.3 Propuesta de valor a convertir en realidad

Definir y validar una promesa diferenciadora para la web. El mensaje debe ser específico, demostrable y consistente en web, anuncios, WhatsApp y equipo comercial.

Plantilla:

> “Organizamos tu Camino de Santiago en Galicia con itinerario claro, alojamientos seleccionados, logística resuelta y atención humana antes y durante la ruta.”

Elegir solo los atributos que se puedan demostrar:

- Especialistas locales en rutas gallegas.
- Itinerarios flexibles de 5, 6 o 7 etapas.
- Traslado de equipaje.
- Alojamientos seleccionados.
- Atención por WhatsApp.
- Respuesta en menos de X minutos/horas.
- Grupos pequeños.
- Salidas garantizadas.
- Cancelación flexible.
- Asistencia durante el viaje.

---

## 2. Contexto técnico del repositorio

El repositorio contiene una estructura estática y multilingüe con rutas principales en español, inglés y portugués, además de `robots.txt`, `sitemap.xml`, `vercel.json`, verificación de Google y un conjunto inicial de páginas de rutas.

### 2.1 Inventario detectado

```text
/
├── index.html
├── robots.txt
├── sitemap.xml
├── vercel.json
├── directrices-seo-agencia1.md
├── es/
│   ├── index.html
│   ├── contacto/
│   ├── nosotros/
│   ├── servicios/
│   ├── rutas/
│   │   ├── frances/
│   │   ├── ingles-ferrol/
│   │   ├── portugues-costa-guarda/
│   │   ├── portugues-costa-oporto/
│   │   ├── portugues-tui/
│   │   └── primitivo-lugo/
│   ├── components/
│   ├── data/
│   └── pages/
├── en/
├── pt/
└── por/
```

### 2.2 Decisiones de arquitectura pendientes

El agente debe revisar y documentar antes de añadir contenido:

- Dominio canónico final y redirecciones HTTP → HTTPS / `www` ↔ no `www`.
- Si `pt` y `por` son dos versiones lingüísticas realmente distintas. Si no lo son, consolidar para evitar duplicación lingüística.
- Si las páginas están servidas como estáticas puras o se construyen desde datos. Preferir fuente de datos centralizada.
- Si existe motor de reservas, formulario, WhatsApp o CRM. Si no, crear un embudo mínimo medible.
- Qué productos son actualmente vendibles y con qué precios, fechas, rutas, servicios y capacidad.

### 2.3 Estructura de datos recomendada

Crear una fuente de datos por ruta, por ejemplo `es/data/routes.js` o `es/data/routes.json`. Debe alimentar contenidos repetibles sin crear inconsistencias.

```js
export const routes = {
  'portugues-tui': {
    slug: 'portugues-tui',
    locale: 'es',
    name: 'Camino Portugués desde Tui',
    seo: {
      title: 'Camino Portugués desde Tui: itinerarios y reserva | StepToSantiago',
      description: 'Organiza el Camino Portugués desde Tui con itinerarios, etapas, alojamientos y opciones de reserva. Consulta fechas, servicios y presupuesto.',
      canonical: 'https://DOMINIO/es/rutas/portugues-tui/'
    },
    product: {
      durationOptions: [5, 6, 7],
      distanceKm: null,
      priceFrom: null,
      currency: 'EUR',
      availability: null,
      inclusions: [],
      exclusions: []
    },
    facts: {
      difficulty: null,
      bestSeason: [],
      start: 'Tui',
      end: 'Santiago de Compostela'
    },
    itinerary: [],
    faqs: [],
    relatedRoutes: ['portugues-costa-guarda', 'ingles-ferrol']
  }
}
```

No publicar `null`, campos vacíos ni precios no validados. Los datos deben tener dueño, fecha de validación y fuente interna.

---

## 3. Prioridad de mercado y keywords

### 3.1 Clusters prioritarios

| Nivel | Cluster | Intención | URL objetivo |
|---|---|---|---|
| P0 | Camino Portugués desde Tui | Comercial + planificación | `/es/rutas/portugues-tui/` |
| P0 | Camino de Santiago desde Tui | Comercial + navegación | Canonical o landing única coordinada con la anterior |
| P0 | Camino de Santiago desde Sarria | Comercial de alto volumen | `/es/rutas/frances/sarria/` o URL equivalente |
| P0 | Viaje/Camino de Santiago organizado | Comercial genérica | `/es/viajes-organizados-camino-santiago/` |
| P0 | Camino Inglés desde Ferrol | Comercial + planificación | `/es/rutas/ingles-ferrol/` |
| P1 | Camino Primitivo desde Lugo | Comercial + aventura | `/es/rutas/primitivo-lugo/` |
| P1 | Camino Portugués por la costa desde A Guarda | Comercial + diferenciación local | `/es/rutas/portugues-costa-guarda/` |
| P1 | Etapas, mapa y duración desde Tui | Informacional asistido | `/es/guias/camino-portugues-desde-tui/` |
| P1 | Qué Camino de Santiago hacer | Descubrimiento y captación | `/es/planificador-camino-santiago/` |
| P2 | Camino de Santiago en grupo | Comercial | `/es/camino-santiago-en-grupo/` |
| P2 | Camino de Santiago con perro | Nicho comercial | Solo si existe producto real |

### 3.2 Hallazgos de demanda de Google Ads

Datos de Keyword Planner utilizados como orientación inicial para España:

| Término | Media búsquedas/mes | Competencia | Rango CPC parte superior |
|---|---:|---|---:|
| Camino de Santiago desde Sarria | 9.900 | Media | 0,41–1,54 € |
| Camino Portugués desde Tui | 2.400 | Media | 0,26–1,09 € |
| Camino de Santiago desde Tui | 1.900 | Media | 0,33–1,33 € |
| Viaje Camino de Santiago | 1.600 | Media | 1,01–3,09 € |
| Camino de Santiago organizado | 720 | Alta | 0,93–2,86 € |
| Camino de Santiago en grupo | 260 | Alta | 0,53–1,74 € |
| Etapas Camino Portugués desde Tui | 320 | Baja | 0,07–0,62 € |
| De Tui a Santiago en 5 etapas | 260 | Media | 0,21–0,76 € |
| De Tui a Santiago en 6 etapas | 320 | Media | 0,22–0,83 € |

### 3.3 Estacionalidad

- Preparar, publicar y actualizar activos de mayor valor entre noviembre y febrero.
- Acelerar la inversión publicitaria y la revisión de disponibilidad desde marzo.
- Aplicar control reforzado de presupuesto, stock y calidad de lead entre abril y agosto.
- Revisar rendimiento de Sarria especialmente en verano: el pico de demanda observado se produce en agosto.

---

## 4. Fase 0 — Auditoría y baseline

**Duración:** días 1 a 3  
**Resultado:** inventario verificable y backlog priorizado.

### 4.1 Rastrear la web

Usar Screaming Frog, Sitebulb o un crawler equivalente. Exportar el resultado a una hoja de cálculo versionada.

Revisar por URL:

- Código HTTP.
- URL indexable.
- Canonical declarado.
- Título y longitud.
- Meta description y longitud.
- H1 y estructura H2/H3.
- `robots` meta tag.
- Tamaño HTML y peso de página.
- Número de enlaces internos entrantes y salientes.
- Imagen sin `alt`, peso excesivo, falta de dimensiones o lazy loading incorrecto.
- Breadcrumbs.
- Schema JSON-LD válido.
- Hreflang y retorno bidireccional.
- Fecha de actualización si se muestra.

### 4.2 Crear baseline de analítica

Documentar antes de cambiar nada:

- Páginas indexadas y excluidas de Google Search Console.
- Clics, impresiones, CTR y posición media por consulta y página en últimos 3, 6 y 12 meses.
- Sesiones orgánicas, de pago, directas, referral y social.
- Conversiones, leads, reservas, ingresos y margen por canal.
- Core Web Vitals móvil y escritorio.
- Principales páginas de entrada y abandono.
- Tasa de respuesta de formulario/WhatsApp.
- Reseñas, menciones y enlaces existentes.

### 4.3 Entregable

Crear `docs/seo/baseline-auditoria-YYYY-MM-DD.md` con:

```md
# Baseline SEO

## Estado de indexación
## URLs con errores críticos
## URLs duplicadas o canibalización
## Métricas de adquisición
## Métricas de conversión
## Rendimiento web
## Riesgos legales/comerciales
## Backlog priorizado P0/P1/P2
```

---

## 5. Fase 1 — SEO técnico

**Duración:** semanas 1 y 2  
**Resultado:** web rastreable, canónica, rápida, medible y sin duplicación evitable.

### 5.1 Indexación y canónicos

- Forzar HTTPS mediante configuración de Vercel o CDN.
- Definir host único canónico.
- Añadir redirecciones 301 de variantes no canónicas.
- Usar URL final con slash o sin slash de manera consistente.
- Incluir `<link rel="canonical">` autorreferente en cada página indexable.
- Añadir `noindex,follow` a thank-you pages, resultados internos, previews, staging y filtros sin valor SEO.
- Eliminar del sitemap cualquier URL no canónica, redireccionada, bloqueada o noindex.
- Mantener en el sitemap únicamente URLs 200, canónicas, indexables y de valor.

### 5.2 Robots y sitemap

Revisar `robots.txt` para permitir recursos necesarios de CSS, JavaScript e imágenes, bloquear rutas administrativas/previews y enlazar el sitemap absoluto.

Plantilla orientativa:

```txt
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /gracias/
Disallow: /preview/

Sitemap: https://DOMINIO/sitemap.xml
```

No bloquear por `robots.txt` una URL que se pretende eliminar del índice; usar `noindex` mientras Google pueda rastrearla o aplicar redirección/404/410 según corresponda.

### 5.3 Internacionalización

Por cada pieza traducida de verdad, incluir:

```html
<link rel="alternate" hreflang="es" href="https://DOMINIO/es/rutas/portugues-tui/">
<link rel="alternate" hreflang="en" href="https://DOMINIO/en/routes/portuguese-way-from-tui/">
<link rel="alternate" hreflang="pt-PT" href="https://DOMINIO/pt/rotas/caminho-portugues-tui/">
<link rel="alternate" hreflang="x-default" href="https://DOMINIO/es/rutas/portugues-tui/">
```

Reglas:

- Solo marcar traducciones equivalentes y existentes.
- Usar idioma-región únicamente si el contenido se dirige realmente a esa región.
- No duplicar la misma versión portuguesa en `/pt/` y `/por/`.
- Cada URL debe enlazarse a sí misma en hreflang y recibir enlace de retorno desde las alternativas.

### 5.4 Rendimiento y Core Web Vitals

Objetivos de campo móvil:

| Métrica | Objetivo |
|---|---:|
| LCP | < 2,5 s |
| INP | < 200 ms |
| CLS | < 0,1 |
| TTFB | < 800 ms como referencia |

Checklist:

- Convertir imágenes a AVIF/WebP.
- Usar `srcset`, `sizes`, `width` y `height` en todas las imágenes.
- No lazy-load en la imagen LCP/hero.
- Precargar la imagen LCP si es estable y crítica.
- Minimizar scripts de terceros, chat widgets, píxeles y fuentes externas.
- Usar `font-display: swap`.
- Evitar sliders pesados en el hero.
- Reservar espacio para imágenes, mapas, formularios e iframes para evitar CLS.
- Cargar mapas e iframes bajo interacción si no son críticos.
- Medir en PageSpeed Insights y Search Console antes y después de cada release importante.

### 5.5 Metadatos base

Cada URL indexable debe contener:

```html
<html lang="es">
<head>
  <title>Camino Portugués desde Tui: itinerarios y reserva | StepToSantiago</title>
  <meta name="description" content="Organiza el Camino Portugués desde Tui con etapas, alojamientos, traslado de equipaje y opciones de reserva. Consulta itinerario, fechas y presupuesto.">
  <link rel="canonical" href="https://DOMINIO/es/rutas/portugues-tui/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Camino Portugués desde Tui | StepToSantiago">
  <meta property="og:description" content="Consulta etapas, itinerario, servicios y opciones para organizar tu Camino desde Tui.">
  <meta property="og:url" content="https://DOMINIO/es/rutas/portugues-tui/">
  <meta property="og:image" content="https://DOMINIO/assets/og/camino-portugues-tui.jpg">
</head>
```

No reutilizar títulos y descripciones entre rutas. No meter una lista de keywords en los metadatos.

---

## 6. Fase 2 — Arquitectura SEO y páginas de dinero

**Duración:** semanas 2 a 6  
**Resultado:** landings completas de alta intención y clusters de apoyo sin canibalización.

### 6.1 Arquitectura recomendada

```text
/es/
├── viajes-organizados-camino-santiago/
├── planificador-camino-santiago/
├── rutas/
│   ├── portugues-tui/
│   ├── portugues-costa-guarda/
│   ├── portugues-costa-oporto/
│   ├── frances/
│   │   └── sarria/
│   ├── ingles-ferrol/
│   └── primitivo-lugo/
├── guias/
│   ├── camino-portugues-desde-tui/
│   │   ├── etapas/
│   │   ├── mapa/
│   │   ├── como-llegar-a-tui/
│   │   ├── en-5-etapas/
│   │   ├── en-6-etapas/
│   │   ├── precio/
│   │   └── que-llevar/
│   ├── camino-frances-desde-sarria/
│   ├── camino-ingles-desde-ferrol/
│   └── elegir-camino-santiago/
├── servicios/
│   ├── traslado-equipaje/
│   ├── alojamientos/
│   ├── asistencia-en-ruta/
│   └── traslados/
├── nosotros/
├── opiniones/
├── contacto/
└── preguntas-frecuentes/
```

No crear todas las URLs de una vez. Prioridad de publicación:

1. Landing de Tui.
2. Landing de Sarria.
3. Landing de Ferrol.
4. Hub/guía Tui.
5. Landing de Lugo.
6. Landing A Guarda.
7. Planificador.
8. Resto de guías según demanda, producto y capacidad editorial.

### 6.2 Plantilla de landing comercial

Cada ruta vendible debe incluir, con contenido único:

1. **Hero:** nombre de ruta, duración, nivel, kilometraje, temporada, precio desde solo si es real y CTA.
2. **CTA principal:** “Ver itinerario y precio”, “Solicitar presupuesto” o “Comprobar disponibilidad”.
3. **Prueba de confianza:** condiciones reales, atención, opinión verificada, sello/licencia si existe.
4. **Resumen de producto:** para quién es, qué experiencia ofrece y qué diferencia a esta ruta.
5. **Itinerario por etapas:** origen, destino, km, desnivel si se conoce, tiempo aproximado, dificultad y alojamiento.
6. **Mapa:** útil, legible, accesible y ligero.
7. **Qué incluye / no incluye:** sin ambigüedad.
8. **Precios y temporadas:** desglose real, suplementos, opciones y condiciones.
9. **Cómo llegar y regresar:** transporte, traslados, puntos de encuentro y consejos validados.
10. **Alojamientos:** tipo, estándar y ejemplos solo si son confirmables.
11. **Preparación:** equipo, condición física, climatología y advertencias honestas.
12. **Opiniones:** reales, identificables y con consentimiento.
13. **FAQ:** específica de la ruta.
14. **Rutas relacionadas:** enlazado contextual.
15. **CTA final:** formulario corto y WhatsApp/teléfono si existe atención real.

### 6.3 Formulario de presupuesto

Campos recomendados:

- Ruta de interés.
- Fecha aproximada.
- Número de viajeros.
- Duración preferida.
- Tipo de habitación.
- Teléfono/WhatsApp.
- Email.
- Comentarios.
- Consentimiento de privacidad.
- UTM source/medium/campaign/content/term ocultos.
- GCLID, GBRAID, WBRAID ocultos cuando proceda.

Eventos mínimos:

```text
view_route
view_pricing
start_quote
form_submit
whatsapp_click
phone_click
booking_start
booking_complete
```

### 6.4 Prevención de canibalización

- Una única landing comercial principal para “Camino Portugués desde Tui”.
- Si se crean páginas de 5, 6 o 7 etapas, cada una debe tener itinerario distinto, producto diferente, tablas, contenido y disponibilidad reales.
- La guía de etapas debe servir intención informacional, no repetir toda la oferta comercial.
- Consolidar con 301 las URLs históricas o variantes que compitan por la misma intención.
- Revisar mensualmente consultas/páginas en Search Console para detectar dos URLs que rankean por la misma consulta importante.

---

## 7. Fase 3 — Contenido temático y autoridad

**Duración:** semanas 4 a 16, continuo  
**Resultado:** clusters que aumentan autoridad y convierten tráfico asistido.

### 7.1 Cluster Camino Portugués desde Tui

Página pilar: `/es/rutas/portugues-tui/`

Contenidos satélite prioritarios:

| Pieza | Intención | CTA principal |
|---|---|---|
| Etapas del Camino Portugués desde Tui | Planificación | Ver itinerario organizado |
| Camino Portugués desde Tui en 5 etapas | Duración comercial | Solicitar presupuesto 5 etapas |
| Camino Portugués desde Tui en 6 etapas | Duración comercial | Solicitar presupuesto 6 etapas |
| Mapa del Camino Portugués desde Tui | Visual/informacional | Ver ruta e itinerario |
| Cuántos km hay de Tui a Santiago | Duda puntual | Comparar 5/6/7 etapas |
| Cómo llegar a Tui | Logística | Añadir traslado o consultar ruta |
| Qué llevar al Camino Portugués | Preparación | Descargar checklist / ver rutas |
| Mejor época para hacer el Camino desde Tui | Planificación temporal | Consultar fechas disponibles |
| Camino Portugués por la costa desde A Guarda | Comparativa | Comparar con Tui |
| Tui o Sarria: qué Camino elegir | Descubrimiento comercial | Usar planificador |

### 7.2 Criterio editorial

Cada artículo debe:

- Tener intención, audiencia, keyword primaria y CTA definidos antes de redactar.
- Estar firmado por autor/experto real.
- Mostrar fecha de publicación y fecha de actualización si existe mantenimiento.
- Añadir experiencia de primera mano cuando sea auténtica.
- Enlazar a la landing comercial pertinente de manera contextual.
- Resolver por completo la consulta, no ser un texto de relleno para insertar keywords.
- Incluir imágenes, tablas, mapas, listas y preguntas cuando mejoren comprensión.
- Tener revisión humana de exactitud, tono, legibilidad y situación comercial.

### 7.3 Calendario de publicación inicial

| Semana | Publicación | Objetivo |
|---|---|---|
| 4 | Pilar comercial Tui completo | Conversión |
| 5 | Etapas desde Tui | Captación informacional |
| 6 | Tui en 5 etapas | Conversión long-tail |
| 7 | Tui en 6 etapas | Conversión long-tail |
| 8 | Mapa y logística de Tui | Utilidad + enlaces internos |
| 9 | Pilar comercial Sarria completo | Mercado de escala |
| 10 | Guía Sarria: etapas, preparación y logística | Autoridad |
| 11 | Pilar Camino Inglés desde Ferrol | Diferenciación Galicia |
| 12 | Planificador “Qué Camino hacer” | Captación de lead |

---

## 8. Datos estructurados

### 8.1 Reglas

- Validar mediante Rich Results Test y Schema Markup Validator.
- El JSON-LD debe representar información visible en la página.
- No marcar una reseña agregada si no existe una colección de reseñas propias, reales y visible.
- No usar schema para contenido oculto.
- No añadir precio o disponibilidad ficticios.

### 8.2 BreadcrumbList

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://DOMINIO/es/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Rutas",
      "item": "https://DOMINIO/es/rutas/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Camino Portugués desde Tui",
      "item": "https://DOMINIO/es/rutas/portugues-tui/"
    }
  ]
}
</script>
```

### 8.3 Organization / TravelAgency

Usar solo datos empresariales correctos:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "StepToSantiago",
  "url": "https://DOMINIO/",
  "logo": "https://DOMINIO/assets/logo.png",
  "email": "EMAIL_REAL",
  "telephone": "TELEFONO_REAL",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "LOCALIDAD_REAL",
    "addressCountry": "ES"
  }
}
</script>
```

### 8.4 Product / Offer / TouristTrip

Implementar únicamente cuando existan precios, disponibilidad y producto real. Encapsularlo en función de datos validados y no mostrar schema cuando falten valores.

---

## 9. SEO de confianza y reputación

### 9.1 Páginas obligatorias

- Quiénes somos: equipo, ubicación, experiencia y cómo trabajáis.
- Contacto: email, teléfono, WhatsApp, horario y dirección si aplica.
- Política de privacidad, cookies y aviso legal actualizados.
- Condiciones de reserva, pagos, cancelación y seguros cuando proceda.
- Qué incluye/no incluye.
- Política editorial para guías.
- Página de opiniones reales.

### 9.2 Evidencia propia

Priorizar la producción de activos originales:

- Fotos propias de tramos, alojamientos y equipo con licencia/control de derechos.
- Vídeos verticales y horizontales de etapas y consejos.
- Entrevistas o testimonios de viajeros con consentimiento.
- Actualizaciones de logística con fecha, fuente y autor.
- Mapas propios y explicaciones de dificultad honestas.

### 9.3 Link building ético

Plan de relaciones públicas digitales:

1. Crear un activo útil: calculadora de presupuesto, planificador, mapa de llegada o guía de transporte.
2. Elaborar lista de medios gallegos, blogs relevantes, alojamientos, asociaciones, proveedores de transporte y creadores especializados.
3. Ofrecer datos originales, recurso útil o colaboración relevante, no intercambio de enlaces artificial.
4. Registrar contacto, URL obtenida, tipo de enlace, relevancia, tráfico de referencia y fecha.
5. Evaluar calidad por relevancia, legitimidad editorial y tráfico; no por métricas aisladas de terceros.

Objetivo inicial: 3–5 menciones/editoriales relevantes al mes, no decenas de enlaces de baja calidad.

---

## 10. Configuración analítica y atribución

### 10.1 Stack mínimo

- Google Tag Manager.
- Google Analytics 4.
- Google Search Console.
- Google Ads.
- CRM o hoja/base de datos de leads.
- Microsoft Clarity u otra herramienta de comportamiento compatible con privacidad.
- Panel de Looker Studio o dashboard propio.

### 10.2 Taxonomía de eventos GA4

| Evento | Disparador | Parámetros mínimos |
|---|---|---|
| `view_route` | Visita de landing de ruta | `route_slug`, `route_name`, `locale` |
| `view_pricing` | Precio visible/abierto | `route_slug`, `price_from` si es real |
| `start_quote` | Primer campo del formulario | `route_slug`, `form_id` |
| `form_submit` | Envío correcto | `route_slug`, `travelers`, `duration`, `lead_id` |
| `whatsapp_click` | Clic de WhatsApp | `route_slug`, `placement` |
| `phone_click` | Clic tel: | `route_slug`, `placement` |
| `booking_start` | Inicio de reserva | `route_slug`, `value` si aplica |
| `booking_complete` | Reserva confirmada | `route_slug`, `transaction_id`, `value`, `currency` |

### 10.3 CRM y calidad de lead

Todos los leads deben incluir:

```text
lead_id
created_at
route
travel_date
travelers
duration
utm_source
utm_medium
utm_campaign
utm_content
utm_term
gclid / gbraid / wbraid
lead_status
qualified_at
booking_status
booking_value
margin
```

Estados recomendados:

```text
new
contacted
qualified
proposal_sent
won
lost
spam
```

### 10.4 Conversión offline

Cuando un presupuesto acabe en reserva, importar la conversión offline asociada a GCLID/GBRAID/WBRAID y valor real. Sin esta capa, Google Ads tenderá a optimizar clics o formularios de baja calidad en lugar de margen real.

---

## 11. Plan SEM

### 11.1 Situación inicial

Existe una campaña Performance Max pausada. No reactivarla como primera acción. Antes debe existir medición fiable de lead cualificado/reserva, landings de alta calidad, activos, exclusiones y al menos varias semanas de datos de Search.

### 11.2 Orden de lanzamiento

1. Medición y eventos.
2. Search de marca.
3. Search Camino Portugués desde Tui.
4. Search Camino desde Sarria.
5. Search rutas Galicia: Ferrol, Lugo, A Guarda.
6. Search genérica “viajes organizados”.
7. Remarketing, sujeto a consentimiento y masa crítica.
8. Performance Max, solo tras validación de conversiones y creatividades.

### 11.3 Campañas

| Campaña | Objetivo | Landing | Presupuesto relativo |
|---|---|---|---:|
| Search — Marca | Defender demanda de marca | Inicio/marca | 5% |
| Search — Tui | Captar alto ajuste producto-intención | Tui | 30% |
| Search — Sarria | Captar volumen comercial | Sarria | 25% |
| Search — Rutas Galicia | Ferrol, Lugo, A Guarda | Landing exacta | 20% |
| Search — Genérica organizada | Descubrir demanda transaccional | Comparador de rutas | 15% |
| Remarketing | Recuperar usuarios de alto interés | URL vista o comparador | 5% |

El presupuesto es una distribución inicial, no una regla fija. Reasignar cada 7–14 días según lead cualificado, CAC y margen.

### 11.4 Grupos de anuncios

**Campaña Tui:**

```text
AG1 — Camino Portugués desde Tui
[camino portugues desde tui]
"camino portugues desde tui"
[camino portugués desde tui]

AG2 — Camino de Santiago desde Tui
[camino de santiago desde tui]
"camino de santiago desde tui"
"camino santiago desde tui"

AG3 — Tui 5 etapas
"de tui a santiago en 5 etapas"
"camino portugues desde tui 5 etapas"

AG4 — Tui 6 etapas
"de tui a santiago en 6 etapas"
"camino portugues desde tui 6 etapas"

AG5 — Tui informacional asistido
"etapas camino portugues desde tui"
"mapa camino portugues desde tui"
"como llegar a tui camino de santiago"
```

**Campaña Sarria:**

```text
AG1 — Camino desde Sarria
[camino de santiago desde sarria]
"camino de santiago desde sarria"

AG2 — Sarria organizado
"camino de santiago desde sarria organizado"
"viaje camino de santiago desde sarria"

AG3 — Sarria por duración
"camino de santiago desde sarria 5 dias"
"camino de santiago desde sarria 6 dias"
```

Usar concordancia exacta y de frase al inicio. Probar amplia solo cuando haya conversiones de calidad, negativas robustas y seguimiento de términos de búsqueda.

### 11.5 Negativas compartidas iniciales

Revisar y adaptar a producto real:

```text
empleo
trabajo
oferta empleo
sueldo
curso
formación
pdf
libro
película
juego
webcam
fondos de pantalla
gratuito
gratis
```

No excluir automáticamente términos como `etapas`, `mapa`, `por libre`, `perro` o `albergues`; decidir según rentabilidad y estrategia de embudo.

### 11.6 Responsive Search Ads

Crear al menos dos RSA diferentes por grupo de anuncios. No fijar titulares salvo necesidad de cumplimiento o mensaje crítico.

Ejemplo Tui:

```text
Titulares:
Camino Portugués Desde Tui
Tui a Santiago en 5 o 6 Etapas
Consulta Itinerario y Precio
Alojamientos y Traslado de Equipaje
Organiza Tu Camino con Ayuda Local
Solicita Tu Presupuesto Personalizado

Descripciones:
Organiza el Camino Portugués desde Tui con itinerario, alojamientos y servicios adaptados a tu viaje.
Consulta opciones de 5 o 6 etapas, qué incluye el viaje y disponibilidad para tus fechas.
```

Todo titular y descripción debe ser cierto y aparecer respaldado en la landing.

### 11.7 Activos de anuncio

Configurar cuando sean válidos:

- Sitelinks: Itinerario, Precios, Qué incluye, Preguntas frecuentes, Contacto.
- Callouts: Atención personalizada, Itinerarios a medida, Ayuda con la logística, Pago seguro; solo si son verdaderos.
- Snippets estructurados: Servicios, Rutas, Duraciones.
- Imagen.
- Llamada.
- Formulario de clientes potenciales únicamente si se puede responder y sincronizar con CRM.

### 11.8 Puja

Fase de aprendizaje:

- Si no hay conversiones fiables: Maximizar clics con límite CPC razonable o CPC manual/eCPC según disponibilidad.
- Si hay eventos de lead correctamente medidos: Maximizar conversiones, pero separar lead simple de lead cualificado en análisis.
- Con suficientes ventas importadas: Maximizar valor de conversión con ROAS objetivo o CPA objetivo basado en margen.

Fórmulas de control:

```text
CAC máximo = margen bruto por reserva × porcentaje máximo aceptable de captación
CPL máximo = CAC máximo × tasa de cierre lead a reserva
ROAS de equilibrio = ingresos atribuidos / gasto publicitario necesario para cubrir margen y costes
```

Nunca usar ROAS de ingresos como único criterio si los márgenes varían entre rutas.

### 11.9 Checklist PMax

No lanzar hasta tener:

- Conversiones primarias fiables.
- Valores de compra/importación offline.
- Feed o conjunto de activos de calidad si procede.
- Creatividades originales de vídeo e imagen.
- Exclusiones de marca y configuración de URL evaluadas.
- Campañas Search funcionando de referencia.
- Audiencias de visitantes de rutas, inicio de presupuesto y clientes.
- Presupuesto que no afecte a Search de alta intención.

---

## 12. CRO — Conversión de las landings

### 12.1 Primer scroll

Debe contener sin necesidad de hacer scroll:

- Nombre exacto de la ruta.
- Duración / etapas.
- Beneficio principal demostrable.
- Precio desde, solo si es real.
- CTA visible.
- Señal de confianza verificable.

### 12.2 Elementos de prueba

- Testimonios de la misma ruta.
- Número de viajeros solo si está documentado.
- Fotos propias.
- Inclusiones claras.
- Políticas de pago y cancelación.
- Tiempo de respuesta real.
- Datos de contacto visibles.

### 12.3 Experimentos A/B

Ejecutar solo un cambio significativo por experimento:

| Hipótesis | Variante A | Variante B | Métrica |
|---|---|---|---|
| CTA | Solicitar presupuesto | Ver disponibilidad | `start_quote` y lead cualificado |
| Hero | Paisaje | Itinerario/resumen de etapas | Tasa de interacción y `start_quote` |
| Precio | Oculto hasta formulario | Precio desde transparente | Calidad de lead y conversión |
| Formulario | Largo | Progresivo en dos pasos | Tasa de envío y calidad |
| Contacto | Solo formulario | Formulario + WhatsApp | Lead cualificado y tiempo de respuesta |

No declarar ganador con muestra insuficiente ni cambiar simultáneamente copy, diseño, precio y audiencia.

---

## 13. Operación comercial

El SEO y SEM no compensan una mala velocidad de respuesta o un proceso comercial sin seguimiento.

### 13.1 SLA de atención

Definir y cumplir:

- Respuesta de WhatsApp: menos de X minutos en horario laboral.
- Respuesta de formulario: menos de X horas.
- Primer presupuesto: menos de X horas/día hábil.
- Seguimiento: día 1, día 3, día 7 y cierre adaptado al ciclo real.

### 13.2 Guion de cualificación

```text
1. ¿Qué ruta te interesa?
2. ¿Para qué fechas?
3. ¿Cuántas personas viajáis?
4. ¿Qué duración preferís?
5. ¿Necesitáis alojamiento, traslado de equipaje, traslados o asistencia?
6. ¿Tenéis un presupuesto aproximado?
7. ¿Alguna necesidad de movilidad, alimentación, mascota o habitación?
```

Registrar respuestas en CRM, no solamente en WhatsApp.

---

## 14. Roadmap de 12 meses

| Periodo | Trabajo | Entregables | Criterio de éxito |
|---|---|---|---|
| Días 1–3 | Auditoría y baseline | Inventario, dashboard, backlog | Problemas P0 identificados |
| Semana 1 | Medición, canónicos, robots, sitemap | Analítica y eventos testados | URLs de negocio rastreables |
| Semana 2 | Rendimiento y metadatos | Core técnico mejorado | Sin errores críticos de indexación |
| Semanas 2–4 | Tui y Sarria | Dos landings de dinero | Producto, CTA y schema validados |
| Semanas 4–6 | Search Ads inicial y Ferrol | Campañas + landing Ferrol | Leads trazables por keyword/ruta |
| Semanas 6–10 | Hub Tui y contenidos satélite | 6–10 piezas conectadas | Impresiones orgánicas y enlaces internos |
| Semanas 8–12 | Planificador + PR digital | Herramienta y outreach | Primeras menciones relevantes |
| Meses 3–4 | Lugo, A Guarda, CRO | Landings y tests | Mejor tasa de conversión y CPL |
| Meses 4–6 | Offline conversions y escalado | CRM integrado con Ads | Optimización a venta/margen |
| Meses 6–12 | Internacionalización y expansión selectiva | Locales reales y contenido ganador | Mayor cuota no-marca y crecimiento rentable |

---

## 15. KPIs y dashboard

### 15.1 SEO

| KPI | Frecuencia | Objetivo |
|---|---|---|
| URLs indexadas válidas | Semanal | Crecimiento solo de URLs de valor |
| Errores de cobertura/indexación | Semanal | 0 críticos |
| CWV móvil | Mensual | LCP <2,5 s, INP <200 ms, CLS <0,1 |
| Clics e impresiones no marca | Semanal/mensual | Tendencia creciente |
| Keywords top 3 / top 10 | Mensual | Crecimiento por cluster |
| CTR orgánico | Mensual | Mejorar títulos/snippets de páginas con impresión |
| Leads orgánicos cualificados | Semanal | Crecimiento rentable |
| Ingresos/margen orgánico | Mensual | Medición por ruta |

### 15.2 SEM

| KPI | Frecuencia | Objetivo |
|---|---|---|
| Gasto | Diario | Dentro de presupuesto |
| Impresiones, CTR, CPC | Diario/semanal | Relevancia y control de coste |
| Términos de búsqueda | 2–3 veces/semana al inicio | Añadir negativas y oportunidades |
| Conversiones | Semanal | Datos correctos |
| CPL | Semanal | Bajo umbral definido |
| Tasa de lead cualificado | Semanal | Maximizar calidad, no solo volumen |
| Tasa de cierre | Mensual | Mejorar seguimiento y oferta |
| CAC y margen | Mensual | Dentro de objetivo económico |
| Cuota de impresión | Semanal | Priorizar exactas rentables |

### 15.3 Dashboard mínimo

Crear una vista por:

```text
Canal → campaña → grupo de anuncios → keyword/consulta → landing → ruta → lead → venta → valor → margen
```

---

## 16. Cadencia operativa

### Diario

- Revisar errores críticos de formularios, reservas y tracking.
- Comprobar gasto Ads, rechazos y términos de búsqueda anómalos.
- Responder leads según SLA.

### Semanal

- Revisar Search Console: consultas, páginas, CTR y cobertura.
- Revisar términos de búsqueda, negativas, CPC, leads y calidad.
- Comprobar disponibilidad/precios de rutas anunciadas.
- Publicar o actualizar al menos una pieza prioritaria.
- Registrar enlaces/menciones y oportunidades de PR.

### Mensual

- Reporte de SEO, Ads, leads, ventas, CAC, margen y backlog.
- Auditoría de canibalización.
- Revisión de Core Web Vitals.
- Priorización ICE/RICE de experimentos y contenidos.
- Actualización de páginas sensibles a precio, fechas, logística o condiciones.

### Trimestral

- Revisión de arquitectura y consolidación de contenido débil.
- Auditoría de enlaces y reputación.
- Revisión de mercados e idiomas.
- Reasignación de presupuesto a rutas de mayor margen y tasa de cierre.

---

## 17. Definition of Done por landing

Una landing está lista para publicar solo si cumple:

- [ ] Producto real confirmado por negocio.
- [ ] URL, canonical, title, meta description y H1 únicos.
- [ ] Idioma `lang` correcto y hreflang si hay versión equivalente.
- [ ] Imagen hero optimizada, dimensiones definidas y alt descriptivo.
- [ ] Información de etapas, duración, dificultad y logística revisada.
- [ ] Precio/desde, disponibilidad e inclusiones exactas si se muestran.
- [ ] CTA funcional y formulario/WhatsApp medido.
- [ ] Eventos GA4 comprobados en DebugView.
- [ ] Breadcrumbs visibles y JSON-LD válido.
- [ ] FAQ visible, genuina y específica.
- [ ] Enlaces internos desde y hacia páginas relevantes.
- [ ] Enlace incluido correctamente en sitemap.
- [ ] Prueba móvil manual completada.
- [ ] Lighthouse/PageSpeed revisado sin regresiones críticas.
- [ ] Revisión legal y comercial completada.

---

## 18. Definition of Done por campaña Ads

- [ ] Conversión primaria configurada y probada.
- [ ] Landing específica, rápida y coherente con anuncio.
- [ ] Campaña, presupuesto, ubicaciones, idioma y calendario validados.
- [ ] Keywords agrupadas por intención.
- [ ] Concordancias y negativas iniciales configuradas.
- [ ] Dos RSA por grupo de anuncios.
- [ ] Sitelinks, callouts y snippets implementados si aplican.
- [ ] UTMs y autoetiquetado comprobados.
- [ ] Dashboard de gasto, leads y calidad accesible.
- [ ] Proceso de respuesta comercial definido.
- [ ] Protocolo de revisión de términos de búsqueda definido.
- [ ] No se usa marca, precio, descuento ni claim no verificable.

---

## 19. Backlog priorizado inmediato

### P0 — Ejecutar antes de invertir en escala

- [ ] Definir dominio canónico y validar redirecciones.
- [ ] Auditar `robots.txt`, `sitemap.xml`, canonicals y hreflang.
- [ ] Instalar/verificar GA4, GTM, Search Console, eventos y consentimiento.
- [ ] Crear CRM de leads con UTMs, GCLID y estados de cualificación.
- [ ] Completar landing de Camino Portugués desde Tui.
- [ ] Completar landing de Camino de Santiago desde Sarria.
- [ ] Crear campañas Search de marca, Tui y Sarria.
- [ ] Implementar negativas compartidas y proceso de revisión.
- [ ] Configurar importación de conversiones offline.

### P1 — Ejecutar tras la base

- [ ] Completar Camino Inglés desde Ferrol.
- [ ] Publicar hub de etapas/planificación de Tui.
- [ ] Implementar schema Breadcrumb, Organization y FAQ válido.
- [ ] Lanzar Ruta Galicia y contenido de Lugo/A Guarda.
- [ ] Crear planificador de rutas y captación de lead.
- [ ] Publicar política editorial, página de equipo y página de opiniones.
- [ ] Lanzar outreach de PR digital con un activo propio.

### P2 — Escalar con datos

- [ ] Expandir contenidos de Sarria según Search Console.
- [ ] Internacionalizar solo rutas con producto e idioma realmente atendidos.
- [ ] Crear remarketing basado en consentimiento.
- [ ] Probar PMax solo con conversiones fiables.
- [ ] Añadir nichos: grupos, bici, mascota, accesibilidad, solo si existe oferta real.

---

## 20. Riesgos a evitar

- Publicar versiones en inglés/portugués mediante traducción literal sin soporte comercial real.
- Tener múltiples URLs equivalentes para “Tui a Santiago”, “Camino desde Tui” y “Camino Portugués desde Tui” sin estrategia de intención/canonical.
- Utilizar schema de reseñas o precios falsos.
- Activar PMax sin ventas importadas ni control de URLs.
- Enviar tráfico genérico a la home en lugar de a landing de ruta.
- Invertir en términos de marca de competidores sin una decisión legal y estratégica explícita.
- Crear decenas de páginas programáticas con el mismo texto cambiando únicamente días, ciudades o adjetivos.
- Dejar precios, fechas, disponibilidad, enlaces de transporte o condiciones desactualizados.
- Medir leads pero no ventas ni margen.
- Optimizar SEO por rankings aislados en vez de por leads cualificados, reservas e ingresos.

---

## 21. Resultado esperado

La estrategia ganadora es convertir StepToSantiago en el recurso y la agencia más útil para planificar y reservar rutas de entrada a Galicia. La ventaja no será “tener más páginas” que competidores consolidados, sino ofrecer una combinación superior de:

- Especialización local real.
- Información profunda y actualizada.
- Itinerarios y precios transparentes.
- Experiencia móvil rápida y clara.
- Captación por búsquedas de alta intención.
- Medición hasta venta y margen.
- Atención comercial ágil.
- Reputación, contenido original y activos que merezcan enlaces.

El orden correcto es: **medir → arreglar base técnica → convertir Tui/Sarria → lanzar Search → crear autoridad temática → medir ventas → escalar lo rentable**.
