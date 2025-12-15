// --- Utilidades y selección segura de elementos ---
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Mobile Navigation
const hamburger = qs('.hamburger');
const navMenu = qs('.nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
qsa('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling
qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active Navigation Link
const sections = qsa('section');
const navLinks = qsa('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing Effect
const code = `const createMagic = () => {
    return {
        design: 'stunning',
        code: 'clean',
        experience: 'amazing'
    };
};`;

let i = 0;
const typingElement = document.querySelector('.typing-effect');

function typeWriter() {
    if (i < code.length) {
        typingElement.textContent += code.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

setTimeout(typeWriter, 1000);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-item')) {
                const progress = entry.target.querySelector('.skill-progress');
                const targetWidth = progress.getAttribute('data-progress') + '%';
                progress.style.setProperty('--progress', targetWidth);
            }
        }
    });
}, observerOptions);

// Observe elements
qsa('.project-card, .reveal-text, .skill-item').forEach(el => observer.observe(el));

// 3D Tilt Effect for Project Cards
qsa('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        
        // Move glow effect
        const glow = card.querySelector('.card-glow');
        // use CSS variable for color so glow follows the selected theme
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(var(--primary-rgb), 0.35), transparent 70%)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Parallax Effect for Background Shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// --- Form handlers --------------------------------
const makeSubmitAnimation = (form) => {
    const submitBtn = form.querySelector('.btn-submit');
    if (!submitBtn) return;
    const span = submitBtn.querySelector('span');
    const originalText = span ? span.textContent : '';
    span && (span.textContent = 'Enviando...');
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
        span && (span.textContent = '¡Enviado!');
        submitBtn.style.background = 'linear-gradient(135deg, #27c93f, #27c93f)';
        setTimeout(() => {
            span && (span.textContent = originalText);
            submitBtn.style.opacity = '1';
            submitBtn.style.background = '';
            form.reset();
        }, 1200);
    }, 900);
};

// Contact (page contacto.html or inline contact) validation & submit
// Replace FORMSPREE_ENDPOINT with your Formspree endpoint after you register (see README).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwvrzqg';
// Temporary mailto fallback (recipient provided by user)
const MAILTO_RECIPIENT = 'gutierrezmero7772@sagradocorazon.edu.ec';
const contactForm = qs('#contactForm') || qs('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('input[name="name"]') || form.querySelector('#name');
        const email = form.querySelector('input[name="email"]') || form.querySelector('#email');
        const message = form.querySelector('#message') || form.querySelector('textarea[name="message"]');

        // validations
        const errors = [];
        if (!name || name.value.trim().length < 2) errors.push('Nombre debe tener al menos 2 caracteres');
        if (!email || !/^\S+@\S+\.\S+$/.test(email.value)) errors.push('Email inválido');
        if (!message || message.value.trim().length < 10) errors.push('Mensaje muy corto (mínimo 10 caracteres)');

        if (errors.length) {
            alert('Errores:\n' + errors.join('\n'));
            return;
        }

        // If user hasn't set a Formspree endpoint, use a mailto: fallback to open the visitor's mail client
        // (this sends the message via the visitor's mail app and is not stored server-side)
        if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
            // build mailto link
            const subject = encodeURIComponent(form.querySelector('input[name="_subject"]')?.value || 'Nuevo mensaje — Mi Proyecto Digital');
            const nameVal = encodeURIComponent(name.value.trim());
            const emailVal = encodeURIComponent(email.value.trim());
            const messageVal = encodeURIComponent(message.value.trim());

            const body = encodeURIComponent(`Nombre: ${name.value}\nEmail: ${email.value}\n\nMensaje:\n${message.value}`);
            const mailto = `mailto:${MAILTO_RECIPIENT}?subject=${subject}&body=${body}`;
            // open mail client
            window.location.href = mailto;

            // provide the same UX animation
            makeSubmitAnimation(form);
            return;
        }

        // otherwise attempt to send through Formspree
        const formData = new FormData(form);

        // POST the form; Formspree will forward to the email configured in their dashboard
        // Debug: print endpoint + form data entries so we can inspect in console while testing
        console.debug('[contact] FORMSPREE_ENDPOINT:', FORMSPREE_ENDPOINT);
        for (let pair of formData.entries()) console.debug('[contact] field:', pair[0], '=', pair[1]);
        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(async (res) => {
            if (res.ok) {
                // success
                console.info('[contact] Envío aceptado por el servidor. Response status:', res.status);
                makeSubmitAnimation(form);
            } else {
                // Not OK - try to collect extra info from body
                let err = 'Error al enviar (respuesta no OK). Status: ' + res.status;
                try { const j = await res.json(); if (j && j.error) err += ' — ' + j.error; } catch(_){
                    try { const text = await res.text(); if (text) err += ' — ' + text; } catch(_){}
                }
                console.warn('[contact] Envío rechazado por el servidor:', err);
                alert('No se pudo enviar el formulario: ' + err + '\nSe ejecutará la animación de simulación. Revisa la consola del navegador para más detalles (CORS/Network).');
                makeSubmitAnimation(form);
            }
        }).catch((err) => {
            // network or CORS error: still show nice animation as fallback
            console.error('Error enviando formulario (fetch failed):', err);
            alert('No se pudo conectar con el servicio de envío: ' + String(err) + '\nPosibles causas: prueba el formulario con Live Server (http://localhost) o revisa la consola para ver errores CORS.\n\nComo alternativa el formulario usa un fallback `mailto:` si no configuras Formspree.');
            makeSubmitAnimation(form);
        });
    });
}

