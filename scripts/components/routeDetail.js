document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const routeId = urlParams.get('id');
  
  if (!routeId) {
    window.location.href = '../rutas.html';
    return;
  }

  const getLangFromPath = (path) => {
    if (path.includes('/en/')) return 'en';
    if (path.includes('/por/')) return 'por';
    return 'es';
  };

  const lang = getLangFromPath(window.location.pathname);
  
  try {
    const response = await fetch(`../../${lang}/data/rutas.json`);
    const rutas = await response.json();
    const ruta = rutas.find(r => r.id === routeId);
    
    if (!ruta) {
      window.location.href = '../rutas.html';
      return;
    }

    // Update document title
    document.title = `${ruta.nombre} - Step To Santiago`;
    
    // Fill basic DOM elements
    const setElementsText = (selector, text) => {
      document.querySelectorAll(selector).forEach(el => el.textContent = text);
    };

    setElementsText('.dyn-nombre-ruta', ruta.nombre);
    setElementsText('.dyn-badge-principal', ruta.badge);
    setElementsText('.dyn-nivel-dificultad', ruta.dificultadLabel);
    setElementsText('.dyn-desc-corta', ruta.descripcion);
    setElementsText('.dyn-distancia', ruta.km);
    setElementsText('.dyn-duracion', ruta.dias);
    setElementsText('.dyn-precio', ruta.precio);
    setElementsText('.dyn-inicio', ruta.inicio);
    setElementsText('.dyn-epoca', ruta.epoca);
    setElementsText('.dyn-dificultad-desc', ruta.dificultadDesc);
    
    document.querySelectorAll('.dyn-imagen-hero').forEach(el => {
      if (el.tagName.toLowerCase() === 'img') el.src = ruta.imagenHero;
    });

    // Replace CTA links
    document.querySelectorAll('.dyn-cta-link').forEach(el => {
      el.href = `/${lang}/pages/contacto.html?ruta=${ruta.id}`;
    });

    // Description
    const descContainer = document.getElementById('dyn-descripcion-larga');
    if (descContainer && ruta.descripcionLarga) {
      descContainer.innerHTML = ruta.descripcionLarga.map(p => `<p>${p}</p>`).join('');
    }

    // Highlights
    const puntosContainer = document.getElementById('dyn-puntos-destacados');
    if (puntosContainer && ruta.puntosDestacados) {
      puntosContainer.innerHTML = ruta.puntosDestacados.map(p => `
        <li class="flex items-start gap-3 text-[var(--gray-text-color)]">
          <i class="fa-solid fa-check text-[var(--primary-color)] mt-1"></i>
          <span>${p}</span>
        </li>`).join('');
    }

    // Stages
    const etapasContainer = document.getElementById('dyn-etapas-list');
    if (etapasContainer && ruta.etapas) {
      const getDificultadColor = (dif) => {
        if (!dif || dif === '-') return '';
        const d = dif.toLowerCase();
        if (d === 'baja') return 'bg-green-100 text-green-700';
        if (d === 'media') return 'bg-yellow-100 text-yellow-700';
        if (d === 'alta' || d === 'muy alta') return 'bg-red-100 text-red-700';
        return 'bg-gray-100 text-gray-600';
      };

      etapasContainer.innerHTML = ruta.etapas.map(etapa => {
        const isArrival = etapa.km === 0;

        const statsHTML = isArrival
          ? `<span class="flex items-center gap-2 text-[var(--accent-color)] font-semibold"><i class="fa-solid fa-star text-[var(--accent-color)]"></i>Día de llegada</span>`
          : `
            <span class="flex items-center gap-2"><i class="fa-solid fa-route text-[var(--primary-color)]"></i>${etapa.km} km</span>
            <span class="flex items-center gap-2"><i class="fa-solid fa-clock text-[var(--primary-color)]"></i>${etapa.horas} h</span>
            ${etapa.desnivel ? `<span class="flex items-center gap-2"><i class="fa-solid fa-mountain text-[var(--primary-color)]"></i>${etapa.desnivel}</span>` : ''}
            ${etapa.dificultad && etapa.dificultad !== '-' ? `<span class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${getDificultadColor(etapa.dificultad)}"><i class="fa-solid fa-gauge mr-1"></i>Dificultad ${etapa.dificultad}</span>` : ''}
          `;

        const puntosHTML = etapa.puntosInteres && etapa.puntosInteres.length > 0
          ? `<div class="mt-4 pt-4 border-t border-gray-200">
              <p class="text-xs font-bold text-[var(--dark-text-color)] uppercase tracking-wide mb-2 flex items-center gap-1">
                <i class="fa-solid fa-location-dot text-[var(--accent-color)]"></i> Puntos de interés
              </p>
              <ul class="space-y-1">
                ${etapa.puntosInteres.map(p => `
                  <li class="flex items-start gap-2 text-sm text-[var(--gray-text-color)]">
                    <i class="fa-solid fa-circle-dot text-[var(--primary-color)] mt-1 text-xs flex-shrink-0"></i>
                    <span>${p}</span>
                  </li>`).join('')}
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
      }).join('');
    }


    // Gallery
    const galeriaContainer = document.getElementById('dyn-galeria');
    if (galeriaContainer && ruta.galeria) {
      galeriaContainer.innerHTML = ruta.galeria.map(img => `
        <div class="aspect-square overflow-hidden rounded-xl group">
          <img src="${img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        </div>
      `).join('');
    }

  } catch (err) {
    console.error('Error loading route detail', err);
  }
});
