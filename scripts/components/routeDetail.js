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
      etapasContainer.innerHTML = ruta.etapas.map(etapa => `
        <div class="bg-[var(--light-background-color)] rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 group mb-4">
          <div class="flex flex-col md:flex-row md:items-center gap-4">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-bold text-xl">${etapa.dia}</div>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-[var(--dark-text-color)] mb-2 group-hover:text-[var(--primary-color)] transition-colors" style="font-family: var(--font-family-heading);">
                ${etapa.origen} → ${etapa.destino}
              </h3>
              <p class="text-[var(--gray-text-color)] mb-3">${etapa.desc}</p>
              <div class="flex flex-wrap gap-4 text-sm text-[var(--gray-text-color)]">
                <span class="flex items-center gap-2"><i class="fa-solid fa-route text-[var(--primary-color)]"></i>${etapa.km} km</span>
                <span class="flex items-center gap-2"><i class="fa-solid fa-clock text-[var(--primary-color)]"></i>${etapa.horas} h</span>
                <span class="flex items-center gap-2"><i class="fa-solid fa-mountain text-[var(--primary-color)]"></i>${etapa.desnivel}</span>
              </div>
            </div>
          </div>
        </div>
      `).join('');
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
