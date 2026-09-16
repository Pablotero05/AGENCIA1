# Graph Report - STEPBYSTEP  (2026-09-15)

## Corpus Check
- Large corpus: 5769 files · ~4,137,220 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 260 nodes · 228 edges · 67 communities (15 shown, 50 thin omitted)
- Extraction: 74% EXTRACTED · 26% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Node Package Dependencies & Tailwind Build
- SEO Static Page Generator & Staging
- SEO Strategy & Structured Data
- Spanish Routes & Pilgrim Services
- Lead Capture & Contact Form Processing
- Portuguese Routes & Localized Pages
- Multilingual Web Components UI
- Spanish Routes & Pilgrim Services
- Route Filtering & Catalog UI
- Analytics Tracking & Event Attribution
- SEO Static Page Generator & Staging
- Component Cluster 11
- Multilingual Web Components UI
- Component Cluster 13
- Component Cluster 14
- Component Cluster 15
- Multilingual Web Components UI
- Multilingual Web Components UI
- Component Cluster 18
- Multilingual Web Components UI
- Component Cluster 20
- Multilingual Web Components UI
- Component Cluster 22
- Multilingual Web Components UI
- Component Cluster 24
- Component Cluster 25
- English Localized Site & Route Guides
- English Localized Site & Route Guides
- Component Cluster 28
- Component Cluster 29
- Portuguese Routes & Localized Pages
- Component Cluster 32
- English Localized Site & Route Guides
- Spanish Routes & Pilgrim Services
- Component Cluster 35
- Component Cluster 36
- Component Cluster 37
- Component Cluster 38
- Component Cluster 39
- Component Cluster 40
- Component Cluster 41
- Component Cluster 42
- Component Cluster 43
- Component Cluster 44
- Component Cluster 45
- Component Cluster 46
- Spanish Agency Portal & Legal Pages
- Spanish Agency Portal & Legal Pages
- Component Cluster 49
- Component Cluster 50
- English Localized Site & Route Guides
- English Localized Site & Route Guides
- English Localized Site & Route Guides
- English Localized Site & Route Guides
- Component Cluster 55
- Component Cluster 56
- Component Cluster 57
- Component Cluster 58
- Component Cluster 59
- Component Cluster 60
- Component Cluster 61
- Component Cluster 62
- Component Cluster 63
- Component Cluster 64
- Component Cluster 66

## God Nodes (most connected - your core abstractions)
1. `English Routes Catalog Hub (/en/routes/)` - 9 edges
2. `Catálogo de Rotas do Caminho (PT)` - 7 edges
3. `StsHeader` - 6 edges
4. `Step to Santiago Home Page (Spanish)` - 6 edges
5. `stsTrack()` - 5 edges
6. `generateRoutePageHTML()` - 5 edges
7. `filterRoutes()` - 5 edges
8. `Rotas do Caminho de Santiago (PT)` - 5 edges
9. `StsHeader` - 4 edges
10. `StsHeader` - 4 edges

## Surprising Connections (you probably didn't know these)
- `SEO Audit Baseline & SEM Plan (2026-09-15)` --semantically_similar_to--> `SEO Directives & Strategy`  [INFERRED] [semantically similar]
  docs/seo/baseline-auditoria-2026-09-15.md → directrices-seo-agencia1.md
- `Step to Santiago Home Page (Spanish)` --semantically_similar_to--> `Página Inicial Step to Santiago (PT)`  [INFERRED] [semantically similar]
  index.html → por/index.html
- `Caminho Português desde Tui (POR)` --semantically_similar_to--> `Caminho Português desde Tui (PT)`  [INFERRED] [semantically similar]
  por/rotas/portugues-tui/index.html → pt/rotas/portugues-tui/index.html
- `Caminho Primitivo desde Lugo (POR)` --semantically_similar_to--> `Caminho Primitivo desde Lugo (PT)`  [INFERRED] [semantically similar]
  por/rotas/primitivo-lugo/index.html → pt/rotas/primitivo-lugo/index.html
