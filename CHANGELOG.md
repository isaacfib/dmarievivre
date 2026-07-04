# Changelog

All notable changes to the D'Marie Vivre Learning Hub website are tracked here.
Versioning follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

- **MAJOR** — a full redesign or structural rebuild
- **MINOR** — new pages/sections, or a significant cleanup/refactor pass (no breaking change)
- **PATCH** — small fixes: copy edits, broken links, minor styling tweaks

---

## v1.6.0 — 2026-07-02

**Bug fixes from real device/browser screenshots, a book cover redesign, and a new page.**

### Fixed
- **"7+ Programs, One Learning Hub" CTA card went invisible on hover** — both
  desktop and mobile. Root cause: the general `.prog-card:hover` rule swaps
  in a near-white translucent background (correct for the light program
  cards), but this card inherits `.prog-card` as a base class too, so
  hovering was replacing its dark navy gradient entirely — washing out
  every bit of white text and every icon against a now-near-white
  background. Added a specific `.prog-card-cta:hover` override that keeps
  the dark gradient.
- **Mobile scroll felt jittery/"jacking"** when scrolling past a carousel
  section and reversing direction. Root cause: carousel tracks had no
  `touch-action` set, so the browser had to disambiguate every touch
  gesture between "the page wants to scroll vertically" and "this nested
  element wants to scroll horizontally" — with mandatory scroll-snap
  fighting an ambiguous gesture, that disambiguation is exactly what
  produces a stuttery, dragging feel. Added `touch-action:pan-x` to
  carousel tracks (so vertical gestures pass straight through to the page)
  and softened `scroll-snap-type` from `mandatory` to `proximity`
  site-wide, for a less grabby feel generally.
- **Carousels read as cramped/"stuck"** on desktop. Reworked the overlap
  math: reduced card overlap (46px → 28px) so neighbouring cards reveal
  meaningfully more of themselves instead of being mostly hidden behind
  the active card, raised inactive-card opacity (.5 → .68) so unfocused
  content reads as clearly present rather than ghosted, and pushed arrows
  further outside the card zone (6px → 20px) so they never visually sit on
  top of a peeking card's text — all three combined were contributing to
  the "jammed together" appearance.
- **Mobile menu's WhatsApp pill could look "cut" at the sides.** Added
  `white-space:nowrap` and explicit `box-sizing` — without it, if the pill
  text ever wrapped to two lines on a narrow screen, the fully-rounded
  pill shape (radius derived from box height) would distort and could
  visually read as clipping into the text.

### Redesigned — book cover, now always front + back
Per direct request: book cover images are now always presented as a
2-slide swipeable carousel (front cover, back cover) everywhere the cover
appears prominently (book page hero, homepage Book Spotlight) — replacing
the single-image "floating cover" treatment from v1.4.0.
- **No real back-cover photo exists yet**, so the 2nd slide currently
  repeats the front-cover image as a placeholder. The moment Mary supplies
  a real back-cover photo, only that one `<img src>` needs to change —
  the carousel, arrows, and dots are already fully wired up.
- The small supporting thumbnail in the Book Details section (a
  secondary "buy now" reminder, not the main visual) was simplified to a
  single static image rather than a third carousel on the same page —
  the hero above it already provides the full interactive experience.

### Added — easier to extend
- Shop page: added clear "copy this block to add a new product/package"
  instructional comments directly above the product and package grids,
  matching the pattern already used on the Media & Press page.
- **New page: `kidspray-funart.html`** — KidsPray Fun Art, the hub's
  annual event. Year-based tabs (reusing the site's existing tab
  component) let visitors click a year to see that year's date, venue,
  what was featured, a photo carousel, and a link to more content on
  Instagram. Built to hold both past and upcoming years side by side:
  - **2025** is seeded with real event details (Nike Art Gallery, Piwoyi,
    Abuja · Saturday 17 May 2025 · Paintings, Bible Songs, Dance, Splash,
    Prayers, Gifts, Refreshments), shown clearly as a concluded/past event
    with historical registration pricing for reference, not an active CTA.
  - **2026** is an honest "details coming soon" placeholder with a
    WhatsApp notify-me CTA — no fabricated date, venue, or price.
  - Event photos use the same graceful placeholder convention as the rest
    of the site (`assets/images/kidspray-funart/2025-*.jpg`, which don't
    exist yet in this deliverable) — drop real photos at those exact
    paths and the placeholders disappear automatically.
  - Adding a future year (2027 and beyond) is a two-step copy-paste,
    documented directly in an HTML comment on the page itself.
  - Linked from KidsPray's main page (a new banner section), and added to
    the mobile menu and relevant footer columns site-wide.

