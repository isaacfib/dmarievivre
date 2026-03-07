/* ============================================================
   D'MARIE VIVRE LEARNING HUB — main.js v3
   Nav scroll, mobile menu, scroll reveal, count-up, banner
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── ANNOUNCEMENT BANNER ── */
  const annBar   = document.getElementById('annBar');
  const annClose = document.getElementById('annClose');

  if (annBar && sessionStorage.getItem('annDismissed')) {
    annBar.style.display = 'none';
  }
  annClose?.addEventListener('click', () => {
    annBar.style.display = 'none';
    sessionStorage.setItem('annDismissed', 'true');
    // Adjust nav offset since banner is gone
    document.querySelectorAll('.nav').forEach(n => n.style.top = '0');
  });

  /* ── NAV: offset for announcement bar ── */
  const nav = document.getElementById('nav');
  if (!nav) return;

  const setNavTop = () => {
    if (annBar && annBar.style.display !== 'none') {
      nav.style.top = annBar.offsetHeight + 'px';
    } else {
      nav.style.top = '0';
    }
  };
  setNavTop();
  window.addEventListener('resize', setNavTop, { passive: true });

  /* ── NAV: scroll behaviour ── */
  const updateNav = () => {
    const scrolled = window.scrollY > 64;
    nav.classList.toggle('scrolled', scrolled);
    // hero-over only on pages with a hero
    if (document.querySelector('.hero')) {
      nav.classList.toggle('hero-over', !scrolled);
    } else {
      nav.classList.remove('hero-over');
    }
  };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ── MOBILE MENU ── */
  const hamburger  = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  const openMenu = () => {
    mobileMenu?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openMenu);
  mobileClose?.addEventListener('click', closeMenu);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── SCROLL REVEAL ── */
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
  } else {
    // Fallback: show everything immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ── COUNT-UP (for stat numbers) ── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el       = entry.target;
        const target   = parseInt(el.dataset.count, 10);
        const suffix   = el.dataset.suffix || '';
        const duration = 1600;
        const start    = performance.now();

        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObs.observe(el));
  }

  /* ── SMOOTH ANCHOR SCROLL with nav offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* ── ACTIVE NAV LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  const markActive = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 110) current = s.id;
    });
    navAs.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle(
        'active',
        href === `#${current}` || href?.endsWith(`#${current}`)
      );
    });
  };
  window.addEventListener('scroll', markActive, { passive: true });

  /* ── FAQ ACCORDION (resources page) ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const body = item.querySelector('.faq-answer');
    btn?.addEventListener('click', () => {
      const open = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!open) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ── TABS (shop / programs pages) ── */
  document.querySelectorAll('.tab-nav').forEach(nav => {
    nav.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('[data-tabs]') || btn.closest('section');
        const target = btn.dataset.tab;

        group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        group.querySelector(`.tab-panel[data-panel="${target}"]`)?.classList.add('active');
      });
    });
  });

  /* ── LIGHTBOX for gallery images ── */
  const galleryImgs = document.querySelectorAll('[data-lightbox]');
  if (galleryImgs.length) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);
      z-index:9999;align-items:center;justify-content:center;cursor:zoom-out;
    `;
    const img = document.createElement('img');
    img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;';
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    galleryImgs.forEach(el => {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', () => {
        img.src = el.dataset.lightbox || el.src;
        overlay.style.display = 'flex';
      });
    });
    overlay.addEventListener('click', () => overlay.style.display = 'none');
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') overlay.style.display = 'none';
    });
  }

});

  /* ── IMAGE FALLBACK SYSTEM ─────────────────────────────────────────────
   * Listens for any <img> error on the page (delegated, capture phase).
   * Adds .img-broken to the img and .img-failed to its direct parent.
   * CSS then hides the broken img and shows a styled placeholder.
   * ─────────────────────────────────────────────────────────────────── */
  document.addEventListener('error', function(e) {
    const img = e.target;
    if (img.tagName !== 'IMG') return;
    // Don't re-trigger if already handled
    if (img.classList.contains('img-broken')) return;
    img.classList.add('img-broken');
    const parent = img.closest('[data-fallback]') || img.parentElement;
    if (parent) parent.classList.add('img-failed');
  }, true /* capture — fires before bubbling */);
