/* D'Marie Vivre Learning Hub — app.js (vanilla, no dependencies) */
(function () {
  'use strict';
  var CFG = window.DMV || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var naira = function (n) { return '₦' + Number(n).toLocaleString('en-NG'); };
  var today = function () { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

  document.documentElement.classList.add('js');
  if (CFG.showPlaceholders === false) document.documentElement.classList.add('no-ph');

  /* real photos replace placeholders automatically when the file exists */
  $$('[data-photo]').forEach(function (f) { var im = new Image(); im.onload = function () { im.alt = f.getAttribute('data-alt') || ''; im.loading = 'lazy'; im.decoding = 'async'; f.innerHTML = ''; f.appendChild(im); f.classList.add('loaded'); }; im.src = f.getAttribute('data-photo'); });

  /* Hub email links are filled from config.js */
  $$('[data-mail]').forEach(function (a) { if (CFG.email && CFG.email.indexOf('@') > 0 && CFG.email.indexOf('SET-') !== 0) { a.href = 'mailto:' + CFG.email; a.textContent = a.textContent || CFG.email; } else { a.removeAttribute('href'); a.textContent = a.textContent || 'Email us via the enquiry form'; } });

  /* header shadow */
  var top = $('.top');
  var onScroll = function () { if (top) top.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* reveal */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else { $$('.rv').forEach(function (el) { el.classList.add('in'); }); }

  /* more sheet */
  var sheet = $('#sheet'), bg = $('#sheetbg');
  function sheetOpen(on) { if (!sheet) return; sheet.classList.toggle('on', on); bg.classList.toggle('on', on); sheet.setAttribute('aria-hidden', on ? 'false' : 'true'); if (on) { var a = $('a', sheet); a && a.focus(); } }
  $$('[data-more]').forEach(function (b) { b.addEventListener('click', function () { sheetOpen(true); }); });
  if (bg) bg.addEventListener('click', function () { sheetOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { sheetOpen(false); drawerOpen(false); } });

  /* expiring offers */
  $$('[data-until]').forEach(function (el) { if (today() > el.getAttribute('data-until')) { if (el.hasAttribute('data-hide')) el.hidden = true; if (el.hasAttribute('data-show-after')) el.hidden = false; } });
  $$('[data-show-after]').forEach(function (el) { el.hidden = today() <= el.getAttribute('data-until'); });

  /* programme jump bar highlight */
  var jump = $$('.jump a');
  if (jump.length && 'IntersectionObserver' in window) {
    var secs = jump.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
    var jo = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { jump.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); }); var on = $('.jump a.on'); on && on.scrollIntoView({ inline: 'center', block: 'nearest' }); } }); }, { rootMargin: '-30% 0px -60% 0px' });
    secs.forEach(function (s) { jo.observe(s); });
  }

  /* ---------- events / calendar ---------- */
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var TYPE = { free: 'Free celebration', paid: 'Programme', ad: 'Adult learning', ws: 'Workshop' };
  function evDate(e) {
    if (e.date) { var d = new Date(e.date + 'T12:00:00'); return { top: DAYS[d.getDay()], big: d.getDate(), small: MONTHS[d.getMonth()].slice(0, 3), m: false }; }
    return { top: '', big: e.when || MONTHS[e.month - 1], small: '', m: true };
  }
  function evCard(e, past) {
    var d = evDate(e);
    var pill = e.fee === 0 ? '<span class="pill free">Free</span>' : (e.fee ? '<span class="pill paid">' + naira(e.fee) + (e.feeNote ? ' ' + esc(e.feeNote) : '') + '</span>' : '');
    if (e.tba) pill += ' <span class="pill tba">Date to be announced</span>';
    var ics = e.date ? '<a class="mini" href="#" data-ics="' + esc(e.id) + '">+ Add to calendar</a>' : '';
    return '<article class="ev' + (past ? ' past' : '') + '" data-type="' + e.type + '"><div class="d' + (d.m ? ' m' : '') + '">' + (d.m ? '<b>' + esc(d.big) + '</b>' : '<span>' + d.top + '</span><b>' + d.big + '</b><span>' + d.small + '</span>') + '</div><div><h3>' + esc(e.title) + '</h3><p>' + esc(e.blurb) + '</p><div class="row">' + pill + ics + '<a class="mini" href="' + CFG.base + 'contact.html?topic=' + encodeURIComponent(e.topic || e.title) + '#enquire">Ask about this</a></div></div></article>';
  }
  function icsEscape(s) { return String(s).replace(/[\\;,]/g, function (c) { return '\\' + c; }).replace(/\n/g, '\\n'); }
  function icsFor(list) {
    var L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//D\'Marie Vivre Learning Hub//2027//EN', 'CALSCALE:GREGORIAN'];
    list.forEach(function (e) {
      if (!e.date) return;
      var s = e.date.replace(/-/g, ''); var n = new Date(e.date + 'T12:00:00'); n.setDate(n.getDate() + 1);
      var en = n.getFullYear() + String(n.getMonth() + 1).padStart(2, '0') + String(n.getDate()).padStart(2, '0');
      L.push('BEGIN:VEVENT', 'UID:' + e.id + '@dmarievivre.org', 'DTSTAMP:20261101T000000Z', 'DTSTART;VALUE=DATE:' + s, 'DTEND;VALUE=DATE:' + en, 'SUMMARY:' + icsEscape(e.title + ' – D\'Marie Vivre Hub'), 'LOCATION:' + icsEscape('D\'Marie Vivre Learning Hub, 139 Trademore Avenue, Lugbe, Abuja'), 'DESCRIPTION:' + icsEscape(e.blurb), 'END:VEVENT');
    });
    L.push('END:VCALENDAR'); return L.join('\r\n');
  }
  function download(name, text, type) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: type })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  var evBox = $('#events'), nextBox = $('#nextup');
  if (evBox || nextBox) {
    fetch(CFG.base + 'assets/data/events.json').then(function (r) { return r.json(); }).then(function (data) {
      var list = data.events;
      document.addEventListener('click', function (ev) {
        var t = ev.target.closest('[data-ics]'); if (t) { ev.preventDefault(); var one = list.filter(function (e) { return e.id === t.getAttribute('data-ics'); }); download(t.getAttribute('data-ics') + '.ics', icsFor(one), 'text/calendar'); }
        if (ev.target.closest('#icsall')) { ev.preventDefault(); download('dmarie-vivre-2027.ics', icsFor(list), 'text/calendar'); }
      });
      if (nextBox) {
        var t0 = today();
        var up = list.filter(function (e) { var end = e.end || e.date || (e.month ? '2027-' + String(e.month).padStart(2, '0') + '-28' : '9999'); return end >= t0; }).slice(0, 3);
        nextBox.innerHTML = up.map(function (e) { return evCard(e, false); }).join('');
      }
      if (evBox) {
        var cur = 'all';
        var draw = function () {
          var html = '', last = -1, t1 = today();
          list.forEach(function (e) {
            if (cur !== 'all' && e.type !== cur) return;
            var m = e.month || (e.date ? Number(e.date.slice(5, 7)) : 0);
            if (m !== last) { html += '<div class="month">' + MONTHS[m - 1] + ' 2027</div>'; last = m; }
            var end = e.end || e.date || ''; html += evCard(e, end && end < t1);
          });
          evBox.innerHTML = html || '<div class="empty">Nothing in this category yet.</div>';
        };
        $$('.filters button').forEach(function (b) { b.addEventListener('click', function () { cur = b.getAttribute('data-f'); $$('.filters button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); draw(); }); });
        draw();
      }
    }).catch(function () { if (evBox) evBox.innerHTML = '<div class="empty">The calendar could not load. Please check your connection and try again.</div>'; });
  }

  /* ---------- books + basket ---------- */
  var basket = store.get('dmv_basket', {});
  var BOOKS = [];
  var bar = $('#basketbar'), drawer = $('#drawer');
  function count() { return Object.keys(basket).reduce(function (n, k) { return n + basket[k]; }, 0); }
  function total() { var t = 0, priced = true; Object.keys(basket).forEach(function (id) { var b = BOOKS.filter(function (x) { return x.id === id; })[0]; if (!b) return; if (b.price) t += b.price * basket[id]; else priced = false; }); return { t: t, all: priced }; }
  function saveBasket() { store.set('dmv_basket', basket); renderBasket(); }
  function drawerOpen(on) { if (!drawer) return; drawer.classList.toggle('on', on); bg && bg.classList.toggle('on', on); }
  $$('[data-basket]').forEach(function (b) { b.addEventListener('click', function () { drawerOpen(true); }); });
  $$('[data-close-drawer]').forEach(function (b) { b.addEventListener('click', function () { drawerOpen(false); }); });
  if (bg) bg.addEventListener('click', function () { drawerOpen(false); });
  function renderBasket() {
    var n = count();
    $$('[data-basket-count]').forEach(function (e) { e.textContent = n; e.hidden = !n; });
    if (bar) { bar.classList.toggle('on', n > 0 && !(drawer && drawer.classList.contains('on'))); var s = total(); $('#bbtxt', bar).innerHTML = '<b>' + n + ' item' + (n > 1 ? 's' : '') + '</b>' + (s.t ? ' · ' + naira(s.t) + (s.all ? '' : '+') : ''); }
    var list = $('#blines'); if (!list) return;
    var ids = Object.keys(basket).filter(function (id) { return BOOKS.some(function (b) { return b.id === id; }); });
    if (!ids.length) { list.innerHTML = '<div class="empty">Your order list is empty.<br>Add books and send the list to us.</div>'; $('#bform').hidden = true; $('#btotal').hidden = true; return; }
    $('#bform').hidden = false; $('#btotal').hidden = false;
    list.innerHTML = ids.map(function (id) { var b = BOOKS.filter(function (x) { return x.id === id; })[0]; return '<div class="line"><div class="nm">' + esc(b.title) + '<small>' + (b.price ? naira(b.price) + ' each' : 'Price confirmed by the Hub') + '</small></div><div class="qty"><button type="button" data-q="-1" data-id="' + id + '" aria-label="Fewer">−</button><span>' + basket[id] + '</span><button type="button" data-q="1" data-id="' + id + '" aria-label="More">+</button></div></div>'; }).join('');
    var s2 = total(); $('#btotal').innerHTML = '<span>Estimated total</span><span>' + (s2.t ? naira(s2.t) + (s2.all ? '' : ' + priced on request') : 'Confirmed by the Hub') + '</span>';
  }
  function orderText() {
    var lines = Object.keys(basket).map(function (id) { var b = BOOKS.filter(function (x) { return x.id === id; })[0]; return b ? basket[id] + ' x ' + b.title + (b.price ? ' (' + naira(b.price) + ' each)' : '') : ''; }).filter(Boolean);
    var s = total(); return lines.join('\n') + (s.t ? '\nEstimated total: ' + naira(s.t) + (s.all ? '' : ' + unpriced items') : '');
  }
  var shelf = $('#shelf');
  if (shelf || drawer) {
    fetch(CFG.base + 'assets/data/books.json').then(function (r) { return r.json(); }).then(function (d) {
      var preview = /[?&]preview/.test(location.search);
      BOOKS = d.books.filter(function (b) { return (!b.draft || preview) && !(b.placeholder && CFG.showPlaceholders === false); });
      if (shelf) drawShelf(d);
      renderBasket();
    }).catch(function () { if (shelf) shelf.innerHTML = '<div class="empty">The book list could not load. Please check your connection and try again.</div>'; });
  }
  var PAL = ['#ff6b00', '#2f9bf0', '#2eb067', '#7b5cf0', '#e5484d', '#1f1c52', '#d98a00', '#0e8fa3'];
  function cover(b, i) {
    var c = PAL[(b.hue != null ? b.hue : i) % PAL.length];
    if (b.placeholder) return '<div class="cover ph-cover"><span class="t">' + esc(b.title) + '</span><span class="a">Cover placeholder</span></div>';
    var img = b.cover ? '<img src="' + esc(b.cover) + '" alt="Cover of ' + esc(b.title) + '" loading="lazy" onerror="this.remove();this.parentNode&&this.parentNode.classList.remove(\'has-img\')">' : '';
    return '<div class="cover' + (b.cover ? ' has-img' : '') + '" style="background:linear-gradient(155deg,' + c + ',' + c + 'cc 55%,#1f1c52)">' + img + '<span class="t">' + esc(b.title) + '</span><span class="a">' + esc(b.author || '') + '</span></div>';
  }
  function drawShelf(d) {
    var cats = ['All'].concat(d.categories || []);
    var fb = $('#bfilters'); var cur = 'All', q = '';
    if (fb) fb.innerHTML = cats.map(function (c, i) { return '<button type="button" data-c="' + esc(c) + '" aria-pressed="' + (i === 0) + '">' + esc(c) + '</button>'; }).join('');
    function draw() {
      var only = shelf.getAttribute('data-only');
      var items = BOOKS.filter(function (b) { return (!only || b.id === only) && (cur === 'All' || b.category === cur) && (!q || (b.title + ' ' + (b.author || '') + ' ' + (b.category || '')).toLowerCase().indexOf(q) > -1); });
      var lim = Number(shelf.getAttribute('data-limit')) || 0; if (lim) items = items.slice(0, lim);
      var html = items.map(function (b, i) {
        var n = basket[b.id] || 0;
        var ctl = b.placeholder ? '<span class="pill tba">Coming soon</span>' : b.soldOut ? '<span class="pill tba">Sold out</span>' : (n ? '<div class="qty"><button type="button" data-q="-1" data-id="' + b.id + '" aria-label="Fewer">−</button><span>' + n + '</span><button type="button" data-q="1" data-id="' + b.id + '" aria-label="More">+</button></div>' : '<button type="button" class="btn btn-p add" data-add="' + b.id + '">Add</button>');
        return '<article class="book">' + cover(b, i) + '<div class="body"><h3>' + esc(b.title) + '</h3><div class="by">' + esc(b.author || '') + '</div><div class="tags">' + (b.category ? '<span>' + esc(b.category) + '</span>' : '') + (b.age ? '<span>Ages ' + esc(b.age) + '</span>' : '') + '</div><div class="buy"><span class="price' + (b.price ? '' : ' ask') + '">' + (b.price ? naira(b.price) : (b.placeholder ? 'Price to come' : 'Ask for price')) + '</span>' + ctl + '</div></div></article>';
      }).join('');
      shelf.innerHTML = html || '<div class="empty" style="grid-column:1/-1">No books match your search. <a href="' + CFG.base + 'contact.html?topic=Bookshop#enquire">Ask us for a title</a>.</div>';
    }
    draw();
    fb && fb.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; cur = b.getAttribute('data-c'); $$('button', fb).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); draw(); });
    var si = $('#bsearch'); si && si.addEventListener('input', function () { q = si.value.trim().toLowerCase(); draw(); });
    shelf._draw = draw;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-add]'); var q = e.target.closest('[data-q]');
    if (a) { basket[a.getAttribute('data-add')] = 1; saveBasket(); shelf && shelf._draw && shelf._draw(); }
    if (q) { var id = q.getAttribute('data-id'); basket[id] = (basket[id] || 0) + Number(q.getAttribute('data-q')); if (basket[id] <= 0) delete basket[id]; saveBasket(); shelf && shelf._draw && shelf._draw(); }
  });

  /* ---------- forms: deliver to the Hub email ---------- */
  function setStatus(f, cls, msg) { var s = $('.status', f); s.className = 'status ' + cls; s.textContent = msg; s.setAttribute('role', 'status'); }
  function send(f, subject, fields, onOk) {
    if ($('.hp input', f) && $('.hp input', f).value) return; /* spam trap */
    var btn = $('button[type=submit]', f); btn.disabled = true; setStatus(f, 'work', 'Sending…');
    var body = { _subject: subject, _template: 'table', _captcha: 'false' };
    Object.keys(fields).forEach(function (k) { body[k] = fields[k]; });
    if (fields.Email) body._replyto = fields.Email;
    var mailto = 'mailto:' + CFG.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(Object.keys(fields).map(function (k) { return k + ': ' + fields[k]; }).join('\n'));
    if (!navigator.onLine) { btn.disabled = false; setStatus(f, 'err', 'You appear to be offline. Please reconnect and try again, or message us on WhatsApp.'); return; }
    fetch('https://formsubmit.co/ajax/' + CFG.email, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok || j.success === 'false' || j.success === false) throw new Error('x'); }); })
      .then(function () { setStatus(f, 'ok', 'Thank you! Your message has reached the Hub. We will contact you shortly.'); f.reset(); onOk && onOk(); })
      .catch(function () {
        setStatus(f, 'err', 'We could not send this automatically. Tap below to send it from your email app, or use WhatsApp.');
        var s = $('.status', f); s.innerHTML += ' <a href="' + mailto + '" style="color:inherit;text-decoration:underline">Send by email</a>';
      })
      .then(function () { btn.disabled = false; });
  }
  var wa = function (txt) { return 'https://wa.me/' + CFG.wa + '?text=' + encodeURIComponent(txt); };
  var ef = $('#enquiry');
  if (ef) {
    var p = new URLSearchParams(location.search); var topic = p.get('topic');
    if (topic) { var sel = $('select[name=Topic]', ef); var o = $$('option', sel).filter(function (x) { return x.value.toLowerCase() === topic.toLowerCase(); })[0]; if (o) sel.value = o.value; else { $('textarea[name=Message]', ef).value = 'I would like to ask about: ' + topic + '.\n'; } }
    var fields = function () { var o = {}; $$('input[name],select[name],textarea[name]', ef).forEach(function (el) { if (el.closest('.hp')) return; if (el.value) o[el.name] = el.value; }); return o; };
    ef.addEventListener('submit', function (e) { e.preventDefault(); var fl = fields(); send(ef, 'Website enquiry: ' + (fl.Topic || 'General') + ' – ' + fl.Name, fl); });
    var wb = $('#enqwa'); wb && wb.addEventListener('click', function () { var fl = fields(); wb.href = wa('Hello D\'Marie Vivre. ' + (fl.Topic ? 'Enquiry: ' + fl.Topic + '. ' : '') + (fl.Message || '') + (fl.Name ? ' – ' + fl.Name : '')); });
  }
  var bf = $('#bform');
  if (bf) {
    bf.addEventListener('submit', function (e) { e.preventDefault(); var fl = {}; $$('input[name],select[name],textarea[name]', bf).forEach(function (el) { if (!el.closest('.hp') && el.value) fl[el.name] = el.value; }); fl.Order = orderText(); send(bf, 'Book order request – ' + fl.Name, fl, function () { basket = {}; saveBasket(); shelf && shelf._draw && shelf._draw(); }); });
    var bw = $('#bwa'); bw && bw.addEventListener('click', function () { var n = $('input[name=Name]', bf).value; bw.href = wa('Hello D\'Marie Vivre. I would like to order these books:\n' + orderText() + (n ? '\n– ' + n : '')); });
  }
  var nf = $('#notify');
  if (nf) nf.addEventListener('submit', function (e) { e.preventDefault(); var fl = {}; $$('input[name]', nf).forEach(function (el) { if (!el.closest('.hp') && el.value) fl[el.name] = el.value; }); send(nf, 'Notify me: Kidspray Fun Art – ' + fl.Name, fl); });

  /* lazy video */
  var vb = $('#ytplay');
  if (vb) vb.addEventListener('click', function () { var f = document.createElement('iframe'); f.src = 'https://www.youtube-nocookie.com/embed/glQ0uyShjLg?autoplay=1&rel=0'; f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true; f.title = 'Ms. Mary in conversation'; vb.replaceWith(f); });

  /* ---------- PWA ---------- */
  var deferred;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; $$('.installbar').forEach(function (b) { b.classList.add('on'); }); });
  $$('.installbar').forEach(function (b) { b.addEventListener('click', function () { if (deferred) { deferred.prompt(); deferred = null; b.classList.remove('on'); } }); });
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.navigator.standalone && !matchMedia('(display-mode: standalone)').matches;
  if (ios) $$('.iosHint').forEach(function (h) { h.hidden = false; });
  window.addEventListener('appinstalled', function () { $$('.installbar').forEach(function (b) { b.classList.remove('on'); }); });
  if (CFG.pwa !== false && 'serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register(CFG.base + 'sw.js').catch(function () {}); });
  }
})();
