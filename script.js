
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
