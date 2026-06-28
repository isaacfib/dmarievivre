# Changelog

All notable changes to the D'Marie Vivre Learning Hub website are tracked here.
Versioning follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

- **MAJOR** — a full redesign or structural rebuild
- **MINOR** — new pages/sections, or a significant cleanup/refactor pass (no breaking change)
- **PATCH** — small fixes: copy edits, broken links, minor styling tweaks

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
