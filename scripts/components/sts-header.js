// Loader hiperfluido y prefetch instantáneo
(function() {
  if (typeof window !== 'undefined' && document) {
    const logoSrc = '/assets/stsLOGO.webp';
    const loader = document.createElement('div');
    loader.id = 'sts-global-loader';
    loader.innerHTML = `
      <style>
        #sts-global-loader {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 999999;
          background-color: var(--light-background-color, #EFF4F8);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1), visibility 0.2s;
          opacity: 1;
          visibility: visible;
          pointer-events: none;
        }
        #sts-global-loader.hide {
          opacity: 0;
          visibility: hidden;
        }
        .loader-logo {
          width: 220px;
          height: auto;
          object-fit: contain;
          will-change: transform, opacity;
        }
      </style>
      <img src="${logoSrc}" alt="Step To Santiago" class="loader-logo" width="220" height="147" fetchpriority="high" decoding="async" />
    `;
    document.documentElement.appendChild(loader);

    // Ocultar de inmediato en cuanto el DOM esté listo o la ventana cargue
    const hideLoader = () => {
      requestAnimationFrame(() => {
        loader.classList.add('hide');
      });
    };

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      hideLoader();
    } else {
      document.addEventListener('DOMContentLoaded', hideLoader, { once: true });
    }
    window.addEventListener('load', hideLoader, { once: true });

    // Manejar caché bfcache (botón atrás del navegador instantáneo)
    window.addEventListener('pageshow', (e) => {
      hideLoader();
    });

    // ─── INSTANT PREFETCH SYSTEM (0ms Latency Perception) ──────────
    // Precarga automática al hacer hover o focus en cualquier enlace interno
    const prefetchedUrls = new Set();
    const prefetchUrl = (url) => {
      if (!url || prefetchedUrls.has(url)) return;
      try {
        const parsed = new URL(url, window.location.href);
        // Solo enlaces del mismo origen y páginas HTML
        if (parsed.origin !== window.location.origin) return;
        if (parsed.pathname === window.location.pathname) return;

        prefetchedUrls.add(url);
        const linkElem = document.createElement('link');
        linkElem.rel = 'prefetch';
        linkElem.href = url;
        linkElem.as = 'document';
        document.head.appendChild(linkElem);
      } catch (e) {}
    };

    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('javascript:')) {
        prefetchUrl(href);
      }
    }, { passive: true });

    document.addEventListener('touchstart', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('javascript:')) {
        prefetchUrl(href);
      }
    }, { passive: true });

    // Interceptar clics para no bloquear la navegación artificialmente
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      const target = link.getAttribute('target');

      // Ignorar: sin href, anclajes, target _blank, emails, telefonos, js...
      if (!href || href.startsWith('#') || href.includes('#') || target === '_blank' || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        return;
      }

      // Omitir si es un onclick directo en el DOM que hace otra cosa
      if (link.getAttribute('onclick')) {
        return;
      }

      // Navegación fluida e instantánea sin retardo artificial
      // Solo atenuamos suavemente si la navegación tarda más de 80ms
      const slowTimer = setTimeout(() => {
        loader.classList.remove('hide');
      }, 80);

      window.addEventListener('beforeunload', () => {
        clearTimeout(slowTimer);
      }, { once: true });
    });
  }
})();

