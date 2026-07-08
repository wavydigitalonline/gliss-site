
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