---

## v1.5.1 — 2026-07-01

**Patch: confirmed carousel bug fix, one more hardening.**

### Confirmed fixed (already present as of v1.5.0, verified against screenshots)
Screenshots from the live site showed the Core Values carousel opening on
the **last** card ("Growth") instead of the first, on a fresh page load —
with the neighboring card harshly clipped at the page edge as a result.
Traced this to a genuine bug in the carousel's `IntersectionObserver`:
calling `.observe()` on multiple cards fires an initial callback reporting
each one's visibility, and if several cards report as visible in that same
first batch (which reliably happens before scroll position has settled),
the old code let *every* qualifying entry call `setActive()` in turn —
so whichever card happened to be last in that batch silently won,
overriding the correct first-card state. Confirmed this bug is present in
every previously-shipped version (checked back to v1.3.0, where the
carousel was introduced) but is fixed in the current source: only the
single most-visible entry per callback batch is now allowed to set the
active card, and the track's scroll position is additionally forced to
the true start on load as a second safeguard. If you're still seeing the
last-card-active behavior, it means the live site hasn't picked up v1.5.0
yet — redeploy using the commands below, and hard-refresh (or reopen in a
fresh private window) to rule out a cached asset.

### Added
- The "does this carousel need arrows" check now also re-runs after web
  fonts finish loading (plus a short delayed re-check), not just once
  immediately when the page script runs. Custom fonts (DM Serif Display,
  DM Sans) loading a beat late can shift text width just enough to make an
  instant-only check stale in rare cases.

---

## v1.5.0 — 2026-06-30

**Desktop-focused pass.** Recent work optimized mobile heavily; this pass
audited desktop specifically, without touching mobile's behavior.

### Fixed — layout bugs only visible at desktop widths
- **Homepage program grid had a genuine gap bug at 3 columns.** 1 wide card
  (spans 2) + 5 standard cards = 7 grid units, which doesn't divide evenly
  into rows of 3 — the last row held a single lone card with two empty
  cells beside it. Fixed by adding a 6th tile: a wide "7+ Programs. One
  Learning Hub." closing CTA card that links to Learning Hub. This isn't a
  patch — it completes the grid to a clean 3×3 (9 units) exactly, mirrors
  the flagship wide card at the top for a deliberate visual bookend, and
  adds real navigational value on both desktop and mobile.
- **Media & Press page had the same bug, twice**, in both the Featured
  Coverage and Publications sections (3-column grids with 4 and 2 items
  respectively, neither divisible by 3). Rather than patch with filler
  content, changed `.press-grid` to 2 columns site-wide: the featured/lead
  item already spans both columns, so it now reads as a genuine full-width
  "lead story" — fitting for a press page's editorial feel — with a clean
  2-up row of supporting cards underneath. Both sections now fill exactly,
  with zero empty cells, at every screen size.
- **Carousels had zero gap between cards whenever there were few enough
  items to fit without scrolling** — which is most 3-item carousels (book
  gallery, hub photo gallery, KidsPray's "What is KidsPray" intro) on a
  typical desktop width. Cards collapsed to touching edge-to-edge on the
  left with empty space on the right, instead of presenting as a clean,
  evenly-spaced static row. Fixed: the static state now centers the row
  with a proper 22px gap between cards.
- **Book cover was capped at a flat 300px** regardless of how much room its
  column actually had — on a typical desktop width, that column is closer
  to 500px, leaving the cover looking small and adrift in empty space.
  Switched to `clamp(260px, 26vw, 400px)` so it scales properly with
  available space up to a sane ceiling.

### Added — desktop hover polish
- `routine-card` (Resources page) and `faq-question` rows now have hover
  feedback, matching the treatment every other card/interactive element on
  the site already had. Desktop mouse users get consistent feedback
  everywhere now, not just on some components.

### Removed — dead CSS
- `.testi-*` and `.values-grid`/`.val-cards` rules (including all their
  responsive breakpoint overrides) were leftover from earlier passes —
  fake testimonials were removed in v1.1.0, and Core Values sections were
  converted to carousels in v1.3.0, but the old grid/card CSS was never
  cleaned up. Removed entirely; nothing in the HTML referenced them.

### Note on scope
This pass specifically targeted layout math (grid-unit gaps), sizing that
didn't scale with available space, and hover-state consistency — the kinds
of issues that only show up once there's enough screen width for them to
matter. Nothing here changes mobile behavior; all fixes are either scoped
to desktop-only CSS rules or improve every breakpoint equally (e.g. the
carousel gap fix, which helps tablet too).

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
