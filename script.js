
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
});
