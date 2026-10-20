/* sts-exp-v2 */
(function () {
  const getLangFromPath = (path) => {
    const p = path.toLowerCase();
    if (p.includes('/en/') || p.endsWith('/en')) return 'en';
    if (p.includes('/por/') || p.includes('/pt/') || p.endsWith('/por') || p.endsWith('/pt')) return 'por';
    return 'es';
  };

  const labels = {
    es: { loading: "Cargando rutas...", error: "No se pudieron cargar las rutas", retry: "Reintentar", from: "Desde", details: "Ver detalles →", adventure: "Adventure", premium: "Premium", premiumIncludes: "Incluido Premium", hotel: "Hoteles seleccionados", luggage: "Traslado de mochilas", support: "Asistencia 24h" },
    en: { loading: "Loading routes...", error: "Could not load routes", retry: "Retry", from: "From", details: "View details →", adventure: "Adventure", premium: "Premium", premiumIncludes: "Premium Includes", hotel: "Selected hotels", luggage: "Luggage transfer", support: "24h assistance" },
    por: { loading: "Carregando rotas...", error: "Não foi possível carregar as rotas", retry: "Repetir", from: "A partir de", details: "Ver detalhes →", adventure: "Adventure", premium: "Premium", premiumIncludes: "Incluído Premium", hotel: "Hotéis selecionados", luggage: "Transporte de bagagem", support: "Assistência 24h" }
  };

  const EXPERIENCES = ['adventure', 'premium'];

  let allRoutes = null;
  let premiumRoutes = null;
  let pendingExp = null;
  const lang = getLangFromPath(window.location.pathname);
  const t = labels[lang] || labels.es;
  const root = document.documentElement;

  /* ── ADVENTURE CARD (standard) ─────────────────────────────────────── */
  function createAdventureCard(ruta) {
    const tagsHTML = ruta.tags
      .map(tag => `
        <span class="bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-xs font-medium px-3 py-1 rounded-full">
          ${tag}
        </span>`)
      .join('');

    return `
      <div class="route-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1"
           data-difficulty="${ruta.dificultad}" data-experience="adventure">
        <div class="relative overflow-hidden h-56">
          <img src="${ruta.imagen}" alt="${ruta.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute top-4 left-4">
            <span class="${ruta.badgeColor} text-xs font-bold px-3 py-1 rounded-full">${ruta.badge}</span>
          </div>
          <div class="absolute top-4 right-4"><span class="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">${t.adventure}</span></div>
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
            <a href="/${lang}/pages/ruta.html?id=${ruta.id}&exp=adventure" class="px-5 py-2.5 bg-[var(--primary-color)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-all duration-300 shadow-md">
              ${t.details}
            </a>
          </div>
        </div>
      </div>
    `;
  }

  /* ── PREMIUM CARD (luxurious design) ───────────────────────────────── */
  function createPremiumCard(ruta) {
    const tagsHTML = ruta.tags
      .map(tag => `
        <span class="premium-card-tag">
          ${tag}
        </span>`)
      .join('');

    return `
      <div class="route-card premium-card"
           data-difficulty="${ruta.dificultad}" data-experience="premium">
        <div class="premium-card-shine"></div>
        <div class="relative overflow-hidden h-64 premium-card-img-wrap">
          <img src="${ruta.imagen}" alt="${ruta.nombre}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">
          <div class="absolute inset-0 premium-card-img-overlay"></div>
          <div class="absolute top-4 left-4">
            <span class="${ruta.badgeColor} text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">${ruta.badge}</span>
          </div>
          <div class="absolute top-4 right-4">
            <span class="premium-badge-pill">
              <i class="fa-solid fa-crown"></i> ${t.premium}
            </span>
          </div>
          <div class="absolute bottom-4 left-4">
            <span class="${ruta.dificultadColor} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg">${ruta.dificultadLabel}</span>
          </div>
          <div class="absolute bottom-4 right-4 text-white text-right">
            <div class="text-2xl font-bold drop-shadow-lg">${ruta.km}</div>
            <div class="text-xs opacity-90">${ruta.dias}</div>
          </div>
        </div>
        <div class="premium-card-body">
          <h3 class="text-xl font-bold mb-2 premium-card-title" style="font-family: var(--font-family-heading);">${ruta.nombre}</h3>
          <p class="text-sm leading-relaxed mb-4 premium-card-desc">${ruta.descripcion}</p>
          <div class="flex flex-wrap gap-3 mb-4 text-xs premium-card-meta">
            <span class="flex items-center gap-1"><i class="fa-solid fa-map-pin premium-card-icon"></i>${ruta.inicio}</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-flag-checkered premium-card-icon"></i>${ruta.fin}</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">${tagsHTML}</div>
          <div class="premium-card-includes">
            <div class="premium-card-includes-row"><i class="fa-solid fa-hotel"></i> ${t.hotel}</div>
            <div class="premium-card-includes-row"><i class="fa-solid fa-suitcase-rolling"></i> ${t.luggage}</div>
            <div class="premium-card-includes-row"><i class="fa-solid fa-headset"></i> ${t.support}</div>
          </div>
          <div class="flex items-center justify-between pt-5 premium-card-footer">
            <div>
              <span class="text-xs premium-card-from">${t.from}</span>
              <div class="premium-card-price">${ruta.precio}</div>
            </div>
            <a href="/${lang}/pages/ruta.html?id=${ruta.id}&exp=premium" class="premium-card-cta">
              ${t.details}
            </a>
          </div>
        </div>
      </div>
    `;
  }

  const ribbonData = {
    es: {
      badge: '<i class="fa-solid fa-crown"></i> Colección Exclusiva',
      title: 'Rutas Premium del Camino de Santiago',
      desc: 'Hoteles seleccionados de máxima categoría, traslado de equipajes puerta a puerta y atención personalizada 24h para una peregrinación de excelencia.'
    },
    en: {
      badge: '<i class="fa-solid fa-crown"></i> Exclusive Collection',
      title: 'Premium Camino de Santiago Routes',
      desc: 'Selected superior category hotels, door-to-door luggage transport, and 24h personalized assistance for an extraordinary pilgrimage experience.'
    },
    por: {
      badge: '<i class="fa-solid fa-crown"></i> Coleção Exclusiva',
      title: 'Rotas Premium do Caminho de Santiago',
      desc: 'Hotéis selecionados de categoria superior, transporte de bagagem porta a porta e atendimento personalizado 24h para uma experiência inesquecível.'
    }
  };

  function updatePremiumRibbon(exp) {
    const existing = document.getElementById('premium-collection-ribbon');
    if (exp === 'premium') {
      if (!existing) {
        const grid = document.getElementById('routes-grid');
        if (grid && grid.parentElement) {
          const r = ribbonData[lang] || ribbonData.es;
          const ribbon = document.createElement('div');
          ribbon.id = 'premium-collection-ribbon';
          ribbon.className = 'premium-collection-ribbon';
          ribbon.innerHTML = `
            <div class="badge-tag">${r.badge}</div>
            <h2>${r.title}</h2>
            <p>${r.desc}</p>
          `;
          grid.parentElement.insertBefore(ribbon, grid);
        }
      } else {
        existing.style.display = '';
      }
    } else if (existing) {
      existing.style.display = 'none';
    }
  }

  function renderGrid(exp) {
    const grid = document.getElementById('routes-grid');
    if (!grid) return;

    if (exp === 'premium' && premiumRoutes) {
      grid.innerHTML = premiumRoutes.map(r => createPremiumCard(r)).join('');
      document.dispatchEvent(new CustomEvent('routesLoaded', { detail: { total: premiumRoutes.length, experience: exp } }));
    } else if (allRoutes) {
      grid.innerHTML = allRoutes.map(r => createAdventureCard(r)).join('');
      document.dispatchEvent(new CustomEvent('routesLoaded', { detail: { total: allRoutes.length, experience: exp } }));
    }
  }

  function setUrlExp(exp, push) {
    try {
      const url = new URL(window.location.href);
      if (exp) url.searchParams.set('exp', exp); else url.searchParams.delete('exp');
      history[push ? 'pushState' : 'replaceState']({ exp: exp || null }, '', url.toString());
    } catch (e) {}
  }

  function selectExperience(exp, opts) {
    const push = !(opts && opts.fromHistory);
    if (!EXPERIENCES.includes(exp)) return;
    const selector = document.getElementById('experience-selector');
    const wrapper = document.getElementById('routes-list-wrapper');
    if (selector) selector.style.display = 'none';
    if (wrapper) wrapper.style.display = '';
    document.querySelectorAll('[data-exp-label]').forEach(el => {
      el.innerHTML = exp === 'premium' ? '<i class="fa-solid fa-crown text-amber-400 mr-1.5"></i> Premium' : t[exp];
    });
    root.classList.remove('exp-select-mode');

    // Apply premium theme class to wrapper
    if (wrapper) {
      wrapper.classList.toggle('premium-theme', exp === 'premium');
    }

    updatePremiumRibbon(exp);
    renderGrid(exp);
    if (push) setUrlExp(exp, true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function resetExperience(opts) {
    const push = !(opts && opts.fromHistory);
    const selector = document.getElementById('experience-selector');
    const wrapper = document.getElementById('routes-list-wrapper');
    if (wrapper) {
      wrapper.style.display = 'none';
      wrapper.classList.remove('premium-theme');
    }
    updatePremiumRibbon(null);
    if (selector) selector.style.display = '';
    root.classList.add('exp-select-mode');
    if (push) setUrlExp(null, true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  async function loadRoutes() {
    const grid = document.getElementById('routes-grid');
    if (!grid) return;

    grid.innerHTML = `
      <div class="col-span-full flex justify-center items-center py-20">
        <div class="text-center">
          <i class="fa-solid fa-route text-4xl text-[var(--primary-color)] animate-pulse mb-4 block"></i>
          <p class="text-[var(--gray-text-color)]">${t.loading}</p>
        </div>
      </div>
    `;

    try {
      const dataLang = lang === 'en' ? 'en' : (lang === 'por' || lang === 'pt') ? 'por' : 'es';

      // Load standard routes
      const candidates = [
        `/${lang}/data/rutas.json`,
        `/${dataLang}/data/rutas.json`,
        `/es/data/rutas.json`
      ];

      let rutas = null;
      for (const url of candidates) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            rutas = await res.json();
            if (Array.isArray(rutas) && rutas.length > 0) break;
          }
        } catch (e) {}
      }

      if (!rutas) throw new Error('No se pudo cargar rutas.json desde ninguna ruta');
      allRoutes = rutas;

      // Load premium routes
      const premCandidates = [
        `/${lang}/data/rutas-premium.json`,
        `/${dataLang}/data/rutas-premium.json`,
        `/es/data/rutas-premium.json`
      ];

      for (const url of premCandidates) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const pr = await res.json();
            if (Array.isArray(pr) && pr.length > 0) { premiumRoutes = pr; break; }
          }
        } catch (e) {}
      }

      if (pendingExp) { const p = pendingExp; pendingExp = null; selectExperience(p); return; }

      if (!document.getElementById('experience-selector')) {
        renderGrid(null);
        return;
      }
      const wanted = new URLSearchParams(window.location.search).get('exp');
      if (EXPERIENCES.includes(wanted)) selectExperience(wanted, { fromHistory: true });
      else root.classList.add('exp-select-mode');
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

  window.stsSelectExperience = function (exp) {
    if (allRoutes) selectExperience(exp);
    else pendingExp = exp;
  };
  window.stsResetExperience = () => resetExperience();
  window.addEventListener('popstate', () => {
    if (!allRoutes || !document.getElementById('experience-selector')) return;
    const exp = new URLSearchParams(window.location.search).get('exp');
    if (EXPERIENCES.includes(exp)) selectExperience(exp, { fromHistory: true });
    else resetExperience({ fromHistory: true });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadRoutes);
  } else {
    loadRoutes();
  }
})();
