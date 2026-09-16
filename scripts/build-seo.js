const fs = require('fs');
const path = require('path');

// Resolve the project root from this script so builds work locally and on Vercel.
const ROOT_DIR = path.resolve(__dirname, '..');
const BASE_URL = 'https://www.steptosantiago.com';

// Load routes data
const loadJSON = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const rutasES = loadJSON(path.join(ROOT_DIR, 'es', 'data', 'rutas.json'));
const rutasEN = loadJSON(path.join(ROOT_DIR, 'en', 'data', 'rutas.json'));
const rutasPT = loadJSON(path.join(ROOT_DIR, 'por', 'data', 'rutas.json'));

const routesByLang = {
  es: rutasES,
  en: rutasEN,
  pt: rutasPT
};

const routeUrlPrefix = {
  es: '/es/rutas',
  en: '/en/routes',
  pt: '/pt/rotas'
};

const hubUrl = {
  es: '/es/rutas/',
  en: '/en/routes/',
  pt: '/pt/rotas/'
};

const labels = {
  es: {
    home: 'Inicio',
    routes: 'Todas las Rutas',
    routeDescription: 'Descripción de la ruta',
    highlights: 'Puntos Destacados',
    technicalSpecs: 'Ficha Técnica',
    totalDistance: 'Distancia total',
    recommendedDuration: 'Duración recomendada',
    difficultyLevel: 'Nivel de dificultad',
    startLocation: 'Inicio',
    finalDestination: 'Final',
    bestSeason: 'Mejor época',
    fromPrice: 'Desde',
    price: 'Precio',
    requestQuote: 'Solicitar Presupuesto',
    requestQuoteFree: 'Solicitar Presupuesto Gratis',
    viewStages: 'Ver Etapas',
    dailyPlan: 'Planificación día a día',
    recommendedStages: 'Etapas Recomendadas',
    getInspired: 'Inspírate',
    gallery: 'Galería de la Ruta',
    pointsOfInterest: 'Puntos de interés',
    arrivalDay: 'Día de llegada',
    difficulty: 'Dificultad',
    santiago: 'Santiago de Compostela'
  },
  en: {
    home: 'Home',
    routes: 'All Routes',
    routeDescription: 'Route description',
    highlights: 'Highlights',
    technicalSpecs: 'Technical Sheet',
    totalDistance: 'Total distance',
    recommendedDuration: 'Recommended duration',
    difficultyLevel: 'Difficulty level',
    startLocation: 'Start',
    finalDestination: 'Finish',
    bestSeason: 'Best season',
    fromPrice: 'From',
    price: 'Price',
    requestQuote: 'Request Quote',
    requestQuoteFree: 'Get Your Free Quote',
    viewStages: 'View Stages',
    dailyPlan: 'Day by day planning',
    recommendedStages: 'Recommended Stages',
    getInspired: 'Get Inspired',
    gallery: 'Route Gallery',
    pointsOfInterest: 'Points of interest',
    arrivalDay: 'Arrival day',
    difficulty: 'Difficulty',
    santiago: 'Santiago de Compostela'
  },
  pt: {
    home: 'Início',
    routes: 'Todas as Rotas',
    routeDescription: 'Descrição da rota',
    highlights: 'Destaques',
    technicalSpecs: 'Ficha Técnica',
    totalDistance: 'Distância total',
    recommendedDuration: 'Duração recomendada',
    difficultyLevel: 'Nível de dificuldade',
    startLocation: 'Início',
    finalDestination: 'Final',
    bestSeason: 'Melhor época',
    fromPrice: 'A partir de',
    price: 'Preço',
    requestQuote: 'Solicitar Orçamento',
    requestQuoteFree: 'Solicitar Orçamento Grátis',
    viewStages: 'Ver Etapas',
    dailyPlan: 'Planejamento dia a dia',
    recommendedStages: 'Etapas Recomendadas',
    getInspired: 'Inspire-se',
    gallery: 'Galeria da Rota',
    pointsOfInterest: 'Pontos de interesse',
    arrivalDay: 'Dia de chegada',
    difficulty: 'Dificuldade',
    santiago: 'Santiago de Compostela'
  }
};

