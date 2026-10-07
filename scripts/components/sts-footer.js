class StsFooter extends HTMLElement {
  connectedCallback() {
    // Inyectar script del gestor de cookies si no está presente
    if (!document.getElementById('sts-cookie-consent-script')) {
      const scriptPath = '/scripts/components/sts-cookie-consent.js';
      const script = document.createElement('script');
      script.id = 'sts-cookie-consent-script';
      script.src = scriptPath;
      script.defer = true;
      document.head.appendChild(script);
    }

    const currentPath = window.location.pathname;
    const lang = this._getLangFromPath(currentPath);

    const labels = {
      es: {
        desc: "Agencia especializada en el Camino de Santiago desde Santiago de Compostela. Más de 10 años acompañando peregrinos en su viaje espiritual.",
        rutas: "Rutas",
        verTodas: "Ver todas las rutas",
        servicios: "Servicios",
        contacto: "Contacto",
        faq: "Preguntas Frecuentes",
        opiniones: "Opiniones de Peregrinos",
        derechos: "Todos los derechos reservados.",
        privacidad: "Política de Privacidad",
        aviso: "Aviso Legal",
        terminos: "Términos y Condiciones",
        cookies: "Política de Cookies",
        cookieSettings: "Configuración de Cookies",
        whatsapp: "Contactar por WhatsApp",
        rFrances: "Camino Francés",
        rPortugues: "Camino Portugués",
        rNorte: "Camino del Norte",
        rPrimitivo: "Camino Primitivo",
        sDesayunos: "Desayunos",
        sComidas: "Comidas y Cenas",
        sMochilas: "Transporte de Mochilas",
        sAeropuerto: "Traslado al Aeropuerto",
        sInicio: "Transporte al Inicio"
      },
      en: {
        desc: "Agency specialized in the Camino de Santiago from Santiago de Compostela. More than 10 years accompanying pilgrims on their spiritual journey.",
        rutas: "Routes",
        verTodas: "View all routes",
        servicios: "Services",
        contacto: "Contact",
        faq: "Frequently Asked Questions",
        opiniones: "Pilgrim Reviews",
        derechos: "All rights reserved.",
        privacidad: "Privacy Policy",
        aviso: "Legal Notice",
        terminos: "Terms and Conditions",
        cookies: "Cookie Policy",
        cookieSettings: "Cookie Settings",
        whatsapp: "Contact us via WhatsApp",
        rFrances: "French Way",
        rPortugues: "Portuguese Way",
        rNorte: "Northern Way",
        rPrimitivo: "Primitive Way",
        sDesayunos: "Breakfasts",
        sComidas: "Lunches & Dinners",
        sMochilas: "Luggage Transport",
        sAeropuerto: "Airport Transfer",
        sInicio: "Transfer to Start"
      },
      por: {
        desc: "Agência especializada no Caminho de Santiago a partir de Santiago de Compostela. Mais de 10 anos acompanhando peregrinos em sua jornada espiritual.",
        rutas: "Rotas",
        verTodas: "Ver todas as rotas",
        servicios: "Serviços",
        contacto: "Contato",
        faq: "Perguntas Frecuentes",
        opiniones: "Opiniões de Peregrinos",
        derechos: "Todos os direitos reservados.",
        privacidad: "Política de Privacidade",
        aviso: "Aviso Legal",
        terminos: "Termos e Condições",
        cookies: "Política de Cookies",
        cookieSettings: "Configuração de Cookies",
        whatsapp: "Contatar por WhatsApp",
        rFrances: "Caminho Francês",
        rPortugues: "Caminho Português",
        rNorte: "Caminho do Norte",
        rPrimitivo: "Caminho Primitivo",
        sDesayunos: "Pequenos-almoços",
        sComidas: "Almoços e Jantares",
        sMochilas: "Transporte de Mochilas",
        sAeropuerto: "Transfer para o Aeroporto",
        sInicio: "Transporte para o Ponto de Partida"
      }
    };

    const t = labels[lang] || labels.es;

    this.innerHTML = `
      <footer id="global-footer" class="bg-[var(--dark-background-color)] text-white">
        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            <!-- Columna 1: Logo & Descripción -->
            <div class="lg:col-span-1">
              <a href="/${lang}/index.html" class="inline-block mb-6">
                <img
                  src="${this.getAttribute('logo') || '/assets/stsLOGO-footer.webp'}"
                  alt="Step To Santiago"
                  width="135"
                  height="124"
                  loading="lazy"
                  decoding="async"
                  class="h-24 md:h-28 w-auto object-contain">
              </a>
              <p class="text-white/70 text-sm mb-6 leading-relaxed">
                ${t.desc}
              </p>
              <!-- Redes sociales -->
              <div class="flex gap-4">
                <a href="#" aria-label="Instagram"
                  class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--accent-color)] transition-colors">
                  <i class="fa-brands fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="#" aria-label="Facebook"
                  class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--accent-color)] transition-colors">
                  <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a href="#" aria-label="YouTube"
                  class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--accent-color)] transition-colors">
                  <i class="fa-brands fa-youtube" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            <!-- Columna 2: Rutas -->
            <div>
              <h4 class="font-bold text-lg mb-4" style="font-family: var(--font-family-heading);">
                ${t.rutas}
              </h4>
              <ul class="space-y-3">
                <li><a href="/${lang}/pages/ruta.html?id=frances" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">${t.rFrances}</a></li>
                <li><a href="/${lang}/pages/ruta.html?id=portugues" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">${t.rPortugues}</a></li>
                <li><a href="/${lang}/pages/rutas.html" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">${t.rNorte}</a></li>
                <li><a href="/${lang}/pages/rutas.html" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">${t.rPrimitivo}</a></li>
                <li><a href="/${lang}/pages/rutas.html" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">${t.verTodas}</a></li>
              </ul>
            </div>

            <!-- Columna 3: Servicios -->
            <div>
              <h4 class="font-bold text-lg mb-4" style="font-family: var(--font-family-heading);">
                ${t.servicios}
              </h4>
              <ul class="space-y-3">
                <li><a href="/${lang}/pages/servicios.html#desayunos" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">${t.sDesayunos}</a></li>
                <li><a href="/${lang}/pages/servicios.html#comidas" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">${t.sComidas}</a></li>
                <li><a href="/${lang}/pages/servicios.html#mochilas" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">${t.sMochilas}</a></li>
                <li><a href="/${lang}/pages/servicios.html#aeropuerto" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">${t.sAeropuerto}</a></li>
                <li><a href="/${lang}/pages/servicios.html#inicio" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">${t.sInicio}</a></li>
              </ul>
            </div>

            <!-- Columna 4: Contacto -->
            <div>
              <h4 class="font-bold text-lg mb-4" style="font-family: var(--font-family-heading);">
                ${t.contacto}
              </h4>
              <ul class="space-y-3">
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-envelope text-[var(--accent-color)]" aria-hidden="true"></i>
                  <a href="mailto:info@steptosantiago.com" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">info@steptosantiago.com</a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
              <p class="text-white/50 text-sm">
                © ${new Date().getFullYear()} Step To Santiago. ${t.derechos}
              </p>
              <div class="flex flex-wrap gap-6 justify-center items-center">
                <a href="/${lang}/pages/preguntas-frecuentes.html" class="text-white/70 hover:text-[var(--accent-color)] text-sm transition-colors font-medium">${t.faq}</a>
                <a href="/${lang}/pages/opiniones.html" class="text-white/70 hover:text-[var(--accent-color)] text-sm transition-colors font-medium">${t.opiniones}</a>
                <a href="/${lang}/pages/politicas.html" class="text-white/50 hover:text-white text-sm transition-colors">${t.privacidad}</a>
                <a href="/${lang}/pages/legal.html" class="text-white/50 hover:text-white text-sm transition-colors">${t.aviso}</a>
                <a href="/${lang}/pages/terminos.html" class="text-white/50 hover:text-white text-sm transition-colors">${t.terminos}</a>
                <a href="/${lang}/pages/cookies.html" class="text-white/50 hover:text-white text-sm transition-colors">${t.cookies}</a>
                <button type="button" onclick="if(window.stsOpenCookieSettings) window.stsOpenCookieSettings();" class="text-white/50 hover:text-[var(--accent-color)] text-sm transition-colors underline cursor-pointer bg-transparent border-0 p-0">${t.cookieSettings}</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <!-- WhatsApp Floating Button -->
      <a href="https://wa.me/34666666666"
        class="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="${t.whatsapp}">
        <i class="fa-brands fa-whatsapp text-2xl" aria-hidden="true"></i>
      </a>
    `;
  }

  _getLangFromPath(path) {
    if (path.includes('/en/')) return 'en';
    if (path.includes('/por/') || path.includes('/pt/')) return 'por';
    return 'es';
  }
}

customElements.define('sts-footer', StsFooter);