// --- Login simulado / Zona Privada DESACTIVADO ---
// La funcionalidad de zona privada se ha eliminado: la página `zona_privada.html`
// ahora es un tema público (Plataforma Web). No se realiza ninguna redirección
// ni comprobación de sesión desde JavaScript.

// --- Modal básico para enlaces con class project-link (si href='#' se abre modal) ---
const createModal = () => {
    const modal = document.createElement('div');
    modal.className = 'site-modal';
    modal.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(var(--overlay-rgb),0.6);z-index:20000;';
    modal.innerHTML = `\n+      <div style="max-width:900px;width:95%;background:var(--darker);padding:1.5rem;border-radius:10px;border:1px solid rgba(var(--light-rgb),0.03);">\n+        <button aria-label=\"Cerrar\" id=\"modalClose\" style=\"float:right;background:transparent;border:none;color:var(--light);font-size:18px;cursor:pointer;\">✕</button>\n+        <div id=\"modalBody\" style=\"clear:both;color:var(--light);\"></div>\n+      </div>`;
    document.body.appendChild(modal);
    qs('#modalClose', modal).addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.remove(); });
    return modal;
};

qsa('.project-link').forEach(link => {
    // If link points to # or data-modal attribute — open modal
    const href = link.getAttribute('href');
    if (!href || href === '#') {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = createModal();
            qs('#modalBody', modal).innerHTML = '<h3 style="margin-top:0">Proyecto</h3><p>Información del proyecto — sustituye por detalles o una vista previa.</p>';
        });
    }
});

// --- Botón "volver arriba" DESACTIVADO ---

// --- Tema claro/oscuro DESACTIVADO ---
document.documentElement.setAttribute('data-theme', 'dark');

// Cursor Trail Effect DESACTIVADO

// Add stagger animation to project cards
qsa('.project-card').forEach((card, index) => { card.style.animationDelay = `${index * 0.1}s`; });

// Accessibility: close mobile menu by pressing ESC
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) { navMenu.classList.remove('active'); hamburger && hamburger.classList.remove('active'); } });

// Close mobile menu if clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active'); hamburger && hamburger.classList.remove('active');
    }
});

// --- Registro obligatorio al iniciar -----------------
const isRegistered = () => localStorage.getItem('registered') === '1';

const createRegistrationModal = () => {
        const modal = document.createElement('div');
        modal.id = 'registrationModal';
        modal.className = 'site-modal registration-modal';
        modal.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);z-index:30000;';
        modal.innerHTML = `
            <div style="width:420px;max-width:95%;background:var(--darker);color:var(--light);padding:1.25rem;border-radius:10px;border:1px solid rgba(255,255,255,0.04);">
                <h2 style="margin-top:0">Registro</h2>
                <p style="opacity:0.85;margin-bottom:0.5rem">Regístrate para continuar en el sitio.</p>
                <form id="registrationForm" style="display:flex;flex-direction:column;gap:0.6rem">
                    <input name="name" placeholder="Nombre" required style="padding:0.6rem;border-radius:6px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:var(--light)">
                    <input name="email" type="email" placeholder="Correo electrónico" required style="padding:0.6rem;border-radius:6px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:var(--light)">
                    <input name="password" type="password" placeholder="Contraseña" required style="padding:0.6rem;border-radius:6px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:var(--light)">
                    <label style="font-size:0.9rem;display:flex;gap:0.6rem;align-items:center"><input type="checkbox" name="agree" required> Acepto los términos</label>
                    <div style="display:flex;gap:0.5rem;justify-content:flex-end;margin-top:0.25rem">
                        <button type="submit" class="btn-submit" style="padding:0.5rem 0.9rem;border-radius:6px;background:var(--primary);color:white;border:none">Registrarme</button>
                    </div>
                </form>
            </div>`;
        return modal;
};

