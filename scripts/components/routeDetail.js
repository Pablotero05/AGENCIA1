document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const routeId = urlParams.get('id');
  const exp = urlParams.get('exp');
  const isPremium = exp === 'premium';
  
  if (!routeId) {
    window.location.href = '../rutas.html';
    return;
  }

  const getLangFromPath = (path) => {
    const p = path.toLowerCase();
    if (p.includes('/en/') || p.endsWith('/en')) return 'en';
    if (p.includes('/por/') || p.includes('/pt/') || p.endsWith('/por') || p.endsWith('/pt')) return 'por';
    return 'es';
  };

  const lang = getLangFromPath(window.location.pathname);

  // Premium labels
  const premiumLabels = {
    es: { badge: 'Experiencia Premium', includes: 'Incluido en tu experiencia Premium', hotel: 'Hoteles de categoría superior', luggage: 'Transporte de equipaje puerta a puerta', support: 'Asistencia personalizada 24h', dining: 'Restaurantes seleccionados', requestQuote: 'Solicitar Presupuesto Premium', viewStages: 'Ver Etapas' },
    en: { badge: 'Premium Experience', includes: 'Included in your Premium experience', hotel: 'Superior category hotels', luggage: 'Door-to-door luggage transport', support: '24h personalized assistance', dining: 'Selected restaurants', requestQuote: 'Request Premium Quote', viewStages: 'View Stages' },
    por: { badge: 'Experiência Premium', includes: 'Incluído na sua experiência Premium', hotel: 'Hotéis de categoria superior', luggage: 'Transporte de bagagem porta a porta', support: 'Assistência personalizada 24h', dining: 'Restaurantes selecionados', requestQuote: 'Solicitar Orçamento Premium', viewStages: 'Ver Etapas' }
  };
  const pt = premiumLabels[lang] || premiumLabels.es;

  try {
    const dataLang = lang === 'en' ? 'en' : lang === 'por' ? 'por' : 'es';
    
    // Load appropriate data file
    const dataFile = isPremium ? 'rutas-premium.json' : 'rutas.json';
    let ruta = null;

    // Try multiple paths
    const candidates = [
      `/${dataLang}/data/${dataFile}`,
      `/${lang}/data/${dataFile}`,
      `/es/data/${dataFile}`
    ];

    for (const url of candidates) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const rutas = await response.json();
          ruta = rutas.find(r => r.id === routeId);
          if (ruta) break;
        }
      } catch (e) {}
    }

    // Fallback to standard data if premium route not found
    if (!ruta && isPremium) {
      const fallbackCandidates = [
        `/${dataLang}/data/rutas.json`,
        `/${lang}/data/rutas.json`,
        `/es/data/rutas.json`
      ];
      for (const url of fallbackCandidates) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const rutas = await response.json();
            ruta = rutas.find(r => r.id === routeId);
            if (ruta) break;
          }
        } catch (e) {}
      }
    }
    
    if (!ruta) {
      window.location.href = '../rutas.html';
      return;
    }

    // Apply premium theme to body
    if (isPremium) {
      document.body.classList.add('premium-detail-theme');
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
      el.href = `/${lang}/pages/contacto.html?ruta=${ruta.id}${isPremium ? '&exp=premium' : ''}`;
    });

    // Apply premium hero styling
    if (isPremium) {
      // Add premium badge to hero
      const heroSection = document.querySelector('section.relative.min-h-\\[80vh\\]');
      if (heroSection) {
        // Change hero overlay gradient to gold-tinted
        const overlay = heroSection.querySelector('.bg-gradient-to-r');
        if (overlay) {
          overlay.style.background = 'linear-gradient(to right, rgba(15, 10, 5, 0.88), rgba(60, 40, 10, 0.65), transparent)';
        }

        // Style hero info boxes with premium gold
        heroSection.querySelectorAll('.bg-white\\/10').forEach(box => {
          box.style.background = 'rgba(200, 151, 58, 0.12)';
          box.style.borderColor = 'rgba(200, 151, 58, 0.35)';
        });

        // Style accent labels
        heroSection.querySelectorAll('.text-\\[var\\(--accent-color\\)\\]').forEach(el => {
          el.style.color = '#F5C86C';
        });

        // Add premium badge before the title
        const badgeWrap = heroSection.querySelector('.flex.flex-wrap.gap-3.mb-5');
        if (badgeWrap) {
          const premBadge = document.createElement('span');
          premBadge.className = 'premium-hero-badge';
          premBadge.innerHTML = '<i class="fa-solid fa-crown"></i> ' + pt.badge;
          badgeWrap.prepend(premBadge);
        }

        // Style the CTA buttons
        const primaryCta = heroSection.querySelector('.dyn-cta-link');
        if (primaryCta) {
          primaryCta.style.background = 'linear-gradient(135deg, #C8973A, #F5C86C)';
          primaryCta.style.color = '#1A1A2E';
          primaryCta.innerHTML = `<i class="fa-solid fa-crown mr-3"></i> ${pt.requestQuote}`;
        }
      }

      // Style the technical sheet sidebar
      const sidebar = document.querySelector('.lg\\:sticky');
      if (sidebar) {
        const card = sidebar.querySelector('.bg-\\[var\\(--light-background-color\\)\\]');
        if (card) {
          card.style.background = 'linear-gradient(145deg, #1a1510, #2a1f14)';
          card.style.border = '1px solid rgba(200, 151, 58, 0.3)';
          card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(200, 151, 58, 0.15)';

          // Style text colors within sidebar
          card.querySelectorAll('.text-\\[var\\(--dark-text-color\\)\\]').forEach(el => {
            el.style.color = '#F5F0E8';
          });
          card.querySelectorAll('.text-\\[var\\(--gray-text-color\\)\\]').forEach(el => {
            el.style.color = 'rgba(245, 240, 232, 0.6)';
          });
          card.querySelectorAll('.border-gray-200').forEach(el => {
            el.style.borderColor = 'rgba(200, 151, 58, 0.2)';
          });
          card.querySelectorAll('.text-\\[var\\(--primary-color\\)\\]').forEach(el => {
            el.style.color = '#C8973A';
          });
          card.querySelectorAll('.bg-\\[var\\(--primary-color\\)\\]\\/10').forEach(el => {
            el.style.background = 'rgba(200, 151, 58, 0.15)';
          });

          // Style the sidebar title
          const sidebarTitle = card.querySelector('h3');
          if (sidebarTitle) {
            sidebarTitle.style.color = '#F5C86C';
          }

          // Style the CTA button in sidebar
          const sidebarCta = card.querySelector('.dyn-cta-link');
          if (sidebarCta) {
            sidebarCta.style.background = 'linear-gradient(135deg, #C8973A, #F5C86C)';
            sidebarCta.style.color = '#1A1A2E';
            sidebarCta.innerHTML = `<i class="fa-solid fa-crown mr-3"></i> ${pt.requestQuote}`;
          }

          // Add premium includes section before CTA
          const ctaWrap = card.querySelector('.mt-8.pt-6');
          if (ctaWrap) {
            const includesSection = document.createElement('div');
            includesSection.className = 'premium-detail-includes';
            includesSection.innerHTML = `
              <h4><i class="fa-solid fa-gem"></i> ${pt.includes}</h4>
              <ul>
                <li><i class="fa-solid fa-hotel"></i> ${pt.hotel}</li>
                <li><i class="fa-solid fa-suitcase-rolling"></i> ${pt.luggage}</li>
                <li><i class="fa-solid fa-headset"></i> ${pt.support}</li>
                <li><i class="fa-solid fa-utensils"></i> ${pt.dining}</li>
              </ul>
            `;
            ctaWrap.before(includesSection);
          }
        }
      }

      // Style the highlights section
      const highlightsSection = document.querySelector('#dyn-puntos-destacados');
      if (highlightsSection) {
        const highlightBox = highlightsSection.closest('.bg-\\[var\\(--light-background-color\\)\\]');
        if (highlightBox) {
          highlightBox.style.background = 'linear-gradient(135deg, rgba(200, 151, 58, 0.08), rgba(200, 151, 58, 0.03))';
          highlightBox.style.border = '1px solid rgba(200, 151, 58, 0.2)';
        }
      }
    }

    // Description
    const descContainer = document.getElementById('dyn-descripcion-larga');
    if (descContainer && ruta.descripcionLarga) {
      descContainer.innerHTML = ruta.descripcionLarga.map(p => `<p>${p}</p>`).join('');
    }

    // Highlights
    const puntosContainer = document.getElementById('dyn-puntos-destacados');
    if (puntosContainer && ruta.puntosDestacados) {
      const checkColor = isPremium ? '#C8973A' : 'var(--primary-color)';
      puntosContainer.innerHTML = ruta.puntosDestacados.map(p => `
        <li class="flex items-start gap-3 text-[var(--gray-text-color)]">
          <i class="fa-solid fa-check mt-1" style="color: ${checkColor}"></i>
          <span>${p}</span>
        </li>`).join('');
    }

    // Stages
    const etapasContainer = document.getElementById('dyn-etapas-list');
    if (etapasContainer && ruta.etapas) {
      const getDificultadColor = (dif) => {
        if (!dif || dif === '-') return '';
        const d = dif.toLowerCase();
        if (d.includes('baja') || d.includes('baixa') || d.includes('low') || d.includes('fácil') || d.includes('facil') || d.includes('easy')) return 'bg-green-100 text-green-700';
        if (d.includes('media') || d.includes('média') || d.includes('medium') || d.includes('moderado') || d.includes('moderate')) return 'bg-yellow-100 text-yellow-700';
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

      const circleColor = isPremium ? 'background: linear-gradient(135deg, #C8973A, #F5C86C);' : 'background-color: var(--primary-color);';
      const iconColor = isPremium ? '#C8973A' : 'var(--primary-color)';
      const hoverColor = isPremium ? '#C8973A' : 'var(--primary-color)';

      etapasContainer.innerHTML = ruta.etapas.map(etapa => {
        const isArrival = etapa.km === 0 || etapa.km === '0';

        const statsHTML = isArrival
          ? `<span class="flex items-center gap-2 font-semibold" style="color: ${isPremium ? '#C8973A' : 'var(--accent-color)'}"><i class="fa-solid fa-star" style="color: ${isPremium ? '#C8973A' : 'var(--accent-color)'}"></i>${lang === 'en' ? 'Arrival day' : lang === 'por' ? 'Dia de chegada' : 'Día de llegada'}</span>`
          : `
            <span class="flex items-center gap-2 font-medium"><i class="fa-solid fa-route" style="color: ${iconColor}"></i>${formatKm(etapa.km)}</span>
            ${etapa.horas && etapa.horas !== '-' ? `<span class="flex items-center gap-2 font-medium"><i class="fa-solid fa-clock" style="color: ${iconColor}"></i>${formatHoras(etapa.horas)}</span>` : ''}
            ${etapa.desnivel ? `<span class="flex items-center gap-2 font-medium"><i class="fa-solid fa-mountain" style="color: ${iconColor}"></i>${etapa.desnivel}</span>` : ''}
            ${etapa.dificultad && etapa.dificultad !== '-' ? `<span class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${getDificultadColor(etapa.dificultad)}"><i class="fa-solid fa-gauge mr-1"></i>${lang === 'en' ? 'Difficulty' : lang === 'por' ? 'Dificuldade' : 'Dificultad'} ${etapa.dificultad}</span>` : ''}
          `;

        const puntosHTML = etapa.puntosInteres && etapa.puntosInteres.length > 0
          ? `<div class="mt-4 pt-4 border-t ${isPremium ? 'border-amber-200/30' : 'border-gray-200'}">
              <p class="text-xs font-bold uppercase tracking-wide mb-2 flex items-center gap-1" style="color: ${isPremium ? '#C8973A' : 'var(--dark-text-color)'}">
                <i class="fa-solid fa-location-dot" style="color: ${isPremium ? '#C8973A' : 'var(--accent-color)'}"></i> ${lang === 'en' ? 'Points of interest' : lang === 'por' ? 'Pontos de interesse' : 'Puntos de interés'}
              </p>
              <ul class="space-y-1">
                ${etapa.puntosInteres.map(p => `
                  <li class="flex items-start gap-2 text-sm text-[var(--gray-text-color)]">
                    <i class="fa-solid fa-circle-dot mt-1 text-xs flex-shrink-0" style="color: ${iconColor}"></i>
                    <span>${p}</span>
                  </li>`).join('')}
              </ul>
            </div>`
          : '';

        const cardBorder = isPremium ? 'border border-amber-200/20' : 'border border-gray-100';
        const cardBg = isPremium ? 'background: linear-gradient(145deg, rgba(200, 151, 58, 0.04), rgba(255, 255, 255, 1));' : '';

        return `
          <div class="rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 group mb-4 ${cardBorder}" style="background: white; ${cardBg}">
            <div class="flex flex-col md:flex-row md:items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl" style="${circleColor}">${etapa.dia}</div>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-[var(--dark-text-color)] mb-2 transition-colors" style="font-family: var(--font-family-heading);">
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

    // Stages section header — premium gold styling
    if (isPremium) {
      const etapasSection = document.getElementById('etapas');
      if (etapasSection) {
        etapasSection.querySelectorAll('.text-\\[var\\(--accent-color\\)\\]').forEach(el => {
          el.style.color = '#C8973A';
        });
      }
      // Gallery section
      const gallerySection = etapasSection?.nextElementSibling;
      if (gallerySection) {
        gallerySection.querySelectorAll('.text-\\[var\\(--accent-color\\)\\]').forEach(el => {
          el.style.color = '#C8973A';
        });
      }
    }


    // Gallery
    const galeriaContainer = document.getElementById('dyn-galeria');
    if (galeriaContainer && ruta.galeria) {
      galeriaContainer.innerHTML = ruta.galeria.map(img => `
        <div class="aspect-square overflow-hidden rounded-xl group${isPremium ? ' ring-1 ring-amber-200/30' : ''}">
          <img src="${img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        </div>
      `).join('');
    }

  } catch (err) {
    console.error('Error loading route detail', err);
  }
});
