/* ============================================================
   D'MARIE VIVRE LEARNING HUB — main.js v5 "Glasslight"
   Nav scroll, mobile menu, scroll reveal, count-up, banner,
   gentle aurora parallax
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── ANNOUNCEMENT BANNER ── */
  const annBar   = document.getElementById('annBar');
  const annClose = document.getElementById('annClose');
  const navWrap  = document.getElementById('navWrap');

  if (annBar && sessionStorage.getItem('annDismissed')) {
    annBar.style.display = 'none';
  }
  annClose?.addEventListener('click', () => {
    annBar.style.display = 'none';
    sessionStorage.setItem('annDismissed', 'true');
    setNavTop();
    setQuickNavTop();
  });

  /* ── NAV: offset for announcement bar (floating pill sits below it) ── */
  const nav = document.getElementById('nav');
  if (!nav) return;

  const setNavTop = () => {
    if (!navWrap) return;
    if (annBar && annBar.style.display !== 'none') {
      navWrap.style.top = (annBar.offsetHeight + 12) + 'px';
    } else {
      navWrap.style.top = '18px';
    }
  };
  setNavTop();
  window.addEventListener('resize', setNavTop, { passive: true });

  /* ── PROGRAM QUICK-NAV: align precisely below the floating nav ──────────
   * The CSS top value is just a sane fallback. The real nav's height varies
   * by screen size and whether the announcement bar is showing, so it's
   * measured directly here rather than guessed — this is what prevents the
   * quick-nav pill from sliding up behind/under the floating nav. ── */
  const quickNav = document.querySelector('.prog-quicknav');
  const setQuickNavTop = () => {
    if (!quickNav || !navWrap) return;
    const navEl = document.getElementById('nav') || navWrap;
    const bottom = navEl.getBoundingClientRect().bottom;
    quickNav.style.top = Math.max(bottom + 10, 0) + 'px';
  };
  if (quickNav) {
    setQuickNavTop();
    window.addEventListener('resize', setQuickNavTop, { passive: true });
    // Re-measure shortly after load too, in case fonts/logo shift the nav's height
    window.addEventListener('load', setQuickNavTop);
    setTimeout(setQuickNavTop, 300);
  }

  /* ── NAV: scroll behaviour ── */
  const updateNav = () => {
    const scrolled = window.scrollY > 64;
    nav.classList.toggle('scrolled', scrolled);
    // hero-over while within a dark hero/page-hero band at the top
    if (document.querySelector('.hero, .page-hero')) {
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

  /* ── CAROUSEL — premium overlapping "peek" carousel ─────────────────────
   * Scroll-snap handles touch swipe natively (works even if this JS fails).
   * This layer adds: arrow buttons, active-card scale/shadow, dot indicator,
   * keyboard arrows, and hides controls entirely when nothing needs scrolling.
   * ─────────────────────────────────────────────────────────────────── */
  const initCarousels = () => {
    document.querySelectorAll('[data-carousel]').forEach((carousel) => {
      const track = carousel.querySelector('.carousel-track');
      if (!track || track.dataset.carouselInit) return;
      track.dataset.carouselInit = 'true';

      const cards = Array.from(track.querySelectorAll('.carousel-card'));
      const prevBtn = carousel.querySelector('.carousel-arrow-prev');
      const nextBtn = carousel.querySelector('.carousel-arrow-next');
      const dotsWrap = carousel.querySelector('.carousel-dots');
      if (dotsWrap && !dotsWrap.children.length) {
        cards.forEach((_, i) => {
          const d = document.createElement('span');
          d.className = 'carousel-dot';
          d.setAttribute('role', 'button');
          d.setAttribute('aria-label', `Go to item ${i + 1}`);
          dotsWrap.appendChild(d);
        });
      }
      const dots = dotsWrap ? Array.from(dotsWrap.children) : [];
      let current = 0;

      const checkScrollNeeded = () => {
        const needed = track.scrollWidth > track.clientWidth + 4;
        carousel.classList.toggle('no-scroll-needed', !needed);
      };
      checkScrollNeeded();
      window.addEventListener('resize', checkScrollNeeded, { passive: true });
      window.addEventListener('load', checkScrollNeeded);
      setTimeout(checkScrollNeeded, 300);

      const setActive = (idx) => {
        current = idx;
        cards.forEach((c, i) => c.classList.toggle('is-active', i === idx));
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        if (prevBtn) prevBtn.disabled = idx === 0;
        if (nextBtn) nextBtn.disabled = idx === cards.length - 1;
      };

      const goTo = (idx) => {
        idx = Math.max(0, Math.min(cards.length - 1, idx));
        setActive(idx);
        cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      };

      prevBtn?.addEventListener('click', () => goTo(current - 1));
      nextBtn?.addEventListener('click', () => goTo(current + 1));
      dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

      // Clicking a dimmed side-card brings it to focus (and only that —
      // stopImmediatePropagation keeps this click from also triggering the
      // lightbox listener that may be bound to the same element)
      cards.forEach((c, i) => {
        c.addEventListener('click', (e) => {
          if (i !== current) { e.preventDefault(); e.stopImmediatePropagation(); goTo(i); }
        });
      });

      // Keyboard support when the track itself is focused
      track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
      });

      // Detect which card is centred as the user swipes/scrolls.
      // NOTE: intersectionRatio is normalized to each card's OWN box, not
      // the viewport — so on initial load, before any scrolling happens,
      // every card that's simply "fully visible" can report ratio ≈1.0
      // simultaneously, regardless of which one is actually centred. If we
      // called setActive() for every qualifying entry, whichever happened
      // to be LAST in that batch would silently win (overwriting earlier
      // calls in the same synchronous forEach) — this was making the final
      // card in the set appear active on fresh page loads instead of the
      // first. Only the single most-visible entry per batch should win.
      const observer = new IntersectionObserver((entries) => {
        let best = null;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.62 && (!best || entry.intersectionRatio > best.intersectionRatio)) {
            best = entry;
          }
        });
        if (best) setActive(cards.indexOf(best.target));
      }, { root: track, threshold: [0.62] });
      cards.forEach((c) => observer.observe(c));

      // Belt-and-suspenders: force the scroll position to the true start,
      // both synchronously and after layout settles, so the carousel can
      // never visually open on anything but the first card.
      track.scrollLeft = 0;
      requestAnimationFrame(() => { if (current === 0) track.scrollLeft = 0; });

      setActive(0);
    });
  };
  initCarousels();


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

  /* ── CONSULTATION REQUEST FORM ─────────────────────────────────────────
   * No backend — builds a pre-filled WhatsApp or email message from the
   * form fields client-side. Works on any static host, no server needed.
   * ─────────────────────────────────────────────────────────────────── */
  const consultForm = document.getElementById('consultForm');
  if (consultForm) {
    const buildMessage = () => {
      const name    = consultForm.querySelector('#cName')?.value.trim()    || '';
      const contact = consultForm.querySelector('#cContact')?.value.trim() || '';
      const reasonEl= consultForm.querySelector('#cReason');
      const reason  = reasonEl ? reasonEl.options[reasonEl.selectedIndex].text : '';
      const message = consultForm.querySelector('#cMessage')?.value.trim() || '';
      return [
        `Hello D'Marie Vivre, I'd like to request a consultation.`,
        ``,
        `Name: ${name}`,
        `Reason: ${reason}`,
        `Contact: ${contact}`,
        ``,
        `Message: ${message}`
      ].join('\n');
    };

    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!consultForm.checkValidity()) { consultForm.reportValidity(); return; }

      const action = e.submitter?.dataset.action || 'whatsapp';
      const text = buildMessage();

      if (action === 'email') {
        const reasonEl = consultForm.querySelector('#cReason');
        const reason = reasonEl ? reasonEl.options[reasonEl.selectedIndex].text : 'Consultation';
        const subject = encodeURIComponent(`Consultation Request — ${reason}`);
        const body = encodeURIComponent(text);
        window.location.href = `mailto:info@dmarievivre.org?subject=${subject}&body=${body}`;
      } else {
        window.open(`https://wa.me/2348068600747?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      }
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

  /* ── GENTLE AURORA PARALLAX ──────────────────────────────────────────
   * Subtle, slow drift of background blobs in response to pointer
   * position. Disabled entirely if the user prefers reduced motion or
   * on touch-only devices (no meaningful pointer position).
   * ─────────────────────────────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const blobs = document.querySelectorAll('.aurora-blob');
  if (blobs.length && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    const tick = () => {
      curX += (targetX - curX) * 0.02;
      curY += (targetY - curY) * 0.02;
      blobs.forEach((b, i) => {
        const depth = (i % 2 === 0) ? 14 : 22;
        b.style.transform = `translate(${curX * depth}px, ${curY * depth}px)`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
