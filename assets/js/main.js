/* ============================================================
   D'MARIE VIVRE — main.js
   Navigation, scroll effects, animations, interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV: scroll behaviour ── */
  const nav = document.getElementById('nav');

  const updateNav = () => {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('scrolled', scrolled);
    nav.classList.toggle('hero-mode', !scrolled);
  };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ── NAV: mobile hamburger ── */
  const hamburger    = document.getElementById('navHamburger');
  const mobileMenu   = document.getElementById('mobileMenu');
  const mobileClose  = document.getElementById('mobileMenuClose');
  const mobileLinks  = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  hamburger?.addEventListener('click', () => {
    mobileMenu?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMobileMenu = () => {
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  /* ── COUNT-UP ANIMATION (About section stats) ── */
  const counters = document.querySelectorAll('[data-count]');

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const start    = performance.now();

          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => countObserver.observe(el));

  /* ── ACTIVE NAV LINK based on scroll position ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

  const activateLink = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', activateLink, { passive: true });

  /* ── SMOOTH ANCHOR SCROLL with offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    });
  });

  /* ── PILLAR CARD hover tilt ── */
  document.querySelectorAll('.pillar-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      const tiltX  = (-y * 5).toFixed(2);
      const tiltY  = ( x * 5).toFixed(2);
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── ANNOUNCEMENT BANNER dismiss ── */
  const banner = document.getElementById('announcementBanner');
  const bannerClose = document.getElementById('bannerClose');
  bannerClose?.addEventListener('click', () => {
    banner?.classList.add('hidden');
    sessionStorage.setItem('bannerDismissed', 'true');
  });
  if (sessionStorage.getItem('bannerDismissed')) {
    banner?.classList.add('hidden');
  }

});
