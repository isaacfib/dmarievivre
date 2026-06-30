# Changelog

All notable changes to the D'Marie Vivre Learning Hub website are tracked here.
Versioning follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

- **MAJOR** — a full redesign or structural rebuild
- **MINOR** — new pages/sections, or a significant cleanup/refactor pass (no breaking change)
- **PATCH** — small fixes: copy edits, broken links, minor styling tweaks

---

## v1.4.0 — 2026-06-29

**Emoji-to-icon pass, book cover redesign, and a real grid bug fix.**

### Fixed
- **KidsPray's "What is KidsPray" section had a genuine mobile bug**, independent
  of zoom level: an inline `style="grid-template-columns:repeat(3,1fr)"` was
  beating every responsive breakpoint in the stylesheet (inline styles always
  win over external CSS unless the external rule uses `!important`), forcing
  3 cramped columns on every screen size, always. Converted this section to
  the carousel component, which removes the bug at its root — there's no
  hardcoded column count left to fight responsive rules.
- **Swept the whole site for the same bug pattern.** Found 3 more instances
  (service-card rows on Book, KidsPray, and Learning Hub) with zero responsive
  handling at all. Gave them a proper `.service-grid-3` class (3 cols desktop,
  2 cols tablet, 1 col mobile) instead of a bare inline style.
- Capped pinch-zoom at 5x (`maximum-scale=5.0`) across all 9 pages. This
  doesn't disable zoom (`user-scalable=no` would be an accessibility
  violation and was deliberately avoided) but reduces how far a layout can
  be stretched by an accidental extreme pinch.

### Changed — Emoji → custom SVG icons, site-wide
Every platform emoji (📍 ⏰ 👶 🚗 📚 👧 ✍️ 💻 🎨 📅 🤝 👁️ 📋 🤗 🎓 🏫 👩‍🏫 🎁 📺
📰 🎥 🎤 ✓ ✕, and the gold-package ⭐) replaced with hand-drawn line-icon SVGs
matching the rest of the brand's icon language. Platform emoji render
inconsistently across iOS/Android/desktop/Windows and read as template-y;
custom icons are consistent everywhere and feel intentional.
- The ⭐ "Most Popular" / "Flagship" mark specifically replaced with a custom
  4-point geometric sparkle — cleaner and more premium than a platform star,
  and immune to emoji-font rendering differences
- All 29 checkmarks in Learning Hub's "what's included" lists converted from
  the ✓ glyph to a proper SVG check
- Close buttons (announcement bar, mobile menu) converted from the ✕ glyph
  to an SVG X — same reasoning, consistent rendering

### Redesigned — Book cover presentation
- Replaced the old "two raw images side by side" hero treatment with a new
  **floating cover** component (`.cover-stage` / `.cover-frame`): a single
  confident cover shot with a soft layered shadow, a faint second "page"
  peeking from behind for implied depth, and a subtle warm glow — no literal
  device/phone framing anywhere
- This addresses the dated phone-mockup look flagged from screenshots: that
  framing was baked into the source photo's pixels (not something the site's
  code was adding), so the new component crops in tighter via `object-fit`
  and biases the crop position to minimize the visible artifact today, while
  being designed to look excellent with any clean cover photography dropped
  in later — no further code changes will be needed once a proper photo exists
- Applied consistently everywhere the cover appears: Book page hero, Book page
  details section, Homepage Book Spotlight
- The "Inside the Book" gallery (already a carousel as of v1.3.0) now does
  the job of showing multiple images, so the hero only needs to make one
  confident first impression rather than doubling up

---

## v1.3.0 — 2026-06-28

**New: premium overlapping "peek" carousel** — for compactness and a more
gallery-like browsing feel, wherever content is meant to be sampled rather
than exhaustively compared side-by-side.

### Added
- New reusable carousel component (`assets/css/style.css` + `assets/js/main.js`).
  Built on native CSS scroll-snap, so touch-swipe works perfectly even if JS
  fails to load — arrows, dots, and the active-card scale/shadow effect are
  progressive enhancement layered on top, not the only way it works.
- The active (centred) card sits forward — full scale, full opacity, lifted
  shadow — while neighbours are dimmed, scaled down, and tucked partially
  *behind* it via negative-margin overlap, giving a genuine layered "deck"
  feel rather than a flat slider.
- **Adaptive**: if a carousel's content already fits without needing to
  scroll (common on wide desktop screens with only 3–4 items), the arrows
  and dots disappear automatically and it presents as a clean static row —
  it never fakes interactivity that isn't there.
- Keyboard support (arrow keys when focused) and full ARIA labelling.

