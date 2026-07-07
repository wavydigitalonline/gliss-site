
document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item, [data-faq-item]');
    const faqButtons = document.querySelectorAll('button[aria-expanded]');
    
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            
            // Find the content div (usually the next sibling or a child)
            const content = btn.nextElementSibling || btn.parentElement.querySelector('[role="region"]');
            if (content) {
                content.style.display = expanded ? 'none' : 'block';
                content.style.maxHeight = expanded ? '0' : 'none';
            }
            
            // Rotate icon
            const icon = btn.querySelector('svg');
            if (icon) {
                icon.style.transform = expanded ? 'rotate(0deg)' : 'rotate(45deg)';
            }
        });
    });

    // Mobile Menu
    const menuBtn = document.querySelector('button[aria-label="Toggle menu"], .mobile-menu-toggle');
    const mobileMenu = document.querySelector('[role="dialog"], #mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.style.display === 'none' || !mobileMenu.style.display;
            mobileMenu.style.display = isHidden ? 'block' : 'none';
        });
    }
});