const showRegistrationIfNeeded = () => {
        if (isRegistered()) return;
        const modal = createRegistrationModal();
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        const form = modal.querySelector('#registrationForm');
        form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = form.elements['name'].value.trim();
                const email = form.elements['email'].value.trim();
                const password = form.elements['password'].value;
                const agree = form.elements['agree'].checked;
                if (name.length < 2) { alert('Nombre debe tener al menos 2 caracteres'); return; }
                if (!/^\S+@\S+\.\S+$/.test(email)) { alert('Email inválido'); return; }
                if (password.length < 6) { alert('Contraseña debe tener al menos 6 caracteres'); return; }
                if (!agree) { alert('Debes aceptar los términos'); return; }
                const user = { name, email, registeredAt: new Date().toISOString() };
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('registered', '1');
                    // actualizar badge de usuario en la navbar
                    try { insertUserBadge(); } catch(_){}
                modal.remove();
                document.body.style.overflow = '';
                setTimeout(() => alert('¡Registro completado! Bienvenido, ' + name + '.'), 200);
        });
};

document.addEventListener('DOMContentLoaded', () => {
        showRegistrationIfNeeded();
});

// --- Botón Cerrar sesión (logout) --------------------
const insertLogoutButton = () => {
    const container = qs('.navbar .container') || qs('.navbar');
    if (!container) return;
    if (qs('#logoutBtn', container)) return; // ya existe

    const btn = document.createElement('button');
    btn.id = 'logoutBtn';
    btn.type = 'button';
    btn.textContent = 'Cerrar sesión';
    btn.style.cssText = 'margin-left:0.6rem;padding:0.35rem 0.6rem;border-radius:6px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:var(--light);cursor:pointer;font-size:0.9rem';

    // show user name tooltip if available
    const user = (() => { try { return JSON.parse(localStorage.getItem('user')||'null'); } catch(_){return null;} })();
    if (user && user.name) btn.title = 'Sesión: ' + user.name;

    btn.addEventListener('click', () => {
        if (!confirm('¿Cerrar sesión y borrar registro local?')) return;
        localStorage.removeItem('user');
        localStorage.removeItem('registered');
        // Remove potential registration modal
        const regModal = qs('#registrationModal'); if (regModal) regModal.remove();
        // show registration modal again
        showRegistrationIfNeeded();
    });

    // Insert before hamburger for desktop, or append if not found
    const hamburgerEl = qs('.navbar .hamburger');
    if (hamburgerEl && hamburgerEl.parentElement) hamburgerEl.parentElement.insertBefore(btn, hamburgerEl);
    else container.appendChild(btn);
};

document.addEventListener('DOMContentLoaded', () => {
    insertLogoutButton();
    try { insertUserBadge(); } catch(_){}
});

// --- Indicador de usuario en navbar ------------------
const insertUserBadge = () => {
    const container = qs('.navbar .container') || qs('.navbar');
    if (!container) return;
    let badge = qs('#userBadge', container);
    const user = (() => { try { return JSON.parse(localStorage.getItem('user')||'null'); } catch(_){ return null; } })();
    if (!user) { if (badge) badge.remove(); return; }
    if (!badge) {
        badge = document.createElement('span');
        badge.id = 'userBadge';
        badge.style.cssText = 'margin-left:0.5rem;padding:0.25rem 0.6rem;border-radius:999px;background:rgba(255,255,255,0.06);color:var(--light);font-size:0.9rem;display:inline-block;';
        const logout = qs('#logoutBtn', container);
        const hamburgerEl = qs('.navbar .hamburger');
        if (logout && logout.parentElement) logout.parentElement.insertBefore(badge, logout);
        else if (hamburgerEl && hamburgerEl.parentElement) hamburgerEl.parentElement.insertBefore(badge, hamburgerEl);
        else container.appendChild(badge);
    }
    badge.textContent = user.name.split(' ')[0] || user.name;
    badge.title = user.email || '';
};
