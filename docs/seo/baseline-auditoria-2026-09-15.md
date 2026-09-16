# Baseline de Auditoría SEO y Plan de Implementación — StepToSantiago (Revisión y Corrección de Arquitectura)

**Fecha:** 15 de septiembre de 2026  
**Dominio canónico:** `https://www.steptosantiago.com`  
**Mercado prioritario inicial:** España (idioma: `es`)  
**Plataforma:** Sitio web estático multilingüe (despliegue en Vercel)  

---

## 1. Resumen Ejecutivo de las Correcciones de Arquitectura

En respuesta a la auditoría técnica y siguiendo estrictamente las directrices directas sobre la arquitectura real de StepToSantiago, se han depurado las anomalías estructurales generadas previamente:

| Factor SEO / Arquitectura | Situación Errónea Previa | Corrección Implementada |
| :--- | :--- | :--- |
| **Páginas de Rutas Específicas** | Se intentaron crear landings estáticas huérfanas independientes (ej. `/es/rutas/frances/sarria/`) | **Arquitectura dinámica unificada:** Las rutas se alimentan dinámicamente mediante JavaScript sobre la plantilla canónica `/es/pages/ruta.html?id=[ID_RUTA]` a partir de `rutas.json` y se exploran en el catálogo global `/es/pages/rutas.html`. Las carpetas estáticas creadas por error han sido eliminadas. |
| **Landing "Viajes Organizados"** | Creada landing estática `/es/viajes-organizados-camino-santiago/` redundante | **Eliminada por completo**. El tráfico comercial se canaliza a través de la Home, el catálogo general y la página de servicios. |
| **Guía Pilar Informacional** | Creada `/es/guias/camino-portugues-desde-tui/` como HTML independiente | **Eliminada**. El contenido formativo/guias se gestionará a posteriori en un blog centralizado. |
| **Planificador de Rutas** | Herramienta creada con enlaces a páginas estáticas y aislada de la navegación | **Integrado y Perfeccionado**: Se mantiene en `/es/planificador-camino-santiago/`, se añade enlace directo al Navbar global (`sts-header.js`), y su recomendador interactivo dirige al usuario a las rutas canónicas `/es/pages/ruta.html?id=[ID]`. |
| **Páginas de Confianza / Footer** | Enlaces a FAQ y Opiniones ausentes de la navegación global | **Integración en Footer global** (`sts-footer.js`) con enlaces directos a `/es/preguntas-frecuentes/` y `/es/opiniones/`. |
| **Preguntas Frecuentes (FAQ SEM)** | Listado básico sin cubrir objeciones comerciales principales | **Ampliación con preguntas clave SEM**: inclusión detallada sobre reservas con antelación, coberturas del viaje organizado, viajar solo/a, traslados aeropuerto y soporte 24/7 (HTML + JSON-LD `FAQPage`). |
| **Sitemap XML** | Contenía páginas inexistentes/eliminadas | **Sitemap depurado**: Eliminación de `/es/viajes-organizados-camino-santiago/`, `/es/guias/...` y `/es/rutas/frances/sarria/`. Inclusión limpia de páginas y herramientas reales. |

---

## 2. Inventario Canónico de la Arquitectura

### 2.1 Páginas de Rutas y Catálogo
- `/es/pages/rutas.html`: Catálogo interactivo de todas las rutas disponibles con filtrado por días, dificultad y tipo de camino.
- `/es/pages/ruta.html?id=[ID]`: Plantilla dinámica que renderiza la ficha técnica completa, etapas, altimetría, alojamientos incluidos y formulario de reserva según el identificador de ruta:
  - `?id=frances` (Camino Francés / Sarria)
  - `?id=portugues-tui` (Camino Portugués desde Tui)
  - `?id=portugues-costa-oporto` (Camino de la Costa desde Oporto)
  - `?id=portugues-costa-guarda` (Camino de la Costa desde A Guarda)
  - `?id=ingles-ferrol` (Camino Inglés desde Ferrol)
  - `?id=primitivo-lugo` (Camino Primitivo desde Lugo)

### 2.2 Herramientas Interactivas y Captura
- `/es/planificador-camino-santiago/`: Recomendador interactivo paso a paso basado en días, acompañantes, preparación física y preferencias de paisaje. Enlazado en el Header global.

### 2.3 Páginas de Confianza, Soporte e Información
- `/es/preguntas-frecuentes/`: Base de conocimiento completa sobre credencial, traslados de equipaje, alojamientos privados, seguros y traslados privados. Enlazada en el Footer.
- `/es/opiniones/`: Valoraciones y testimonios reales de peregrinos. Enlazada en el Footer.
- `/es/pages/contacto.html`: Formulario de captación con atribución SEM automatizada.
- `/es/pages/servicios.html`: Detalle de servicios complementarios (transporte de mochilas, transfer aeropuerto, etc.).
- `/es/pages/nosotros.html`: Información institucional de la agencia en Santiago de Compostela.

---

## 3. Datos Estructurados (Schema.org)

1. **`FAQPage`**: Implementado en `/es/preguntas-frecuentes/` para Rich Snippets en Google.
2. **`BreadcrumbList`**: Navegación estructurada presente en todas las páginas clave.
3. **`TravelAgency`**: Datos locales de StepToSantiago (Santiago de Compostela, horarios, teléfono y canales de soporte).

---

## 4. Pipeline de Atribución Analítica (SEM / GA4)

- **Script:** `/scripts/analytics/sts-analytics.js` activo de forma global.
- **Parámetros persistidos:** `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `gbraid`, `wbraid`.
- **Eventos:** `form_submit`, `view_route`, `whatsapp_click`, `phone_click`, `planificador_completado`.

---

## 5. Próximas Acciones Recomendadas

1. **Google Search Console:**
   - Enviar el archivo `sitemap.xml` saneado.
   - Solicitar indexación de `/es/planificador-camino-santiago/`, `/es/preguntas-frecuentes/` y `/es/opiniones/`.
2. **Campañas Google Ads:**
   - Direccionar anuncios con intención específica de ruta a la plantilla `/es/pages/ruta.html?id=[id]`.
   - Utilizar el Planificador (`/es/planificador-camino-santiago/`) como landing page para búsquedas de descubrimiento amplio ("qué camino de santiago elegir").
