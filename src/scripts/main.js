/* ============================================
   RAETH — Main Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initNavbar();
  initSmoothScroll();
});

/* --- Scroll Reveal (Intersection Observer) --- */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));

  // Pipeline visual glow — separate observer since it uses filter, not opacity
  const pipelineVisual = document.querySelector('.pipeline-visual');
  if (pipelineVisual) {
    const glowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            glowObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    glowObserver.observe(pipelineVisual);
  }
}

/* --- Navbar --- */
function initNavbar() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close mobile nav on link click
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    } else {
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.04)';
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

/* --- Smooth Scroll for Anchor Links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
