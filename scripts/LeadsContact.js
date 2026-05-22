(function () {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbys_aam9ZxA7hj6IXbcLJ1dPTNuymRb-T5S9QGVHcxmm2bZJZuHwk-5rEiztuaVeuWK/exec';

  function normalizeLang(rawLang) {
    const short = String(rawLang || '')
      .trim()
      .toLowerCase()
      .split('-')[0];

    if (short === 'en') return 'en';
    if (short === 'gl') return 'gl';
    if (short === 'pt' || short === 'por') return 'pt';
    return 'es';
  }

  function getPageLang() {
    const htmlLang = document.documentElement.getAttribute('lang');
    const browserLang = navigator.language || 'es';
    return normalizeLang(htmlLang || browserLang);
  }

  function getTranslations(lang) {
    const i18n = {
      es: {
        title: '¡Solicitud enviada!',
        subtitle: 'Hemos recibido tu consulta. Nuestro equipo se pondrá en contacto contigo en menos de 24 horas.',
        badge: '¡Buen Camino!',
        sending: 'Enviando...',
        btnReset: '<i class="fa-solid fa-paper-plane mr-2"></i> Enviar Consulta',
        error: 'No se pudo enviar la solicitud. Inténtalo de nuevo.'
      },
      en: {
        title: 'Request sent!',
        subtitle: 'We have received your inquiry. Our team will get in touch with you within 24 hours.',
        badge: 'Buen Camino!',
        sending: 'Sending...',
        btnReset: '<i class="fa-solid fa-paper-plane mr-2"></i> Request a free quote',
        error: 'The request could not be sent. Please try again.'
      },
      gl: {
        title: 'Solicitude enviada!',
        subtitle: 'Recibimos a túa consulta. O noso equipo poñerase en contacto contigo en menos de 24 horas.',
        badge: 'Bo Camiño!',
        sending: 'Enviando...',
        btnReset: '<i class="fa-solid fa-paper-plane mr-2"></i> Enviar Consulta',
        error: 'Non se puido enviar a solicitude. Téntao de novo.'
      },
      pt: {
        title: 'Pedido enviado!',
        subtitle: 'Recebemos o seu pedido. A nossa equipa entrará em contacto consigo em menos de 24 horas.',
        badge: 'Bom Caminho!',
        sending: 'A enviar...',
        btnReset: '<i class="fa-solid fa-paper-plane mr-2"></i> Enviar Consulta',
        error: 'Não foi possível enviar o pedido. Tente novamente.'
      }
    };

    return i18n[lang] || i18n.es;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showErrorMessage(form, message) {
    let errorBox = form.querySelector('[data-sts-error]');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.setAttribute('data-sts-error', 'true');
      errorBox.className = 'mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700';
      form.appendChild(errorBox);
    }
    errorBox.textContent = message;
  }

  function clearErrorMessage(form) {
    const errorBox = form.querySelector('[data-sts-error]');
    if (errorBox) errorBox.remove();
  }

  function showSuccessAnimation(formWrapper, t) {
    formWrapper.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    formWrapper.style.opacity = '0';
    formWrapper.style.transform = 'translateY(-10px)';

    setTimeout(function () {
      formWrapper.style.display = 'none';

      const successEl = document.createElement('div');
      successEl.id = 'sts-success-panel';
      successEl.style.cssText = 'opacity:0; transform:scale(0.9); transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1);';
      successEl.innerHTML = `
        <div style="text-align:center; padding: 2rem 1rem;">
          <div style="
            width: 96px; height: 96px;
            border-radius: 50%;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1.5rem;
            box-shadow: 0 0 0 0 rgba(34,197,94,0.4);
            animation: sts-pulse 2s infinite;
          ">
            <svg viewBox="0 0 52 52" style="width:52px;height:52px;fill:none;">
              <circle cx="26" cy="26" r="25" stroke="rgba(255,255,255,0.3)" stroke-width="2"></circle>
              <path d="M14 26 L22 34 L38 18" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"
                style="stroke-dasharray:40;stroke-dashoffset:40;animation:sts-draw 0.6s 0.3s ease forwards;"></path>
            </svg>
          </div>

          <div style="
            display:inline-block;
            background: linear-gradient(90deg, #f59e0b, #fbbf24);
            color: #1e1b4b;
            font-weight:800;
            font-size:0.8rem;
            letter-spacing:0.12em;
            text-transform:uppercase;
            padding: 0.3rem 1.2rem;
            border-radius:9999px;
            margin-bottom:1.2rem;
            box-shadow: 0 4px 12px rgba(245,158,11,0.4);
          ">🌟 ${escapeHtml(t.badge)}</div>

          <h3 style="font-size:1.6rem;font-weight:800;color:#1e293b;margin:0 0 0.75rem;font-family:var(--font-family-heading,inherit);">
            ${escapeHtml(t.title)}
          </h3>

          <p style="color:#64748b;font-size:1rem;line-height:1.6;max-width:340px;margin:0 auto 1.5rem;">
            ${escapeHtml(t.subtitle)}
          </p>

          <div style="display:flex;justify-content:center;gap:2rem;margin-bottom:1.5rem;flex-wrap:wrap;">
            <div style="text-align:center;">
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(30,58,138,0.08);display:flex;align-items:center;justify-content:center;margin:0 auto 0.4rem;">
                <i class="fa-solid fa-envelope" style="color:var(--primary-color,#1e3a8a);font-size:1.1rem;"></i>
              </div>
              <span style="font-size:0.7rem;color:#94a3b8;font-weight:600;">Email</span>
            </div>

            <div style="text-align:center;">
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 0.4rem;">
                <i class="fa-brands fa-whatsapp" style="color:#22c55e;font-size:1.2rem;"></i>
              </div>
              <span style="font-size:0.7rem;color:#94a3b8;font-weight:600;">WhatsApp</span>
            </div>

            <div style="text-align:center;">
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(99,102,241,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 0.4rem;">
                <i class="fa-solid fa-phone" style="color:#6366f1;font-size:1rem;"></i>
              </div>
              <span style="font-size:0.7rem;color:#94a3b8;font-weight:600;">Call</span>
            </div>
          </div>
        </div>

        <style>
          @keyframes sts-pulse {
            0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
            70% { box-shadow: 0 0 0 20px rgba(34,197,94,0); }
            100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
          }
          @keyframes sts-draw {
            to { stroke-dashoffset: 0; }
          }
        </style>
      `;

      formWrapper.parentNode.insertBefore(successEl, formWrapper.nextSibling);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          successEl.style.opacity = '1';
          successEl.style.transform = 'scale(1)';
        });
      });
    }, 400);
  }

  async function submitLead(payload) {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    let result = null;

    try {
      result = JSON.parse(text);
    } catch (_) {
      throw new Error('Invalid server response');
    }

    if (!result || result.ok !== true) {
      throw new Error(result && result.error ? result.error : 'Submission failed');
    }

    return result;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('sts-contact-form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearErrorMessage(form);

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalButtonHtml = submitBtn.innerHTML;

      const lang = getPageLang();
      const t = getTranslations(lang);
      const formData = new FormData(form);

      const payload = {
        nombre: (formData.get('nombre') || '').toString().trim(),
        telefono: (formData.get('telefono') || '').toString().trim(),
        email: (formData.get('email') || '').toString().trim(),
        ruta: (formData.get('ruta') || 'sin-decidir').toString().trim(),
        personas: (formData.get('personas') || '1').toString().trim(),
        fecha: (formData.get('fecha') || '').toString().trim(),
        mensaje: (formData.get('mensaje') || '').toString().trim(),
        idioma: lang,
        pageUrl: window.location.href,
        source: 'website',
        userAgent: navigator.userAgent
      };

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = t.sending;

        console.log('Sending payload:', payload);

        await submitLead(payload);
        showSuccessAnimation(form, t);
      } catch (error) {
        console.error('Submit error:', error);
        showErrorMessage(form, t.error);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalButtonHtml;
      }
    });
  });
})();