- `Serviços Step to Santiago (POR)` --semantically_similar_to--> `Serviços Step to Santiago (PT)`  [INFERRED] [semantically similar]
  por/servicos/index.html → pt/servicos/index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **English Localized Static Route Landings** — en_routes_frances_index_page, en_routes_ingles_ferrol_index_page, en_routes_portugues_tui_index_page, en_routes_portugues_costa_guarda_index_page, en_routes_portugues_costa_oporto_index_page, en_routes_primitivo_lugo_index_page [INFERRED 0.85]
- **English Legal and Compliance Notice Pages** — en_pages_legal_page, en_pages_politicas_page, en_pages_terminos_page [INFERRED 0.85]
- **Portuguese Localized Route Pages** — por_rotas_frances_index_html, por_rotas_ingles_ferrol_index_html, por_rotas_portugues_costa_guarda_index_html, por_rotas_portugues_costa_oporto_index_html [INFERRED 0.85]
- **Portuguese Static Template Pages** — por_pages_contacto_html, por_pages_legal_html, por_pages_nosotros_html, por_pages_politicas_html, por_pages_ruta_html, por_pages_rutas_html, por_pages_servicios_html, por_pages_terminos_html [INFERRED 0.85]
- **Portuguese Localized Camino Routes** — pt_rotas_frances_index_caminho_frances_pt, pt_rotas_ingles_ferrol_index_caminho_ingles_pt, pt_rotas_portugues_costa_guarda_index_caminho_costa_guarda_pt, pt_rotas_portugues_costa_oporto_index_caminho_costa_porto_pt, pt_rotas_portugues_tui_index_caminho_tui_pt, pt_rotas_primitivo_lugo_index_caminho_primitivo_pt [INFERRED 0.85]

## Communities (67 total, 50 thin omitted)

### Community 0 - "Node Package Dependencies & Tailwind Build"
Cohesion: 0.08
Nodes (23): author, bugs, url, dependencies, tailwindcss, @tailwindcss/cli, description, homepage (+15 more)

### Community 1 - "SEO Static Page Generator & Staging"
Cohesion: 0.14
Nodes (16): build(), buildCleanPages(), formatHoras(), formatKm(), fs, generateRoutePageHTML(), getDificultadClass(), hubUrl (+8 more)

### Community 2 - "SEO Strategy & Structured Data"
Cohesion: 0.13
Nodes (15): Structured Data JSON-LD Schema Strategy, SEO Directives & Strategy, URL Architecture & Localization Strategy, Analytics Tracking & Lead Attribution Architecture, SEO Audit Baseline & SEM Plan (2026-09-15), English Home Page (/en/), English Dynamic Route Detail Template (ruta.html), English Legacy Routes Catalog Template (rutas.html) (+7 more)

### Community 3 - "Spanish Routes & Pilgrim Services"
Cohesion: 0.14
Nodes (14): Camino Portugués desde Tui (ES), Camino Primitivo desde Lugo (ES), Servicios para el Camino de Santiago (ES), Viajes Organizados al Camino de Santiago (ES), Step to Santiago Home Page (Spanish), Plan de Implementación SEO/SEM Step to Santiago, Contato Step to Santiago (PT), Página Inicial Step to Santiago (PT) (+6 more)

### Community 4 - "Lead Capture & Contact Form Processing"
Cohesion: 0.18
Nodes (5): Contact Template Page (es/pages/contacto.html), escapeHtml(), getPageLang(), normalizeLang(), showSuccessAnimation()

### Community 5 - "Portuguese Routes & Localized Pages"
Cohesion: 0.17
Nodes (13): Caminho Português desde Tui (POR), Caminho Primitivo desde Lugo (POR), Sobre Nós Step to Santiago (POR), Contato Step to Santiago (PT), Página Inicial Step to Santiago (PT), Caminho Francês Organizado (PT), Catálogo de Rotas do Caminho (PT), Caminho Inglês desde Ferrol (PT) (+5 more)

