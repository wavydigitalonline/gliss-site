
document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqButtons = document.querySelectorAll('button[aria-expanded]');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            const content = btn.nextElementSibling || btn.parentElement.querySelector('[role="region"]');
            if (content) {
                content.style.display = expanded ? 'none' : 'block';
            }
            const icon = btn.querySelector('svg');
            if (icon) {
                icon.style.transform = expanded ? 'rotate(0deg)' : 'rotate(45deg)';
            }
        });
    });

    // Mobile Menu
    const menuBtn = document.querySelector('button[aria-label="Toggle menu"]');
    const mobileMenu = document.querySelector('[role="dialog"]');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.style.display === 'none' || !mobileMenu.style.display;
            mobileMenu.style.display = isHidden ? 'block' : 'none';
        });
    }
    // Contact form -> pre-filled email
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input');
            const name = inputs[0]?.value || '';
            const email = inputs[1]?.value || '';
            const business = inputs[2]?.value || '';
            const phone = inputs[3]?.value || '';
            const service = contactForm.querySelector('select')?.value || '';
            const message = contactForm.querySelector('textarea')?.value || '';

            const subject = 'Consultation request from ' + (name || 'website visitor');
            const body =
                'Name: ' + (name || '-') +
                '\nEmail: ' + (email || '-') +
                '\nBusiness: ' + (business || '-') +
                '\nPhone: ' + (phone || '-') +
                '\nService: ' + (service || '-') +
                '\nMessage: ' + (message || '-');

            window.location.href =
                'mailto:gliss.studio@gmail.com' +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);
        });
        }
});

// ===== added kinetic animations (non-destructive: only runs if these elements exist) =====
document.addEventListener('DOMContentLoaded', () => {

    // Hero headline: split into words, each flies in from a random 3D position and assembles into place
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const lineSpans = Array.from(heroTitle.children).filter(el => el.tagName === 'SPAN');
        let i = 0;
        lineSpans.forEach(line => {
            const words = line.textContent.split(' ').filter(Boolean);
            line.textContent = '';
            words.forEach((w, idx) => {
                const kw = document.createElement('span');
                kw.className = 'kw';
                kw.textContent = w + (idx < words.length - 1 ? '\u00A0' : '');
                const tx = (Math.random() * 240 - 120).toFixed(0) + 'px';
                const ty = (Math.random() * -50 - 15).toFixed(0) + 'px';
                const tz = (-90 - Math.random() * 160).toFixed(0) + 'px';
                const rx = (Math.random() * 60 + 15).toFixed(0) + 'deg';
                const ry = (Math.random() * 70 - 35).toFixed(0) + 'deg';
                const rz = (Math.random() * 14 - 7).toFixed(0) + 'deg';
                kw.style.setProperty('--tx', tx);
                kw.style.setProperty('--ty', ty);
                kw.style.setProperty('--tz', tz);
                kw.style.setProperty('--rx', rx);
                kw.style.setProperty('--ry', ry);
                kw.style.setProperty('--rz', rz);
                kw.style.setProperty('--d', (0.55 + i * 0.045) + 's'); // starts after existing reveal-up begins
                i++;
                line.appendChild(kw);
            });
        });
    }

    // Service number badges (01, 02, 03, 04): flip each digit in like an odometer
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        servicesGrid.querySelectorAll('article span.text-xs.tracking-widest.text-silver-muted').forEach(badge => {
            const digits = badge.textContent.trim().split('');
            badge.textContent = '';
            badge.classList.add('kw-odo');
            digits.forEach((ch, idx) => {
                const b = document.createElement('b');
                b.textContent = ch;
                b.style.setProperty('--dd', (idx * 0.06) + 's');
                badge.appendChild(b);
            });
        });

        // Service cards: hinge-flip in on scroll, subtle 3D tilt on hover
        const cards = Array.from(servicesGrid.querySelectorAll('article'));
        const cardIO = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idx = cards.indexOf(entry.target);
                    entry.target.style.setProperty('--fd', (Math.max(idx, 0) * 0.12) + 's');
                    entry.target.classList.add('kw-in');
                    cardIO.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });
        cards.forEach(card => {
            cardIO.observe(card);
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                card.style.setProperty('--hx', ((py - 0.5) * -10) + 'deg');
                card.style.setProperty('--hz', ((px - 0.5) * 3) + 'deg');
            });
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--hx', '0deg');
                card.style.setProperty('--hz', '0deg');
            });
        });
    }
});

// Slide in every section below the hero as it's scrolled into view
document.addEventListener('DOMContentLoaded', () => {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length) {
        const revealIO = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('kw-in');
                    revealIO.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        revealEls.forEach(el => revealIO.observe(el));
    }
});

// Testimonials: auto-slide to the next quote, syncs with the existing dot indicators
document.addEventListener('DOMContentLoaded', () => {
    const dataEl = document.getElementById('testimonial-data');
    const contentEl = document.getElementById('testimonial-content');
    const dotsEl = document.getElementById('testimonial-dots');
    if (!dataEl || !contentEl || !dotsEl) return;

    let testimonials = [];
    try { testimonials = JSON.parse(dataEl.textContent); } catch (e) { return; }
    if (!testimonials.length) return;

    const dots = Array.from(dotsEl.querySelectorAll('button'));
    const quoteEl = contentEl.querySelector(':scope > p');
    const authorWrap = contentEl.querySelector(':scope > div');
    const nameEl = authorWrap ? authorWrap.children[0] : null;
    const roleEl = authorWrap ? authorWrap.children[1] : null;

    let current = 0;
    let timer = null;
    const AUTO_MS = 6000;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setDots(idx) {
        dots.forEach((d, i) => {
            if (i === idx) {
                d.className = 'h-1.5 rounded-full transition-all w-8 bg-silver';
            } else {
                d.className = 'h-1.5 rounded-full transition-all w-1.5 bg-white/20 hover:bg-white/40';
            }
        });
    }

    function render(idx) {
        const t = testimonials[idx];
        if (quoteEl) quoteEl.textContent = '"' + t.quote + '"';
        if (nameEl) nameEl.textContent = t.name;
        if (roleEl) roleEl.textContent = t.role;
        setDots(idx);
    }

    function goTo(idx) {
        idx = ((idx % testimonials.length) + testimonials.length) % testimonials.length;
        if (idx === current) return;
        current = idx;
        if (reduceMotion) {
            render(current);
            return;
        }
        contentEl.classList.add('kw-out');
        setTimeout(() => {
            render(current);
            contentEl.classList.remove('kw-out');
            contentEl.classList.add('kw-in-swap');
            requestAnimationFrame(() => requestAnimationFrame(() => {
                contentEl.classList.remove('kw-in-swap');
            }));
        }, 350);
    }

    function next() { goTo(current + 1); }

    function startAuto() {
        stopAuto();
        timer = setInterval(next, AUTO_MS);
    }
    function stopAuto() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    dots.forEach((d, i) => {
        d.addEventListener('click', () => { goTo(i); startAuto(); });
    });

    const card = contentEl.closest('.glass-strong') || contentEl.parentElement;
    if (card) {
        card.addEventListener('mouseenter', stopAuto);
        card.addEventListener('mouseleave', startAuto);
        card.addEventListener('focusin', stopAuto);
        card.addEventListener('focusout', startAuto);
    }

    setDots(current);
    if (!reduceMotion) startAuto();
});
