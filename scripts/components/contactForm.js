document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sts-contact-form');
    if(!form) return;

    // Helper: JWT generation without external libs
    async function createJWT(payload, secret) {
        const header = { alg: "HS256", typ: "JWT" };
        const encoder = new TextEncoder();
        
        const base64url = (source) => btoa(String.fromCharCode(...new Uint8Array(source)))
            .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
            
        const encodedHeader = base64url(encoder.encode(JSON.stringify(header)));
        const encodedPayload = base64url(encoder.encode(JSON.stringify(payload)));
        const unsignedToken = `${encodedHeader}.${encodedPayload}`;
        
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );
        
        const signature = await crypto.subtle.sign(
            'HMAC',
            key,
            encoder.encode(unsignedToken)
        );
        
        const encodedSignature = base64url(new Uint8Array(signature));
        return `${unsignedToken}.${encodedSignature}`;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.timestamp = new Date().toISOString();
        data.language = document.documentElement.lang;
        
        try {
            // Secreto y webhook de n8n
            const secret = "sts_secret_n8n"; 
            const jwt = await createJWT(data, secret);
            
            const webhookUrl = "https://your-n8n.com/webhook/contacto"; // <-- URL PENDIENTE DE REEMPLAZAR
            
            // Envío en background, asumimos OK o hacemos fetch
            // Como no hay URL real, el fetch fallará, así que mockeamos éxito para testear
            // Quita el comentario a este bloque cuando tengas la URL real
            /*
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: jwt })
            });
            if(!response.ok) throw new Error("Error en webhook");
            */

            // Simulamos retraso de webhook
            await new Promise(r => setTimeout(r, 1200));

            // Éxito
            const msgObj = {
                es: { title: "¡Mensaje Enviado!", text: "Recibimos tu mensaje. Pronto te contactaremos para tu Camino." },
                en: { title: "Message Sent!", text: "We received your request. We will contact you soon." },
                pt: { title: "Mensagem Enviada!", text: "Recebemos sua mensagem. Entraremos em contato em breve." }
            };
            const lang = data.language === 'pt' ? 'pt' : (data.language === 'en' ? 'en' : 'es');
            
            form.innerHTML = `
                <div class="text-center p-8 bg-[var(--light-background-color)] rounded-2xl border border-[var(--light-border-color)] animate-fadeIn">
                    <i class="fa-solid fa-circle-check text-5xl text-[var(--accent2-color)] mb-4"></i>
                    <h3 class="text-2xl font-bold text-[var(--dark-text-color)] mb-2" style="font-family:var(--font-family-heading)">${msgObj[lang].title}</h3>
                    <p class="text-[var(--gray-text-color)]">${msgObj[lang].text}</p>
                </div>
            `;
        } catch (error) {
            console.error("Error:", error);
            submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error. Intenta de nuevo.';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });

    // Auto-seleccionar ruta de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const rutaId = urlParams.get('ruta');
    if (rutaId) {
        const selectRuta = form.querySelector('select[name="ruta"]');
        if(selectRuta) {
            let found = Array.from(selectRuta.options).some(o => o.value === rutaId);
            if(!found) {
                const opt = new Option(rutaId.toUpperCase(), rutaId);
                selectRuta.add(opt);
            }
            selectRuta.value = rutaId;
        }
    }
});
