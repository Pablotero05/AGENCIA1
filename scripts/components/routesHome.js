(function () {
  const getLangFromPath = (path) => {
    const p = path.toLowerCase();
    if (p.includes('/en/') || p.endsWith('/en')) return 'en';
    if (p.includes('/por/') || p.endsWith('/por')) return 'por';
    return 'es';
  };

  const labels = {
    es: {
      from: "Desde",
      viewItinerary: "Ver itinerario",
      notDecided: "¿Aún no has elegido?",
      discoverMore: "Descubre todas nuestras rutas disponibles",
      viewAll: "Ver todas las rutas"
    },
    en: {
      from: "From",
      viewItinerary: "View itinerary",
      notDecided: "Haven't decided yet?",
      discoverMore: "Discover all our available routes",
      viewAll: "View all routes"
    },
    por: {
      from: "A partir de",
      viewItinerary: "Ver itinerário",
      notDecided: "Ainda não decidiu?",
      discoverMore: "Descubra todas as nossas rotas disponíveis",
      viewAll: "Ver todas as rotas"
    }
  };

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    // Clean any non-digit character to get numeric value
    const cleaned = priceStr.replace(/[^\d]/g, '');
    return parseInt(cleaned, 10) || 0;
  };

  const normalizeImagePath = (src) => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    // From homepage (/es/index.html), routes JSON path '../../assets/miniatura-frances.png'
    // should become '../assets/miniatura-frances.png'
    return src.replace(/^\.\.\/\.\.\//, '../');
  };

  const getDifficultyClass = (dificultad) => {
    const diff = (dificultad || '').toLowerCase();
    switch (diff) {
      case 'facil':
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'moderado':
      case 'moderate':
        return 'bg-[var(--accent2-color)]/10 text-[var(--accent2-color)]';
      case 'dificil':
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  async function init() {
    const grid = document.getElementById('routes-home-grid');
    if (!grid) return;

    const lang = getLangFromPath(window.location.pathname);
    const t = labels[lang] || labels.es;

    try {
      const response = await fetch(`/${lang}/data/rutas.json`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const rutas = await response.json();

      // Sort by price: cheaper to more expensive
      rutas.sort((a, b) => parsePrice(a.precio) - parsePrice(b.precio));

      // Limit to max 5 routes
      const selectedRutas = rutas.slice(0, 5);

      let html = '';

      selectedRutas.forEach(ruta => {
        const imagePath = normalizeImagePath(ruta.imagen);
        const difficultyClass = getDifficultyClass(ruta.dificultad);
        const badgeHTML = ruta.badge 
          ? `<div class="absolute top-4 right-4">
               <span class="px-3 py-1 ${ruta.badgeColor || 'bg-[var(--accent-color)] text-white'} text-xs font-bold rounded-full">${ruta.badge}</span>
             </div>` 
          : '';

        html += `
          <div onclick="window.location.href='/${lang}/pages/ruta.html?id=${ruta.id}'"
            class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 flex flex-col justify-between">
            <div>
              <div class="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src="${imagePath}"
                  alt="${ruta.nombre}"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy">
                ${badgeHTML}
              </div>
              <div class="p-6 pb-0">
                <h3 class="text-xl font-bold text-[var(--dark-text-color)] mb-3"
                  style="font-family: var(--font-family-heading);">
                  ${ruta.nombre}
                </h3>
                <div class="flex flex-wrap gap-3 mb-4">
                  <span class="flex items-center gap-1 text-sm text-[var(--gray-text-color)]">
                    <i class="fa-regular fa-clock" aria-hidden="true"></i> ${ruta.dias}
                  </span>
                  <span class="flex items-center gap-1 text-sm text-[var(--gray-text-color)]">
                    <i class="fa-solid fa-road" aria-hidden="true"></i> ${ruta.km}
                  </span>
                  <span
                    class="px-2 py-1 ${difficultyClass} text-xs font-medium rounded-full">${ruta.dificultadLabel}</span>
                </div>
                <p class="text-[var(--gray-text-color)] text-sm mb-4 leading-relaxed line-clamp-3">
                  ${ruta.descripcion}
                </p>
              </div>
            </div>
            <div class="p-6 pt-0 mt-auto">
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span class="text-xs text-[var(--gray-text-color)]">${t.from}</span>
                  <span class="text-xl font-bold text-[var(--primary-color)] ml-1">${ruta.precio}</span>
                </div>
                <a href="/${lang}/pages/ruta.html?id=${ruta.id}"
                  class="text-[var(--accent-color)] font-semibold hover:underline flex items-center gap-1"
                  onclick="event.stopPropagation();">
                  ${t.viewItinerary} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        `;
      });

      // Add the final CTA Card (More Routes / Havent decided yet)
      html += `
        <div
          class="bg-gradient-to-br from-[var(--primary-color)] to-[var(--dark-background-color)] rounded-2xl p-6 flex flex-col items-center justify-center text-center text-white min-h-[350px] justify-between">
          <div class="my-auto flex flex-col items-center justify-center">
            <div class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <i class="fa-solid fa-route text-3xl text-[var(--accent-color)]" aria-hidden="true"></i>
            </div>
            <h3 class="text-xl font-bold mb-3" style="font-family: var(--font-family-heading);">
              ${t.notDecided}
            </h3>
            <p class="text-white/80 text-sm mb-6 max-w-[200px]">
              ${t.discoverMore}
            </p>
          </div>
          <div class="mt-auto w-full">
            <a href="/${lang}/pages/rutas.html"
              class="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-color)] text-[var(--dark-text-color)] font-bold rounded-lg hover:bg-white transition-all duration-300 w-full justify-center">
              ${t.viewAll} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      `;

      grid.innerHTML = html;

    } catch (error) {
      console.error('Error rendering homepage routes:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