### Community 6 - "Multilingual Web Components UI"
Cohesion: 0.20
Nodes (11): sts-footer Web Component, sts-header Web Component, Services Page (English), Contacto Page (es/contacto), Guide: Camino Portugués desde Tui, Servicios Page (es/pages/servicios.html), FAQ Page (es/preguntas-frecuentes), Camino Portugués desde Tui (117 km) (+3 more)

### Community 7 - "Spanish Routes & Pilgrim Services"
Cohesion: 0.22
Nodes (9): Step To Santiago Agency, Spanish Homepage, Nosotros Page (es/nosotros), Opiniones Page (es/opiniones), Legal Notice Page (es/pages/legal.html), About Us Template Page (es/pages/nosotros.html), Privacy Policy Page (es/pages/politicas.html), Terms & Conditions Page (es/pages/terminos.html) (+1 more)

### Community 8 - "Route Filtering & Catalog UI"
Cohesion: 0.36
Nodes (8): Routes Listing Template (es/pages/rutas.html), Routes Catalog Hub Page, filterRoutes(), init(), updateButtons(), updateCounter(), updateNoResults(), routeCards.js

### Community 9 - "Analytics Tracking & Event Attribution"
Cohesion: 0.39
Nodes (8): bindFormTracking(), bindPhoneClicks(), bindWhatsAppClicks(), captureAttributionParams(), fillHiddenFormFields(), getStoredAttributionParams(), getUrlParams(), stsTrack()

### Community 10 - "SEO Static Page Generator & Staging"
Cohesion: 0.22
Nodes (8): browserScripts, directories, fs, outputDir, path, rootDir, rootFiles, scriptsDir

### Community 11 - "Component Cluster 11"
Cohesion: 0.29
Nodes (8): Interactive Route Planner Page, Camino Francés Hub Page, Camino desde Sarria Detail Page, Camino Portugués Costa desde A Guarda Detail Page, Camino Portugués Costa desde Oporto Detail Page, Camino Francés desde Sarria (115 km), Camino Portugués de la Costa desde Oporto (270 km), Product JSON-LD Schema

### Community 13 - "Component Cluster 13"
Cohesion: 0.33
Nodes (5): contentData, fs, langs, path, rootDir

### Community 14 - "Component Cluster 14"
Cohesion: 0.33
Nodes (5): contentData, fs, langs, path, rootDir

### Community 15 - "Component Cluster 15"
Cohesion: 0.33
Nodes (5): cleanUrls, headers, outputDirectory, redirects, trailingSlash

## Knowledge Gaps
- **130 isolated node(s):** `name`, `version`, `description`, `main`, `build` (+125 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 155 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **50 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Contacto Page (es/contacto)` connect `Multilingual Web Components UI` to `Analytics Tracking & Event Attribution`, `Lead Capture & Contact Form Processing`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `English Routes Catalog Hub (/en/routes/)` (e.g. with `URL Architecture & Localization Strategy` and `English Home Page (/en/)`) actually correct?**
  _`English Routes Catalog Hub (/en/routes/)` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `Step To Santiago Agency` (e.g. with `Spanish Homepage` and `Nosotros Page (es/nosotros)`) actually correct?**
  _`Step To Santiago Agency` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Step to Santiago Home Page (Spanish)` (e.g. with `Página Inicial Step to Santiago (PT)` and `Plan de Implementación SEO/SEM Step to Santiago`) actually correct?**
  _`Step to Santiago Home Page (Spanish)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _130 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Node Package Dependencies & Tailwind Build` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `SEO Static Page Generator & Staging` be split into smaller, more focused modules?**
  _Cohesion score 0.1437908496732026 - nodes in this community are weakly interconnected._