// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Mobile menu — single handler (touch+click double-fire was closing instantly)
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function openMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
}

function toggleMenu(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (!mobileMenu) return;
  if (mobileMenu.classList.contains('open')) closeMenu();
  else openMenu();
}

if (navToggle && mobileMenu) {
  // click only — covers mouse + mobile tap without double-toggle
  navToggle.addEventListener('click', toggleMenu);
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
  });
}

document.querySelectorAll('.mobile-menu-link, .mobile-menu-cta').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Scroll to top on load
window.scrollTo(0, 0);

// Reveal animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-x, .reveal-xr').forEach(el => {
  const delay = el.dataset.delay;
  if (delay) el.style.transitionDelay = delay + 's';
  revealObserver.observe(el);
});

// Parallax
let ticking = false;
function updateParallax() {
  document.querySelectorAll('.cinema[data-parallax="true"]').forEach(container => {
    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < 0 || rect.top > vh) return;
    const progress = (vh - rect.top) / (vh + rect.height);
    const offset = (progress - 0.5) * 40;
    const inner = container.querySelector('.cinema-inner');
    if (inner) inner.style.transform = 'translateY(' + offset + 'px)';
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