const getDificultadClass = (dif) => {
  if (!dif || dif === '-') return '';
  const d = String(dif).toLowerCase();
  if (d.includes('baja') || d.includes('low') || d.includes('fácil') || d.includes('facil') || d.includes('easy')) return 'bg-green-100 text-green-700';
  if (d.includes('media') || d.includes('medium') || d.includes('moderado') || d.includes('moderate')) return 'bg-yellow-100 text-yellow-700';
  if (d.includes('alta') || d.includes('high') || d.includes('exigente') || d.includes('dura') || d.includes('hard')) return 'bg-red-100 text-red-700';
  return 'bg-gray-100 text-gray-600';
};

const formatKm = (km) => {
  if (km === undefined || km === null) return '';
  const str = String(km).trim();
  if (str.toLowerCase().includes('km')) return str;
  return `${str} km`;
};

const formatHoras = (horas) => {
  if (!horas || horas === '-') return '';
  const str = String(horas).trim();
  if (str.toLowerCase().includes('h')) return str;
  return `${str} h`;
};

function generateRoutePageHTML(ruta, lang) {
  const t = labels[lang];
  const routeId = ruta.id;
  const canonicalUrl = `${BASE_URL}${routeUrlPrefix[lang]}/${routeId}/`;
  const esUrl = `${BASE_URL}${routeUrlPrefix.es}/${routeId}/`;
  const enUrl = `${BASE_URL}${routeUrlPrefix.en}/${routeId}/`;
  const ptUrl = `${BASE_URL}${routeUrlPrefix.pt}/${routeId}/`;

  // Optimized Title & Description
  const title = lang === 'en'
    ? `${ruta.nombre}: Organized Camino Tour | Step to Santiago`
    : lang === 'pt'
    ? `${ruta.nombre} Organizado | Step to Santiago`
    : `${ruta.nombre} Organizado | Step to Santiago`;

  let metaDesc = ruta.descripcion;
  if (metaDesc.length > 155) {
    metaDesc = metaDesc.substring(0, 152) + '...';
  }

  const ogImage = ruta.imagenHero && ruta.imagenHero.startsWith('http')
    ? ruta.imagenHero
    : `${BASE_URL}/assets/rutas_banner.png`;

  const heroImageSrc = ruta.imagenHero && ruta.imagenHero.startsWith('http')
    ? ruta.imagenHero
    : `../../assets/${path.basename(ruta.imagen || 'rutas_banner.png')}`;

  // JSON-LD Schemas
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Step To Santiago",
      "url": "https://www.steptosantiago.com",
      "logo": "https://www.steptosantiago.com/assets/ststrasp.png",
      "image": "https://www.steptosantiago.com/assets/rutas_banner.png",
      "description": "Agencia de viajes especializada en el Camino de Santiago.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Santiago de Compostela",
        "addressRegion": "A Coruña",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 42.8782,
        "longitude": -8.5448
      },
      "telephone": "+34 981 00 00 00",
      "email": "steptosantiago.contact@gmail.com",
      "priceRange": "€€"
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": ruta.nombre,
      "description": ruta.descripcion,
      "image": ogImage,
      "offers": {
        "@type": "Offer",
        "price": parseInt(ruta.precio.replace(/[^\d]/g, ''), 10) || 365,
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": canonicalUrl
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": t.home,
          "item": `${BASE_URL}/${lang === 'pt' ? 'pt' : lang}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": t.routes,
          "item": `${BASE_URL}${hubUrl[lang]}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": ruta.nombre,
          "item": canonicalUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": lang === 'en' ? `What is the total distance of ${ruta.nombre}?` : lang === 'pt' ? `Qual é a distância total do ${ruta.nombre}?` : `¿Cuál es la distancia total del ${ruta.nombre}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": lang === 'en' ? `The total distance is approximately ${ruta.km}, typically completed in ${ruta.dias}.` : lang === 'pt' ? `A distância total é de aproximadamente ${ruta.km}, normalmente percorrida em ${ruta.dias}.` : `La distancia total es de aproximadamente ${ruta.km}, completándose habitualmente en ${ruta.dias}.`
          }
        },
        {
          "@type": "Question",
          "name": lang === 'en' ? `What is included in the organized tour?` : lang === 'pt' ? `O que está incluído no pacote organizado?` : `¿Qué incluye el paquete organizado?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": lang === 'en' ? `Selected accommodations, daily luggage transfer between stages, pilgrim credential, 24/7 phone assistance, and travel insurance.` : lang === 'pt' ? `Alojamentos selecionados, transporte diário de bagagem entre etapas, credencial do peregrino, assistência 24/7 e seguro de viagem.` : `Alojamientos seleccionados, traslado de equipaje entre etapas, credencial del peregrino, asistencia 24h y seguro de viaje.`
          }
        },
        {
          "@type": "Question",
          "name": lang === 'en' ? `When is the best season to walk ${ruta.nombre}?` : lang === 'pt' ? `Qual é a melhor época para fazer o ${ruta.nombre}?` : `¿Cuál es la melhor época para hacer el ${ruta.nombre}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${ruta.epoca}.`
          }
        }
      ]
    }
  ];

  // Description paragraphs HTML
  const descParagraphsHTML = (ruta.descripcionLarga || [ruta.descripcion])
    .map(p => `<p>${p}</p>`)
    .join('\n');

  // Highlights list HTML
  const highlightsHTML = (ruta.puntosDestacados || [])
    .map(p => `
      <li class="flex items-start gap-3 text-[var(--gray-text-color)]">
        <i class="fa-solid fa-check text-[var(--primary-color)] mt-1" aria-hidden="true"></i>
        <span>${p}</span>
      </li>`).join('\n');

  // Stages list HTML
  const stagesHTML = (ruta.etapas || []).map(etapa => {
    const isArrival = etapa.km === 0 || etapa.km === '0';
    const statsHTML = isArrival
      ? `<span class="flex items-center gap-2 text-[var(--accent-color)] font-semibold"><i class="fa-solid fa-star text-[var(--accent-color)]" aria-hidden="true"></i>${t.arrivalDay}</span>`
      : `
        <span class="flex items-center gap-2 font-medium"><i class="fa-solid fa-route text-[var(--primary-color)]" aria-hidden="true"></i>${formatKm(etapa.km)}</span>
        ${etapa.horas && etapa.horas !== '-' ? `<span class="flex items-center gap-2 font-medium"><i class="fa-solid fa-clock text-[var(--primary-color)]" aria-hidden="true"></i>${formatHoras(etapa.horas)}</span>` : ''}
        ${etapa.desnivel ? `<span class="flex items-center gap-2 font-medium"><i class="fa-solid fa-mountain text-[var(--primary-color)]" aria-hidden="true"></i>${etapa.desnivel}</span>` : ''}
        ${etapa.dificultad && etapa.dificultad !== '-' ? `<span class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${getDificultadClass(etapa.dificultad)}"><i class="fa-solid fa-gauge mr-1" aria-hidden="true"></i>${t.difficulty} ${etapa.dificultad}</span>` : ''}
      `;

    const puntosHTML = etapa.puntosInteres && etapa.puntosInteres.length > 0
      ? `<div class="mt-4 pt-4 border-t border-gray-200">
          <p class="text-xs font-bold text-[var(--dark-text-color)] uppercase tracking-wide mb-2 flex items-center gap-1">
            <i class="fa-solid fa-location-dot text-[var(--accent-color)]" aria-hidden="true"></i> ${t.pointsOfInterest}
          </p>
          <ul class="space-y-1">
            ${etapa.puntosInteres.map(p => `
              <li class="flex items-start gap-2 text-sm text-[var(--gray-text-color)]">
                <i class="fa-solid fa-circle-dot text-[var(--primary-color)] mt-1 text-xs flex-shrink-0" aria-hidden="true"></i>
                <span>${p}</span>
              </li>`).join('\n')}
          </ul>
        </div>`
      : '';

    return `
      <div class="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 group mb-4 border border-gray-100">
        <div class="flex flex-col md:flex-row md:items-start gap-4">
          <div class="flex-shrink-0">
            <div class="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-bold text-xl">${etapa.dia}</div>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-[var(--dark-text-color)] mb-2 group-hover:text-[var(--primary-color)] transition-colors" style="font-family: var(--font-family-heading);">
              ${isArrival ? etapa.destino : `${etapa.origen} → ${etapa.destino}`}
            </h3>
            <p class="text-[var(--gray-text-color)] mb-3">${etapa.desc}</p>
            <div class="flex flex-wrap gap-4 text-sm text-[var(--gray-text-color)]">
              ${statsHTML}
            </div>
            ${puntosHTML}
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  // Gallery HTML
  const galleryHTML = (ruta.galeria || []).map(img => `
    <div class="aspect-square overflow-hidden rounded-xl group">
      <img src="${img}" alt="${ruta.nombre}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">
    </div>
  `).join('\n');

  const contactLink = lang === 'en'
    ? `/en/contact?ruta=${routeId}`
    : lang === 'pt'
    ? `/pt/contato?ruta=${routeId}`
    : `/es/contacto?ruta=${routeId}`;

  return `<!DOCTYPE html>
<html class="h-full" lang="${lang === 'pt' ? 'pt' : lang}">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${title}</title>
  <meta name="description" content="${metaDesc}">
  
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="es" href="${esUrl}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="pt" href="${ptUrl}">
  <link rel="alternate" hreflang="x-default" href="${enUrl}">

  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:locale" content="${lang === 'en' ? 'en_US' : lang === 'pt' ? 'pt_PT' : 'es_ES'}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${metaDesc}">
  <meta name="twitter:image" content="${ogImage}">

  <link rel="preconnect" href="https://fonts.googleapis.com/">
  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="anonymous">
  <link id="google-fonts-link" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="../../fontawesome/css/all.min.css">
  <link rel="stylesheet" href="../../fontawesome/css/brands.min.css">
  <link rel="stylesheet" href="../../css/tailwind.css">
  <link rel="stylesheet" href="../../css/styles.css">
  
  <script src="../../scripts/components/sts-header.js"></script>
  <script src="../../scripts/components/sts-footer.js" defer></script>

  <script type="application/ld+json">
${JSON.stringify(jsonLdData, null, 2)}
  </script>
</head>

<body class="h-full bg-white">
  <div class="frame-root">
    <div class="frame-content">
      <div class="[font-family:var(--font-family-body)]">
        <sts-header logo="../../assets/ststrasp.png"></sts-header>
  
        <!-- HERO -->
        <section class="relative min-h-[80vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden py-16">
          <div class="absolute inset-0 z-0">
            <img src="${heroImageSrc}" alt="${ruta.nombre}" class="dyn-imagen-hero w-full h-full object-cover" fetchpriority="high">
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
          </div>
          
          <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="max-w-3xl">
              <div class="flex flex-wrap gap-3 mb-5">
                <span class="dyn-badge-principal ${ruta.badgeColor || 'bg-[var(--accent-color)] text-white'} text-sm font-bold px-4 py-2 rounded-full">${ruta.badge}</span>
                <span class="dyn-nivel-dificultad bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30">${ruta.dificultadLabel}</span>
              </div>
              
              <h1 class="dyn-nombre-ruta text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5" style="font-family: var(--font-family-heading);">
                ${ruta.nombre}
              </h1>
              
              <p class="dyn-desc-corta text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                ${ruta.descripcion}
              </p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div class="text-[var(--accent-color)] font-semibold text-sm mb-1">${t.totalDistance}</div>
                  <div class="dyn-distancia text-white font-bold text-2xl">${ruta.km}</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div class="text-[var(--accent-color)] font-semibold text-sm mb-1">${t.recommendedDuration}</div>
                  <div class="dyn-duracion text-white font-bold text-2xl">${ruta.dias}</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div class="text-[var(--accent-color)] font-semibold text-sm mb-1">${t.difficultyLevel}</div>
                  <div class="dyn-nivel-dificultad text-white font-bold text-xl">${ruta.dificultadLabel}</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div class="text-[var(--accent-color)] font-semibold text-sm mb-1">${t.fromPrice}</div>
                  <div class="dyn-precio text-white font-bold text-2xl">${ruta.precio}</div>
                </div>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-4">
                <a href="${contactLink}" class="dyn-cta-link inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-[var(--secondary-button-bg-color)] text-[var(--secondary-button-text-color)] font-bold rounded-lg hover:bg-[var(--secondary-button-hover-bg-color)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <i class="fa-solid fa-paper-plane mr-3" aria-hidden="true"></i> ${t.requestQuoteFree}
                </a>
                <a href="#etapas" class="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[var(--primary-color)] transition-all duration-300">
                  <i class="fa-solid fa-route mr-3" aria-hidden="true"></i> ${t.viewStages}
                </a>
              </div>
              
            </div>
          </div>
        </section>

        <!-- DESCRIPTION & SPECS -->
        <section class="py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              <div>
                <p class="text-[var(--accent-color)] font-semibold text-lg mb-3 tracking-wider uppercase">${t.routeDescription}</p>
                <h2 class="dyn-nombre-ruta text-3xl md:text-4xl font-bold text-[var(--dark-text-color)] mb-6" style="font-family: var(--font-family-heading);">
                  ${ruta.nombre}
                </h2>
                
                <div id="dyn-descripcion-larga" class="space-y-5 text-[var(--gray-text-color)] text-lg leading-relaxed">
                  ${descParagraphsHTML}
                </div>
                
                <div class="mt-8 p-6 bg-[var(--light-background-color)] rounded-xl">
                  <h3 class="font-bold text-[var(--dark-text-color)] text-lg mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-star text-[var(--accent-color)]" aria-hidden="true"></i>
                    ${t.highlights}
                  </h3>
                  <ul id="dyn-puntos-destacados" class="space-y-3">
                    ${highlightsHTML}
                  </ul>
                </div>
              </div>
              
              <div class="lg:sticky lg:top-32">
                <div class="bg-[var(--light-background-color)] rounded-2xl p-8 shadow-lg">
                  <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-6" style="font-family: var(--font-family-heading);">${t.technicalSpecs}</h3>
                  
                  <div class="space-y-5">
                    <div class="flex items-start gap-4 pb-4 border-b border-gray-200">
                      <div class="w-12 h-12 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid fa-route text-[var(--primary-color)] text-xl" aria-hidden="true"></i>
                      </div>
                      <div class="flex-1">
                        <div class="text-[var(--gray-text-color)] text-sm mb-1">${t.totalDistance}</div>
                        <div class="dyn-distancia text-[var(--dark-text-color)] font-bold text-lg">${ruta.km}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-4 pb-4 border-b border-gray-200">
                      <div class="w-12 h-12 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid fa-calendar-days text-[var(--primary-color)] text-xl" aria-hidden="true"></i>
                      </div>
                      <div class="flex-1">
                        <div class="text-[var(--gray-text-color)] text-sm mb-1">${t.recommendedDuration}</div>
                        <div class="dyn-duracion text-[var(--dark-text-color)] font-bold text-lg">${ruta.dias}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-4 pb-4 border-b border-gray-200">
                      <div class="w-12 h-12 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid fa-gauge text-[var(--primary-color)] text-xl" aria-hidden="true"></i>
                      </div>
                      <div class="flex-1">
                        <div class="text-[var(--gray-text-color)] text-sm mb-1">${t.difficultyLevel}</div>
                        <div class="dyn-nivel-dificultad text-[var(--dark-text-color)] font-bold text-lg">${ruta.dificultadLabel}</div>
                        <div class="dyn-dificultad-desc text-[var(--gray-text-color)] text-sm mt-1">${ruta.dificultadDesc}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-4 pb-4 border-b border-gray-200">
                      <div class="w-12 h-12 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid fa-map-pin text-[var(--primary-color)] text-xl" aria-hidden="true"></i>
                      </div>
                      <div class="flex-1">
                        <div class="text-[var(--gray-text-color)] text-sm mb-1">${t.startLocation}</div>
                        <div class="dyn-inicio text-[var(--dark-text-color)] font-bold text-lg">${ruta.inicio}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-4 pb-4 border-b border-gray-200">
                      <div class="w-12 h-12 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid fa-flag-checkered text-[var(--primary-color)] text-xl" aria-hidden="true"></i>
                      </div>
                      <div class="flex-1">
                        <div class="text-[var(--gray-text-color)] text-sm mb-1">${t.finalDestination}</div>
                        <div class="text-[var(--dark-text-color)] font-bold text-lg">${t.santiago}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-4 pb-4 border-b border-gray-200">
                      <div class="w-12 h-12 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid fa-sun text-[var(--primary-color)] text-xl" aria-hidden="true"></i>
                      </div>
                      <div class="flex-1">
                        <div class="text-[var(--gray-text-color)] text-sm mb-1">${t.bestSeason}</div>
                        <div class="dyn-epoca text-[var(--dark-text-color)] font-bold text-lg">${ruta.epoca}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-4">
                      <div class="w-12 h-12 bg-[var(--accent-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid fa-euro-sign text-[var(--accent-color)] text-xl" aria-hidden="true"></i>
                      </div>
                      <div class="flex-1">
                        <div class="text-[var(--gray-text-color)] text-sm mb-1">${t.price}</div>
                        <div class="dyn-precio text-[var(--accent-color)] font-bold text-2xl">${ruta.precio}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-8 pt-6 border-t border-gray-200">
                    <a href="${contactLink}" class="dyn-cta-link w-full inline-flex items-center justify-center px-6 py-4 bg-[var(--primary-color)] text-white font-bold rounded-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-all duration-300 shadow-md hover:shadow-lg">
                      <i class="fa-solid fa-comments mr-3" aria-hidden="true"></i> ${t.requestQuote}
                    </a>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <!-- STAGES -->
        <section id="etapas" class="py-12 lg:py-20 bg-[var(--light-background-color)]">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <p class="text-[var(--accent-color)] font-semibold text-lg mb-3 tracking-wider uppercase">${t.dailyPlan}</p>
              <h2 class="text-3xl md:text-4xl font-bold text-[var(--dark-text-color)]" style="font-family: var(--font-family-heading);">
                ${t.recommendedStages}
              </h2>
            </div>
            
            <div id="dyn-etapas-list" class="space-y-4">
              ${stagesHTML}
            </div>
            
          </div>
        </section>

        <!-- GALLERY -->
        <section class="py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <p class="text-[var(--accent-color)] font-semibold text-lg mb-3 tracking-wider uppercase">${t.getInspired}</p>
              <h2 class="text-3xl md:text-4xl font-bold text-[var(--dark-text-color)]" style="font-family: var(--font-family-heading);">
                ${t.gallery}
              </h2>
            </div>
            
            <div id="dyn-galeria" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              ${galleryHTML}
            </div>
          </div>
        </section>

        <sts-footer logo="../../assets/stsLOGO.png"></sts-footer>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

// Copy & Adapt clean URLs for hub and subpages
function buildCleanPages() {
  const pageMappings = [
    // Hubs
    { src: 'es/pages/rutas.html', dests: ['es/rutas/index.html'] },
    { src: 'en/pages/rutas.html', dests: ['en/routes/index.html'] },
    { src: 'por/pages/rutas.html', dests: ['pt/rotas/index.html', 'por/rotas/index.html'] },

    // Services
    { src: 'es/pages/servicios.html', dests: ['es/servicios/index.html'] },
    { src: 'en/pages/servicios.html', dests: ['en/services/index.html'] },
    { src: 'por/pages/servicios.html', dests: ['pt/servicos/index.html', 'por/servicos/index.html'] },

    // About
    { src: 'es/pages/nosotros.html', dests: ['es/nosotros/index.html'] },
    { src: 'en/pages/nosotros.html', dests: ['en/about/index.html'] },
    { src: 'por/pages/nosotros.html', dests: ['pt/sobre-nos/index.html', 'por/sobre-nos/index.html'] },

    // Contact
    { src: 'es/pages/contacto.html', dests: ['es/contacto/index.html'] },
    { src: 'en/pages/contacto.html', dests: ['en/contact/index.html'] },
    { src: 'por/pages/contacto.html', dests: ['pt/contato/index.html', 'por/contato/index.html'] },

    // Home /pt/
    { src: 'por/index.html', dests: ['pt/index.html'] }
  ];

  pageMappings.forEach(mapping => {
    const srcPath = path.join(ROOT_DIR, mapping.src);
    if (!fs.existsSync(srcPath)) return;
    const content = fs.readFileSync(srcPath, 'utf8');

    mapping.dests.forEach(dest => {
      const destPath = path.join(ROOT_DIR, dest);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, content, 'utf8');
      console.log(`✓ Synchronized ${dest}`);
    });
  });
}

// Build function
async function build() {
  console.log('Generating Programmatic SEO Pages & Sitemap...');

  // 1. Build route static pages for each language
  ['es', 'en', 'pt'].forEach(lang => {
    const rutas = routesByLang[lang];
    const prefix = routeUrlPrefix[lang]; // e.g. /es/rutas
    const prefixSegments = prefix.split('/').filter(Boolean);

    rutas.forEach(ruta => {
      const routeDir = path.join(ROOT_DIR, ...prefixSegments, ruta.id);
      fs.mkdirSync(routeDir, { recursive: true });

      const html = generateRoutePageHTML(ruta, lang);
      fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');

      // Also create alias under /por/rotas/... for PT
      if (lang === 'pt') {
        const porDir = path.join(ROOT_DIR, 'por', 'rotas', ruta.id);
        fs.mkdirSync(porDir, { recursive: true });
        fs.writeFileSync(path.join(porDir, 'index.html'), html, 'utf8');
      }

      console.log(`✓ Generated ${prefix}/${ruta.id}/index.html`);
    });
  });

  // 2. Synchronize clean directory hubs
  buildCleanPages();

  // 3. Generate Sitemap.xml
  const siteUrls = [
    {
      loc: { es: '/es/', en: '/en/', pt: '/pt/' },
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: { es: '/es/rutas/', en: '/en/routes/', pt: '/pt/rotas/' },
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      loc: { es: '/es/servicios/', en: '/en/services/', pt: '/pt/servicos/' },
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: { es: '/es/nosotros/', en: '/en/about/', pt: '/pt/sobre-nos/' },
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      loc: { es: '/es/contacto/', en: '/en/contact/', pt: '/pt/contato/' },
      changefreq: 'monthly',
      priority: '0.8'
    }
  ];

  // Add all routes to sitemap
  rutasES.forEach(ruta => {
    siteUrls.push({
      loc: {
        es: `/es/rutas/${ruta.id}/`,
        en: `/en/routes/${ruta.id}/`,
        pt: `/pt/rotas/${ruta.id}/`
      },
      changefreq: 'weekly',
      priority: '0.9'
    });
  });

  let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  siteUrls.forEach(item => {
    ['es', 'en', 'pt'].forEach(lang => {
      const url = `${BASE_URL}${item.loc[lang]}`;
      const esUrl = `${BASE_URL}${item.loc.es}`;
      const enUrl = `${BASE_URL}${item.loc.en}`;
      const ptUrl = `${BASE_URL}${item.loc.pt}`;

      sitemapXML += `  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="pt" href="${ptUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>
`;
    });
  });

  sitemapXML += `</urlset>\n`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXML, 'utf8');
  console.log(`✓ Generated sitemap.xml with ${siteUrls.length * 3} localized URLs`);
}

build().catch(err => {
  console.error('Error during SEO build:', err);
  process.exit(1);
});