### Applied to
- Core Values — Home, About, Shop (replacing the 4-card vertical stack,
  which was a lot of scrolling on mobile for content meant to be a quick
  browse, not a comparison task)
- "Inside the Book" gallery — Book page
- Hub photo gallery — Resources page (also future-proofs this section for
  when more real photos are added — it'll keep working cleanly whether
  there are 3 photos or 30)

### Deliberately left as a grid (not converted)
- **Programs** (Home, Learning Hub) — comparison content where seeing all
  options at once matters more than compact browsing
- **Gift Packages** (Shop) — same reasoning; side-by-side aids the actual
  pricing/tier comparison a visitor is trying to make
- **KidsPray's 3-card intro** — already compact enough at 3 short items
  that a carousel would add interaction overhead without a real space payoff

---

## v1.2.0 — 2026-06-28

**Bug fixes + UI polish** — caught from real on-device screenshots.

### Fixed
- Sticky quick-nav on Learning Hub was overlapping/peeking out from behind the floating
  nav on mobile. Root cause: its sticky position was a hardcoded guess that didn't account
  for the nav's actual height (which varies by screen size and whether the announcement
  bar is showing). Now measured and set dynamically in `main.js`.
- Program detail placeholders (and the real photos that will replace them) were rendering
  far taller than intended on mobile. Root cause: a `min-height:400px` on the grid
  container wasn't cleared when the layout stacked to one column, and CSS grid's default
  stretch behavior dumped all the leftover space into the image area.

### Changed
- Image fallback placeholders now size by `aspect-ratio` (16:9 landscape, 3:4 for
  portrait contexts like Ms. Mary's photo and book covers) instead of fixed `min-height` —
  more robust against being stretched oddly by whatever container they end up in
- Fallback icon/label opacity increased so empty states read as an intentional design
  choice rather than a washed-out gray placeholder
- Mobile menu background glow tightened to smaller, brighter corner spots instead of a
  wide wash that was blending into a muddy mid-tone
- Mobile page-hero padding reduced (128px→104px top, 64px→48px bottom) for a lighter
  first impression before reaching real content

---

## v1.1.0 — 2026-06-28

**Decluttering pass** — same design system, leaner and more premium-feeling content.

### Removed
- Fake homepage testimonials (placeholder quotes, never real — removed rather than left live)
- Redundant trust bar (re-listed program names already covered in depth one scroll later)
- Duplicate 4-card Gift Package grid that appeared identically on Home, KidsPray, *and* Shop

### Changed
- Home & KidsPray gift package sections now show one featured card + a tier list + a
  "Compare All 4 Packages" link to Shop (the single canonical source for full package detail)
- Program cards (homepage): removed rainbow-colored badge overlays (purple/yellow/green),
  trimmed chip tags from up to 5 down to 2 per card, removed badges that just repeated the title
- Hero stats: 4 → 3 (dropped a stat duplicating the hero eyebrow text directly above it)
- Footer "Programs" and "Shop & Resources" columns standardized to 4 links + a "view all" link,
  across all 9 pages (several had grown to 7–8 redundant links pointing at content already in nav)
- Resources page: Handwriting Tips redesigned as a compact single-card row list instead of
  repeating the exact 3-card grid layout used by Reading Tips directly above it

---

## v1.0.0 — 2026-06-24

**Initial premium rebuild** — complete reimagining of the previously abandoned project.

### Added
- Full "Glasslight" gentle-glassmorphism design system (`assets/css/style.css`) — soft aurora
  light blobs, frosted glass cards, brand orange/navy preserved, periwinkle counter-tone added
- All 8 original pages rebuilt: Home, Learning Hub, KidsPray, Shop, Book, About, Resources, Contact
- **New page:** `media.html` — Media & Press, built on real sources (THISDAY feature, YouTube
  video), expandable structure for future books/press, no-backend consultation request form
- Adult Education given a full dedicated section on Learning Hub (was missing despite being
  a confirmed core program)
- About page updated with verified credentials (Educational Psychologist & Consultant,
  Founder & Executive Director) sourced from the THISDAY feature
- Mobile-first hardening: lighter blur on phones, 16px form inputs (prevents iOS auto-zoom),
  44px minimum tap targets, `scroll-margin-top` on all anchors, `dvh` hero height
- Image fallback system: any missing/broken photo shows a styled glass-tinted placeholder
  instead of a broken image icon

---

## How to release a new version

```bash
cd ~/Desktop/dmarievivre
cp -R ~/Downloads/build/. ~/Desktop/dmarievivre/
git add -A
git commit -m "vX.Y.Z — <one-line summary>"
git tag -a vX.Y.Z -m "vX.Y.Z — <one-line summary>"
git push origin main
git push origin vX.Y.Z
```