class StsHeader extends HTMLElement {
  connectedCallback() {
    const currentPath = window.location.pathname;
    const lang = this._getLangFromPath(currentPath);

    const labels = {
      es: {
        rutas: 'Todas las Rutas',
        planificador: 'Planificador',
        servicios: 'Servicios',
        nosotros: 'Sobre Nosotros',
        cta: 'Consigue Tu Presupuesto Gratis',
        logoAlt: 'Step To Santiago - Agencia del Camino de Santiago'
      },
      en: {
        rutas: 'All Routes',
        planificador: 'Planner',
        servicios: 'Services',
        nosotros: 'About Us',
        cta: 'Get Your Free Quote',
        logoAlt: 'Step To Santiago - Camino de Santiago Agency'
      },
      por: {
        rutas: 'Todas as Rotas',
        planificador: 'Planejador',
        servicios: 'Serviços',
        nosotros: 'Sobre Nós',
        cta: 'Consiga Seu Orçamento Grátis',
        logoAlt: 'Step To Santiago - Agência do Caminho de Santiago'
      }
    };

    const t = labels[lang] || labels.es;

    const navLinks = [
      { href: `/${lang}/pages/rutas.html`, label: t.rutas },
      { href: `/${lang}/pages/planificador.html`, label: t.planificador },
      { href: `/${lang}/pages/servicios.html`, label: t.servicios },
      { href: `/${lang}/pages/nosotros.html`, label: t.nosotros },
    ];

    const desktopLinks = navLinks.map(link => {
      const isActive = currentPath.includes(link.href);
      return `
        <a href="${link.href}" class="${isActive
          ? 'text-[var(--primary-color)] font-semibold border-b-2 border-[var(--primary-color)]'
          : 'text-[var(--dark-text-color)] font-semibold hover:text-[var(--primary-color)] transition-colors duration-200'
        }">${link.label}</a>
      `;
    }).join('');

    const mobileLinks = navLinks.map(link => {
      const isActive = currentPath.includes(link.href);
      return `
        <a href="${link.href}" class="${isActive
          ? 'block text-[var(--primary-color)] font-semibold py-3 border-b border-gray-100'
          : 'block text-[var(--dark-text-color)] font-semibold py-3 border-b border-gray-100 hover:text-[var(--primary-color)] transition-colors'
        }">${link.label}</a>
      `;
    }).join('');

    const flags = {
      es: `/assets/flags/es_flag.webp`,
      en: `/assets/flags/en_flag.webp`,
      por: `/assets/flags/por_flag.svg`
    };

    // Pre-calculate lang-switch URLs from current path
    const _buildLangUrl = (targetLang) => {
      const p = currentPath;
      for (const srcLang of ['es', 'en', 'por', 'pt']) {
        if (p.includes(`/${srcLang}/`)) {
          return p.replace(`/${srcLang}/`, `/${targetLang}/`);
        }
      }
      return `/${targetLang}/`;
    };

    const langUrls = {
      es:  _buildLangUrl('es'),
      en:  _buildLangUrl('en'),
      por: _buildLangUrl('por'),
    };

    this.innerHTML = `
      <style>
        .lang-selector-container {
          position: relative;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lang-main-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .lang-main-circle img {
          width: 130%;
          height: 130%;
          object-fit: cover;
        }
        .lang-options {
          position: absolute;
          width: 120px;
          height: 120px;
          top: -35px;
          left: -35px;
          pointer-events: none;
          opacity: 0;
          transform: scale(0.5) rotate(-90deg);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 10;
        }
        .lang-selector-container:hover .lang-options {
          pointer-events: auto;
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .lang-selector-container:hover .lang-main-circle {
          transform: scale(0.85);
          box-shadow: 0 0 0 4px rgba(44, 74, 110, 0.1);
        }
        .lang-sector {
          position: absolute;
          width: 100%;
          height: 100%;
          clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sector-es { transform: rotate(-30deg); }
        .sector-en { transform: rotate(90deg); }
        .sector-por { transform: rotate(210deg); }

        .lang-sector img {
           position: absolute;
           top: 20%;
           right: 20%;
           width: 24px;
           height: 24px;
           border-radius: 50%;
           object-fit: cover;
           transform: rotate(var(--img-rot, 0deg));
           border: 2px solid white;
           box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .sector-es img { --img-rot: 30deg; }
        .sector-en img { --img-rot: -90deg; }
        .sector-por img { --img-rot: -210deg; }

        .lang-sector:hover {
          filter: brightness(1.1);
          z-index: 15;
        }
      </style>
      <header id="global-header" class="bg-[var(--light-background-color)] sticky top-0 z-50 shadow-lg px-0">
        <div class="max-w-7xl mx-auto pl-0 pr-4 sm:pl-0 sm:pr-6 lg:pl-2 lg:pr-8">
          <div class="flex justify-between items-center h-24">

            <a href="/${lang}/index.html" class="flex items-center">
              <img src="${this.getAttribute('logo') || '/assets/ststrasp.webp'}"
                alt="${t.logoAlt}"
                width="288"
                height="192"
                fetchpriority="high"
                decoding="async"
                class="h-48 p-6 w-auto object-contain">
            </a>

            <nav class="hidden lg:flex items-center space-x-8">
              ${desktopLinks}
              <a href="/${lang}/pages/contacto.html"
                class="px-6 py-3 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                ${t.cta}
              </a>

              <!-- Selector Circular "Quesito" -->
              <div class="lang-selector-container" id="lang-selector-desktop">
                <div class="lang-main-circle" id="lang-main-circle">
                  <img src="${flags[lang]}" alt="${lang}" width="40" height="40" decoding="async">
                </div>
                <div class="lang-options" id="lang-options">
                   <a href="${langUrls.es}" class="lang-sector sector-es" aria-label="Español">
                      <img src="${flags.es}" alt="ES" width="24" height="24" decoding="async">
                   </a>
                   <a href="${langUrls.en}" class="lang-sector sector-en" aria-label="English">
                      <img src="${flags.en}" alt="EN" width="24" height="24" decoding="async">
                   </a>
                   <a href="${langUrls.por}" class="lang-sector sector-por" aria-label="Português">
                      <img src="https://flagicons.lipis.dev/flags/4x3/pt.svg" alt="PT" width="24" height="24" decoding="async">
                   </a>
                </div>
              </div>
            </nav>

            <button id="mobile-menu-btn" class="lg:hidden p-2 text-[var(--dark-text-color)] hover:text-[var(--primary-color)]" aria-label="Abrir menú">
              <i class="fa-solid fa-bars text-2xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div id="mobile-menu" class="max-h-0 overflow-hidden lg:hidden bg-white border-t border-[var(--light-border-color)] shadow-xl absolute w-full left-0 transition-all duration-300 ease-in-out">
          <div class="px-4 py-6 space-y-4">
            ${mobileLinks}
            <a href="/${lang}/pages/contacto.html" class="block text-center px-6 py-4 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-all">
              ${t.cta}
            </a>
            <div class="flex justify-center gap-4 py-4 border-t border-gray-100 mt-4">
              <a href="${langUrls.es}" class="w-10 h-10 rounded-full border border-gray-200 overflow-hidden shadow-sm flex items-center justify-center ${lang === 'es' ? 'ring-2 ring-[var(--primary-color)]' : ''}" aria-label="Español">
                <img src="${flags.es}" alt="ES" class="w-full h-full object-cover" width="40" height="40" decoding="async">
              </a>
              <a href="${langUrls.en}" class="w-10 h-10 rounded-full border border-gray-200 overflow-hidden shadow-sm flex items-center justify-center ${lang === 'en' ? 'ring-2 ring-[var(--primary-color)]' : ''}" aria-label="English">
                <img src="${flags.en}" alt="EN" class="w-full h-full object-cover" width="40" height="40" decoding="async">
              </a>
              <a href="${langUrls.por}" class="w-10 h-10 rounded-full border border-gray-200 overflow-hidden shadow-sm flex items-center justify-center ${lang === 'por' ? 'ring-2 ring-[var(--primary-color)]' : ''}" aria-label="Português">
                <img src="https://flagicons.lipis.dev/flags/4x3/pt.svg" alt="PT" class="w-full h-full object-cover" width="40" height="40" decoding="async">
              </a>
            </div>
          </div>
        </div>
      </header>
    `;

    this._initMobileMenu();
    this._initLangSelector();
    this._updateRouteCounts(lang, assetPrefix);
  }

