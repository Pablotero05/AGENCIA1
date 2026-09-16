/**
 * StepToSantiago — Cookie Consent & Google Consent Mode v2 Manager
 * ===============================================================
 * RGPD (UE 2016/679), LOPDGDD (3/2018), LSSI-CE (34/2002) y Directrices AEPD.
 *
 * Características:
 * 1. Inicialización inmediata de Google Consent Mode v2 en estado 'denied'
 * 2. Banner de primera capa con botones equiprobables (Aceptar, Rechazar, Configurar)
 * 3. Modal de segunda capa con selección granular de categorías
 * 4. Persistencia en localStorage con timestamp y versión de política
 * 5. Evento personalizado 'sts_consent_updated' para reactividad
 * 6. Soporte multilingüe automático (es, en, por/pt)
 * 7. API pública: window.stsOpenCookieSettings() y window.stsGetConsent()
 */

(function () {
  'use strict';

  var CONSENT_STORAGE_KEY = 'sts_cookie_consent';
  var CONSENT_VERSION = '2026.1';
  var EXPIRATION_DAYS = 365;

  // ─── 1. GOOGLE CONSENT MODE v2: DEFAULT DENIED ─────────────────────────────
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  // Comprobar si ya existe consentimiento guardado
  var storedConsent = null;
  try {
    var raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      // Validar caducidad y versión
      var now = Date.now();
      if (parsed.timestamp && (now - parsed.timestamp < EXPIRATION_DAYS * 24 * 60 * 60 * 1000) && parsed.version === CONSENT_VERSION) {
        storedConsent = parsed.preferences;
      }
    }
  } catch (e) {
    storedConsent = null;
  }

  if (storedConsent) {
    // Aplicar estado previo guardado
    gtag('consent', 'default', {
      'analytics_storage': storedConsent.analytics ? 'granted' : 'denied',
      'ad_storage': storedConsent.marketing ? 'granted' : 'denied',
      'ad_user_data': storedConsent.marketing ? 'granted' : 'denied',
      'ad_personalization_signals': storedConsent.marketing ? 'granted' : 'denied',
      'functionality_storage': storedConsent.functional ? 'granted' : 'denied',
      'personalization_storage': storedConsent.functional ? 'granted' : 'denied',
      'security_storage': 'granted'
    });
  } else {
    // Estado inicial por defecto: estricto DENIED
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization_signals': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted',
      'wait_for_update': 500
    });
  }

  // ─── 2. TEXTOS MULTIIDIOMA ─────────────────────────────────────────────────
  function getLang() {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf('/en/') !== -1) return 'en';
    if (path.indexOf('/por/') !== -1 || path.indexOf('/pt/') !== -1) return 'por';
    return 'es';
  }

  var I18N = {
    es: {
      bannerTitle: 'Valoramos tu privacidad',
      bannerText: 'Utilizamos cookies propias y de terceros para garantizar el correcto funcionamiento del sitio web, analizar nuestros servicios y mostrarte publicidad personalizada en base a un perfil elaborado a partir de tus hábitos de navegación.',
      moreInfo: 'Más información en nuestra',
      cookiePolicy: 'Política de Cookies',
      policyLink: '/es/pages/cookies.html',
      acceptAll: 'Aceptar todas',
      rejectAll: 'Rechazar todas',
      customize: 'Configurar cookies',
      savePrefs: 'Guardar preferencias',
      close: 'Cerrar',
      modalTitle: 'Centro de Preferencias de Privacidad',
      modalSubtitle: 'Puedes configurar o rechazar la instalación de cookies según su finalidad.',
      catTechnicalTitle: 'Cookies Técnicas y Obligatorias',
      catTechnicalBadge: 'Siempre activas',
      catTechnicalDesc: 'Son estrictamente necesarias para el funcionamiento del sitio web, la seguridad, la gestión de la sesión y el almacenamiento de tus preferencias de privacidad. No pueden desactivarse.',
      catAnalyticsTitle: 'Cookies de Rendimiento y Analítica',
      catAnalyticsDesc: 'Nos permiten medir el número de visitas, fuentes de tráfico y comportamiento de navegación para cuantificar y mejorar el rendimiento de nuestra web de forma agregada y anónima (Google Analytics 4).',
      catMarketingTitle: 'Cookies de Publicidad y Marketing',
      catMarketingDesc: 'Se utilizan para rastrear a los visitantes en los sitios web y mostrar anuncios relevantes, adaptados a tus intereses y medir la eficacia de nuestras campañas publicitarias.',
      catFunctionalTitle: 'Cookies de Personalización y Funcionalidad',
      catFunctionalDesc: 'Permiten recordar información para que accedas al servicio con determinadas características personalizadas (como tu idioma preferido o la configuración de tu región).',
      floatingBtnText: 'Gestionar cookies'
    },
    en: {
      bannerTitle: 'We value your privacy',
      bannerText: 'We use our own and third-party cookies to ensure the website functions properly, analyze our services, and display personalized advertising based on your browsing habits and profile.',
      moreInfo: 'More information in our',
      cookiePolicy: 'Cookie Policy',
      policyLink: '/en/pages/cookies.html',
      acceptAll: 'Accept all',
      rejectAll: 'Reject all',
      customize: 'Cookie Settings',
      savePrefs: 'Save preferences',
      close: 'Close',
      modalTitle: 'Privacy Preference Center',
      modalSubtitle: 'You can configure or reject the installation of cookies according to their purpose.',
      catTechnicalTitle: 'Technical & Strictly Necessary Cookies',
      catTechnicalBadge: 'Always active',
      catTechnicalDesc: 'Essential for website operation, security, session management, and storing your privacy preferences. They cannot be disabled.',
      catAnalyticsTitle: 'Performance & Analytics Cookies',
      catAnalyticsDesc: 'Allow us to measure visitor counts, traffic sources, and browsing behavior to analyze and improve website performance anonymously (Google Analytics 4).',
      catMarketingTitle: 'Advertising & Marketing Cookies',
      catMarketingDesc: 'Used to track visitors across websites in order to display relevant advertisements tailored to your interests and evaluate campaign effectiveness.',
      catFunctionalTitle: 'Functional & Personalization Cookies',
      catFunctionalDesc: 'Enable the website to remember choices you make (such as your preferred language or region) to provide enhanced, personalized features.',
      floatingBtnText: 'Manage cookies'
    },
    por: {
      bannerTitle: 'Valorizamos a sua privacidade',
      bannerText: 'Utilizamos cookies próprios e de terceiros para garantir o funcionamento correto do website, analisar os nossos serviços e apresentar publicidade personalizada com base nos seus hábitos de navegação.',
      moreInfo: 'Mais informações na nossa',
      cookiePolicy: 'Política de Cookies',
      policyLink: '/por/pages/cookies.html',
      acceptAll: 'Aceitar todas',
      rejectAll: 'Rejeitar todas',
      customize: 'Configurar cookies',
      savePrefs: 'Guardar preferências',
      close: 'Fechar',
      modalTitle: 'Centro de Preferências de Privacidade',
      modalSubtitle: 'Pode configurar ou rejeitar a instalação de cookies de acordo com a sua finalidade.',
      catTechnicalTitle: 'Cookies Técnicos e Obrigatórios',
      catTechnicalBadge: 'Sempre ativos',
      catTechnicalDesc: 'Estritamente necessários para o funcionamento do website, segurança, gestão de sessão e registo das suas preferências de privacidade. Não podem ser desativados.',
      catAnalyticsTitle: 'Cookies de Desempenho e Analítica',
      catAnalyticsDesc: 'Permitem medir o número de visitas, fontes de tráfego e comportamento de navegação para quantificar e melhorar o desempenho do site de forma agregada (Google Analytics 4).',
      catMarketingTitle: 'Cookies de Publicidade e Marketing',
      catMarketingDesc: 'Utilizados para rastrear visitantes em websites a fim de apresentar anúncios relevantes adaptados aos seus interesses e avaliar a eficácia das campanhas.',
      catFunctionalTitle: 'Cookies de Personalização e Funcionalidade',
      catFunctionalDesc: 'Permitem recordar informações para que possa aceder ao serviço com características personalizadas (como o seu idioma preferido ou região).',
      floatingBtnText: 'Gerir cookies'
    }
  };

  // ─── 3. LÓGICA DE CONSENTIMIENTO Y EVENTOS ─────────────────────────────────
  function saveConsent(preferences) {
    var data = {
      version: CONSENT_VERSION,
      timestamp: Date.now(),
      preferences: {
        technical: true,
        analytics: !!preferences.analytics,
        marketing: !!preferences.marketing,
        functional: !!preferences.functional
      }
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}

    // Actualizar Google Consent Mode v2
    gtag('consent', 'update', {
      'analytics_storage': data.preferences.analytics ? 'granted' : 'denied',
      'ad_storage': data.preferences.marketing ? 'granted' : 'denied',
      'ad_user_data': data.preferences.marketing ? 'granted' : 'denied',
      'ad_personalization_signals': data.preferences.marketing ? 'granted' : 'denied',
      'functionality_storage': data.preferences.functional ? 'granted' : 'denied',
      'personalization_storage': data.preferences.functional ? 'granted' : 'denied'
    });

    // Despachar evento global reactivo
    window.dispatchEvent(new CustomEvent('sts_consent_updated', {
      detail: data.preferences
    }));

    closeBanner();
    closeModal();
  }

  function getSavedPreferences() {
    try {
      var raw = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed.preferences) return parsed.preferences;
      }
    } catch (e) {}
    return {
      technical: true,
      analytics: false,
      marketing: false,
      functional: false
    };
  }

  // ─── 4. RENDERIZADO UI (BANNER Y MODAL) ────────────────────────────────────
  function createElements() {
    if (document.getElementById('sts-cookie-wrapper')) return;

    var lang = getLang();
    var t = I18N[lang] || I18N.es;

    var wrapper = document.createElement('div');
    wrapper.id = 'sts-cookie-wrapper';
    wrapper.innerHTML = `
      <!-- Banner Capa 1 -->
      <div id="sts-cookie-banner" class="sts-cookie-banner" role="region" aria-label="Consentimiento de cookies" style="display: none;">
        <div class="sts-cookie-banner-content">
          <div class="sts-cookie-banner-text">
            <h3 class="sts-cookie-banner-title">
              <i class="fa-solid fa-cookie-bite text-[var(--accent-color)] mr-2" aria-hidden="true"></i>${t.bannerTitle}
            </h3>
            <p>
              ${t.bannerText} ${t.moreInfo} <a href="${t.policyLink}" class="sts-cookie-policy-link">${t.cookiePolicy}</a>.
            </p>
          </div>
          <div class="sts-cookie-banner-actions">
            <button type="button" id="sts-btn-reject-all" class="sts-btn sts-btn-secondary">${t.rejectAll}</button>
            <button type="button" id="sts-btn-customize" class="sts-btn sts-btn-outline">${t.customize}</button>
            <button type="button" id="sts-btn-accept-all" class="sts-btn sts-btn-primary">${t.acceptAll}</button>
          </div>
        </div>
      </div>

      <!-- Modal Capa 2 (Preferencias Granulares) -->
      <div id="sts-cookie-modal" class="sts-cookie-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="sts-modal-title" style="display: none;">
        <div class="sts-cookie-modal-container">
          <div class="sts-cookie-modal-header">
            <div>
              <h2 id="sts-modal-title" class="sts-cookie-modal-title">
                <i class="fa-solid fa-sliders text-[var(--accent-color)] mr-2" aria-hidden="true"></i>${t.modalTitle}
              </h2>
              <p class="sts-cookie-modal-subtitle">${t.modalSubtitle}</p>
            </div>
            <button type="button" id="sts-modal-close" class="sts-cookie-modal-close" aria-label="${t.close}">&times;</button>
          </div>

          <div class="sts-cookie-modal-body">
            <!-- Categoría 1: Técnicas -->
            <div class="sts-cookie-category">
              <div class="sts-cookie-cat-header">
                <div class="sts-cookie-cat-info">
                  <span class="sts-cookie-cat-name">${t.catTechnicalTitle}</span>
                  <span class="sts-badge-required">${t.catTechnicalBadge}</span>
                </div>
                <label class="sts-toggle">
                  <input type="checkbox" checked disabled>
                  <span class="sts-toggle-slider disabled"></span>
                </label>
              </div>
              <p class="sts-cookie-cat-desc">${t.catTechnicalDesc}</p>
            </div>

            <!-- Categoría 2: Analítica -->
            <div class="sts-cookie-category">
              <div class="sts-cookie-cat-header">
                <div class="sts-cookie-cat-info">
                  <span class="sts-cookie-cat-name">${t.catAnalyticsTitle}</span>
                </div>
                <label class="sts-toggle">
                  <input type="checkbox" id="sts-toggle-analytics">
                  <span class="sts-toggle-slider"></span>
                </label>
              </div>
              <p class="sts-cookie-cat-desc">${t.catAnalyticsDesc}</p>
            </div>

            <!-- Categoría 3: Marketing -->
            <div class="sts-cookie-category">
              <div class="sts-cookie-cat-header">
                <div class="sts-cookie-cat-info">
                  <span class="sts-cookie-cat-name">${t.catMarketingTitle}</span>
                </div>
                <label class="sts-toggle">
                  <input type="checkbox" id="sts-toggle-marketing">
                  <span class="sts-toggle-slider"></span>
                </label>
              </div>
              <p class="sts-cookie-cat-desc">${t.catMarketingDesc}</p>
            </div>

            <!-- Categoría 4: Funcionalidad -->
            <div class="sts-cookie-category">
              <div class="sts-cookie-cat-header">
                <div class="sts-cookie-cat-info">
                  <span class="sts-cookie-cat-name">${t.catFunctionalTitle}</span>
                </div>
                <label class="sts-toggle">
                  <input type="checkbox" id="sts-toggle-functional">
                  <span class="sts-toggle-slider"></span>
                </label>
              </div>
              <p class="sts-cookie-cat-desc">${t.catFunctionalDesc}</p>
            </div>
          </div>

          <div class="sts-cookie-modal-footer">
            <button type="button" id="sts-btn-modal-reject" class="sts-btn sts-btn-secondary">${t.rejectAll}</button>
            <button type="button" id="sts-btn-save-prefs" class="sts-btn sts-btn-primary">${t.savePrefs}</button>
            <button type="button" id="sts-btn-modal-accept" class="sts-btn sts-btn-accent">${t.acceptAll}</button>
          </div>
        </div>
      </div>

      <!-- Botón Flotante Permanente de Reapertura -->
      <button type="button" id="sts-cookie-floating-btn" class="sts-cookie-floating-btn" aria-label="${t.floatingBtnText}" title="${t.floatingBtnText}">
        <i class="fa-solid fa-cookie-bite text-xl" aria-hidden="true"></i>
      </button>
    `;

    document.body.appendChild(wrapper);
    bindEvents();
  }

  function bindEvents() {
    var acceptAllBtn = document.getElementById('sts-btn-accept-all');
    var rejectAllBtn = document.getElementById('sts-btn-reject-all');
    var customizeBtn = document.getElementById('sts-btn-customize');
    var closeBtn = document.getElementById('sts-modal-close');
    var savePrefsBtn = document.getElementById('sts-btn-save-prefs');
    var modalAcceptBtn = document.getElementById('sts-btn-modal-accept');
    var modalRejectBtn = document.getElementById('sts-btn-modal-reject');
    var floatingBtn = document.getElementById('sts-cookie-floating-btn');

    var handleAcceptAll = function () {
      saveConsent({ analytics: true, marketing: true, functional: true });
    };

    var handleRejectAll = function () {
      saveConsent({ analytics: false, marketing: false, functional: false });
    };

    if (acceptAllBtn) acceptAllBtn.addEventListener('click', handleAcceptAll);
    if (modalAcceptBtn) modalAcceptBtn.addEventListener('click', handleAcceptAll);

    if (rejectAllBtn) rejectAllBtn.addEventListener('click', handleRejectAll);
    if (modalRejectBtn) modalRejectBtn.addEventListener('click', handleRejectAll);

    if (customizeBtn) customizeBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (floatingBtn) floatingBtn.addEventListener('click', openModal);

    if (savePrefsBtn) {
      savePrefsBtn.addEventListener('click', function () {
        var analytics = document.getElementById('sts-toggle-analytics').checked;
        var marketing = document.getElementById('sts-toggle-marketing').checked;
        var functional = document.getElementById('sts-toggle-functional').checked;
        saveConsent({
          analytics: analytics,
          marketing: marketing,
          functional: functional
        });
      });
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Cerrar modal al hacer click en el backdrop
    var modal = document.getElementById('sts-cookie-modal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }
  }

  function showBanner() {
    var banner = document.getElementById('sts-cookie-banner');
    if (banner) banner.style.display = 'block';
  }

  function closeBanner() {
    var banner = document.getElementById('sts-cookie-banner');
    if (banner) banner.style.display = 'none';
  }

  function openModal() {
    var modal = document.getElementById('sts-cookie-modal');
    if (!modal) return;

    var prefs = getSavedPreferences();
    var tAnalytics = document.getElementById('sts-toggle-analytics');
    var tMarketing = document.getElementById('sts-toggle-marketing');
    var tFunctional = document.getElementById('sts-toggle-functional');

    if (tAnalytics) tAnalytics.checked = !!prefs.analytics;
    if (tMarketing) tMarketing.checked = !!prefs.marketing;
    if (tFunctional) tFunctional.checked = !!prefs.functional;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    var modal = document.getElementById('sts-cookie-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // ─── 5. INICIALIZACIÓN ──────────────────────────────────────────────────────
  function init() {
    createElements();
    if (!storedConsent) {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ─── 6. API PÚBLICA ──────────────────────────────────────────────────────────
  window.stsOpenCookieSettings = openModal;
  window.stsGetConsent = getSavedPreferences;

})();
