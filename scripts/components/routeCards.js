(function () {
  const getLangFromPath = (path) => {
    const p = path.toLowerCase();
    if (p.includes('/en/') || p.endsWith('/en')) return 'en';
    if (p.includes('/por/') || p.includes('/pt/') || p.endsWith('/por') || p.endsWith('/pt')) return 'por';
    return 'es';
  };

  const labels = {
    es: { loading: "Cargando rutas...", error: "No se pudieron cargar las rutas", retry: "Reintentar", from: "Desde", details: "Ver detalles →" },
    en: { loading: "Loading routes...", error: "Could not load routes", retry: "Retry", from: "From", details: "View details →" },
    por: { loading: "Carregando rotas...", error: "Não foi possível carregar as rotas", retry: "Repetir", from: "A partir de", details: "Ver detalhes →" }
  };

  function createRouteCard(ruta, lang) {
    const t = labels[lang] || labels.es;
    const tagsHTML = ruta.tags
      .map(tag => `
        <span class="bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-xs font-medium px-3 py-1 rounded-full">
          ${tag}
        </span>`)
      .join('');

    return `
      <div class="route-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1"
           data-difficulty="${ruta.dificultad}">
        <div class="relative overflow-hidden h-56">
          <img src="${ruta.imagen}" alt="${ruta.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute top-4 left-4">
            <span class="${ruta.badgeColor} text-xs font-bold px-3 py-1 rounded-full">${ruta.badge}</span>
          </div>
          <div class="absolute bottom-4 left-4">
            <span class="${ruta.dificultadColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">${ruta.dificultadLabel}</span>
          </div>
          <div class="absolute bottom-4 right-4 text-white text-right">
            <div class="text-2xl font-bold">${ruta.km}</div>
            <div class="text-xs opacity-80">${ruta.dias}</div>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-[var(--dark-text-color)] mb-2" style="font-family: var(--font-family-heading);">${ruta.nombre}</h3>
          <p class="text-[var(--gray-text-color)] text-sm leading-relaxed mb-4">${ruta.descripcion}</p>
          <div class="flex flex-wrap gap-3 mb-5 text-xs text-[var(--gray-text-color)]">
            <span class="flex items-center gap-1"><i class="fa-solid fa-map-pin text-[var(--primary-color)]"></i>${ruta.inicio}</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-flag-checkered text-[var(--primary-color)]"></i>${ruta.fin}</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-5">${tagsHTML}</div>
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span class="text-[var(--gray-text-color)] text-xs">${t.from}</span>
              <div class="text-[var(--primary-color)] font-bold text-lg">${ruta.precio}</div>
            </div>
            <a href="/${lang}/pages/ruta.html?id=${ruta.id}" class="px-5 py-2.5 bg-[var(--primary-color)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-all duration-300 shadow-md">
              ${t.details}
            </a>
          </div>
        </div>
      </div>
    `;
  }

  async function loadRoutes() {
    const grid = document.getElementById('routes-grid');
    if (!grid) return;

    const lang = getLangFromPath(window.location.pathname);
    const t = labels[lang] || labels.es;

    grid.innerHTML = `
      <div class="col-span-full flex justify-center items-center py-20">
        <div class="text-center">
          <i class="fa-solid fa-route text-4xl text-[var(--primary-color)] animate-pulse mb-4 block"></i>
          <p class="text-[var(--gray-text-color)]">${t.loading}</p>
        </div>
      </div>
    `;

    try {
      const dataLang = lang === 'en' ? 'en' : lang === 'por' ? 'por' : 'es';
      const response = await fetch(`/${dataLang}/data/rutas.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const rutas = await response.json();
      grid.innerHTML = rutas.map(r => createRouteCard(r, lang)).join('');
      document.dispatchEvent(new CustomEvent('routesLoaded', { detail: { total: rutas.length } }));
    } catch (error) {
      console.error('Error cargando rutas:', error);
      grid.innerHTML = `
        <div class="col-span-full text-center py-16">
          <i class="fa-solid fa-triangle-exclamation text-4xl text-red-400 mb-4 block"></i>
          <p class="text-[var(--gray-text-color)] text-lg font-medium">${t.error}</p>
          <button onclick="location.reload()" class="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--primary-button-hover-bg-color)] transition-all">${t.retry}</button>
        </div>
      `;
    }
  }

  document.addEventListener('DOMContentLoaded', loadRoutes);
})();