  async _updateRouteCounts(lang, assetPrefix) {
    try {
      const response = await fetch(`${assetPrefix}${lang}/data/rutas.json`);
      if (!response.ok) return;
      const rutas = await response.json();
      document.querySelectorAll('[data-route-count]').forEach(el => {
        el.textContent = rutas.length;
      });
    } catch(e) {
      console.error('Error fetching route count:', e);
    }
  }

  _getLangFromPath(path) {
    if (path.includes('/en/')) return 'en';
    if (path.includes('/por/')) return 'por';
    return 'es';
  }

  _initMobileMenu() {
    const btn = this.querySelector('#mobile-menu-btn');
    const menu = this.querySelector('#mobile-menu');
    const icon = btn?.querySelector('i');

    if (!btn || !menu) return;

    let isOpen = false;

    btn.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        menu.style.maxHeight = menu.scrollHeight + 'px';
        icon?.classList.replace('fa-bars', 'fa-xmark');
      } else {
        menu.style.maxHeight = '0';
        icon?.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }

  _initLangSelector() {
    const container = this.querySelector('#lang-selector-desktop');
    const options = this.querySelector('#lang-options');
    if (!container || !options) return;

    let isOpen = false;
    let closeTimeout = null;

    const openMenu = () => {
      clearTimeout(closeTimeout);
      if (!isOpen) {
        isOpen = true;
        options.style.pointerEvents = 'auto';
        options.style.opacity = '1';
        options.style.transform = 'scale(1) rotate(0deg)';
      }
    };

    const closeMenu = () => {
      closeTimeout = setTimeout(() => {
        isOpen = false;
        options.style.pointerEvents = 'none';
        options.style.opacity = '0';
        options.style.transform = 'scale(0.5) rotate(-90deg)';
      }, 150);
    };

    container.addEventListener('mouseenter', openMenu);
    container.addEventListener('mouseleave', closeMenu);
    options.addEventListener('mouseenter', openMenu);
    options.addEventListener('mouseleave', closeMenu);

    const circle = this.querySelector('#lang-main-circle');
    if (circle) {
      circle.addEventListener('click', (e) => {
        if (isOpen) {
          closeMenu();
        } else {
          e.stopPropagation();
          openMenu();
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        closeMenu();
      }
    });
  }
}

customElements.define('sts-header', StsHeader);
