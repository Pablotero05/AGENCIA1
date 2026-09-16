/**
 * StepToSantiago — Analytics & Attribution Layer
 * ================================================
 * Captura UTMs, GCLID/GBRAID/WBRAID desde la URL y los persiste en sessionStorage.
 * Proporciona la función window.stsTrack() para disparar eventos GA4 con parámetros enriquecidos.
 * Integra compatibilidad con Google Consent Mode v2 y consentimiento de cookies.
 *
 * Uso en cualquier página:
 *   <script src="/scripts/analytics/sts-analytics.js"></script>
 *   <!-- En DOMContentLoaded: -->
 *   stsTrack('view_route', { route_slug: 'portugues-tui', route_name: 'Camino Portugués desde Tui', locale: 'es' });
 */

(function () {
  'use strict';

  // ─── 1. CAPTURA DE PARÁMETROS DE URL ────────────────────────────────────────
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var ADS_KEYS = ['gclid', 'gbraid', 'wbraid'];

  function getUrlParams() {
    var params = {};
    var search = window.location.search;
    if (!search) return params;
    var pairs = search.slice(1).split('&');
    pairs.forEach(function (pair) {
      var idx = pair.indexOf('=');
      if (idx > 0) {
        var key = decodeURIComponent(pair.slice(0, idx));
        var val = decodeURIComponent(pair.slice(idx + 1).replace(/\+/g, ' '));
        params[key] = val;
      }
    });
    return params;
  }

  function captureAttributionParams() {
    var urlParams = getUrlParams();
    var allKeys = UTM_KEYS.concat(ADS_KEYS);
    var captured = false;

    allKeys.forEach(function (key) {
      if (urlParams[key]) {
        try {
          sessionStorage.setItem('sts_' + key, urlParams[key]);
        } catch (e) {}
        captured = true;
      }
    });

    // También guardar landing page si es la primera visita de la sesión
    if (!sessionStorage.getItem('sts_landing_page')) {
      try {
        sessionStorage.setItem('sts_landing_page', window.location.pathname + window.location.search);
      } catch (e) {}
    }

    return captured;
  }

  function getStoredAttributionParams() {
    var params = {};
    var allKeys = UTM_KEYS.concat(ADS_KEYS);
    allKeys.forEach(function (key) {
      try {
        var val = sessionStorage.getItem('sts_' + key);
        if (val) params[key] = val;
      } catch (e) {}
    });
    try {
      var lp = sessionStorage.getItem('sts_landing_page');
      if (lp) params['landing_page'] = lp;
    } catch (e) {}
    return params;
  }

  // Ejecutar captura inmediatamente al cargar el script
  captureAttributionParams();

  // ─── 2. FUNCIÓN DE TRACKING (CON CONSENTIMIENTO) ─────────────────────────────
  /**
   * Comprueba si el usuario ha otorgado permiso para analítica
   */
  function hasAnalyticsConsent() {
    if (typeof window.stsGetConsent === 'function') {
      var consent = window.stsGetConsent();
      return consent && consent.analytics === true;
    }
    // Si no hay sistema de consentimiento cargado, permitir el paso a gtag (gtag manejará Consent Mode)
    return true;
  }

  /**
   * Dispara un evento en GA4 (gtag) con parámetros enriquecidos con datos de atribución.
   * Si gtag no está disponible, encola el evento para reintentarlo.
   *
   * @param {string} eventName - Nombre del evento GA4
   * @param {object} eventParams - Parámetros específicos del evento
   */
  function stsTrack(eventName, eventParams) {
    var attribution = getStoredAttributionParams();
    var enrichedParams = Object.assign({}, eventParams || {}, attribution);

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, enrichedParams);
    } else {
      // Si gtag no está listo, reintentar tras 1s (máx. 3 intentos)
      var attempts = 0;
      var retry = setInterval(function () {
        attempts++;
        if (typeof window.gtag === 'function') {
          window.gtag('event', eventName, enrichedParams);
          clearInterval(retry);
        } else if (attempts >= 3) {
          clearInterval(retry);
          // Fallback: dataLayer push para GTM
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: eventName, eventParams: enrichedParams });
        }
      }, 1000);
    }
  }

  // Escuchar actualizaciones dinámicas de consentimiento
  window.addEventListener('sts_consent_updated', function (e) {
    var prefs = e.detail;
    if (prefs && prefs.analytics) {
      stsTrack('consent_granted', {
        analytics: true,
        marketing: !!prefs.marketing
      });
    }
  });

  // ─── 3. EVENTOS AUTOMÁTICOS EN ELEMENTOS ─────────────────────────────────────

  /**
   * Registra clics en enlaces de WhatsApp
   */
  function bindWhatsAppClicks(routeSlug) {
    var links = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], a[data-track="whatsapp"]');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        stsTrack('whatsapp_click', {
          route_slug: routeSlug || 'unknown',
          placement: link.dataset.placement || 'unknown'
        });
      });
    });
  }

  /**
   * Registra clics en teléfonos
   */
  function bindPhoneClicks(routeSlug) {
    var links = document.querySelectorAll('a[href^="tel:"]');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        stsTrack('phone_click', {
          route_slug: routeSlug || 'unknown',
          placement: link.dataset.placement || 'unknown'
        });
      });
    });
  }

  /**
   * Registra start_quote cuando el usuario interactúa con el primer campo del formulario
   */
  function bindFormTracking(routeSlug) {
    var forms = document.querySelectorAll('form[data-track-quote]');
    forms.forEach(function (form) {
      var tracked = false;
      var inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(function (input) {
        input.addEventListener('focus', function () {
          if (!tracked) {
            tracked = true;
            stsTrack('start_quote', {
              route_slug: routeSlug || form.dataset.routeSlug || 'unknown',
              form_id: form.id || 'contact_form'
            });
          }
        });
      });
      // form_submit
      form.addEventListener('submit', function (e) {
        var travelers = form.querySelector('[name="viajeros"]');
        var duration = form.querySelector('[name="duracion"]');
        stsTrack('form_submit', {
          route_slug: routeSlug || form.dataset.routeSlug || 'unknown',
          travelers: travelers ? travelers.value : null,
          duration: duration ? duration.value : null,
          form_id: form.id || 'contact_form'
        });
      });
    });
  }

  // ─── 4. RELLENO DE CAMPOS OCULTOS EN FORMULARIOS ──────────────────────────────
  /**
   * Rellena los campos ocultos de UTM y GCLID en todos los formularios de la página
   */
  function fillHiddenFormFields() {
    var attribution = getStoredAttributionParams();
    var allKeys = UTM_KEYS.concat(ADS_KEYS);

    allKeys.forEach(function (key) {
      var fields = document.querySelectorAll('input[name="' + key + '"]');
      fields.forEach(function (field) {
        if (field.type === 'hidden' && attribution[key]) {
          field.value = attribution[key];
        }
      });
    });
  }

  // ─── 5. API PÚBLICA ──────────────────────────────────────────────────────────
  window.stsTrack = stsTrack;

  /**
   * Inicializar todos los bindings automáticos para una página de ruta.
   * Llamar con el slug de la ruta actual.
   *
   * @param {string} routeSlug - p.ej. 'portugues-tui'
   * @param {string} routeName - p.ej. 'Camino Portugués desde Tui'
   * @param {string} locale - p.ej. 'es'
   */
  window.stsInitRoute = function (routeSlug, routeName, locale) {
    document.addEventListener('DOMContentLoaded', function () {
      // Evento de visita de ruta
      stsTrack('view_route', {
        route_slug: routeSlug,
        route_name: routeName,
        locale: locale || 'es'
      });

      bindWhatsAppClicks(routeSlug);
      bindPhoneClicks(routeSlug);
      bindFormTracking(routeSlug);
      fillHiddenFormFields();
    });
  };

  /**
   * Inicializar para páginas genéricas (no de ruta específica)
   */
  window.stsInitPage = function (pageName) {
    document.addEventListener('DOMContentLoaded', function () {
      bindWhatsAppClicks(pageName);
      bindPhoneClicks(pageName);
      bindFormTracking(pageName);
      fillHiddenFormFields();
    });
  };

})();
