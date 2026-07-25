/**
 * GLISS — Animation Observer
 * Lightweight Intersection Observer fallback for browsers
 * that do not yet fully support CSS scroll-driven animations.
 * Include after main.js
 */

(function () {
  'use strict';

  // Only run if scroll-driven animations are not supported
  const supportsScrollTimeline = CSS.supports('animation-timeline: view()');

  if (supportsScrollTimeline) {
    // Modern browsers handle everything via CSS
    document.documentElement.classList.add('scroll-driven');
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: unobserve after first reveal for performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to observe
  const selectors = [
    '.reveal',
    '.reveal-x',
    '.reveal-xr',
    '.enter-up',
    '.enter-up-lg',
    '.enter-fade',
    '.service-item',
    '.outcome',
    '.role',
    '.founder-text',
    '.home-sec',
    '.section',
    '.services-list',
    '.roles-grid',
    '.founder-grid',
    '.space-y-5'
  ];

  document.querySelectorAll(selectors.join(',')).forEach((el) => {
    observer.observe(el);
  });

  // Also observe parent containers so children can react
  document.querySelectorAll('.home-sec, .section').forEach((section) => {
    observer.observe(section);
  });
})();
