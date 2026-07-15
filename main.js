// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile menu
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('open');
  });
}

if (mobileMenuClose && mobileMenu) {
  mobileMenuClose.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.remove('open');
  });
}

document.querySelectorAll('.mobile-menu-link, .mobile-menu-cta').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  }
});

// Scroll to top on load
window.scrollTo(0, 0);

// Reveal animations (IntersectionObserver)
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
    const progress = (vh - rect.top) / (rect.height + vh);
    const clamped = Math.max(0, Math.min(1, progress));
    const y = -5 + clamped * 10;
    const img = container.querySelector('img');
    if (img) img.style.transform = `translate3d(0, ${y}%, 0)`;
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
}, { passive: true });
updateParallax();

// Particles
const pfield = document.querySelector('.pfield');
if (pfield) {
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${(i * 8.3) % 100}%`;
    p.style.top = `${(i * 17) % 100}%`;
    p.style.animationDuration = `${6 + i}s`;
    p.style.animationDelay = `${i * 0.5}s`;
    pfield.appendChild(p);
  }
}

// Year
document.getElementById('year')?.textContent = new Date().getFullYear();

// Contact form → WhatsApp
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const get = (name) => {
    const el = form.querySelector(`[name="${name}"]`);
    return el?.value || '—';
  };
  const msg = `Hi Gliss! I'd like to book a free consultation.%0A%0AName: ${get('name')}%0AEmail: ${get('email')}%0ABusiness: ${get('business')}%0APhone: ${get('phone')}%0AService: ${get('service')}%0AMessage: ${get('message')}`;
  window.open(`https://wa.me/27714636308?text=${msg}`, '_blank');
});
