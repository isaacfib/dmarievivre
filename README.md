# D'Marie Vivre Learning Hub — Website

**Release Version:** `v1.1.0` — see `CHANGELOG.md` for full version history.
**Live URL (once deployed):** `https://isaacfib.github.io/dmarievivre/`
**Production domain:** `https://dmarievivre.org`

> *"Learn. Grow. Thrive."*
> Your one-stop education solution — Lugbe, Abuja, Nigeria.

---

## About This Project

A complete, premium "gentle-glassmorphism" rebuild of the D'Marie Vivre site. Every page
is built — no build step, no framework, deployable to GitHub Pages by pushing files.
Brand colours, tagline, programs, and contact details are confirmed from the official
2025 flyers, Instagram account, and (for Ms. Mary's credentials) a national newspaper feature.

**Business:** D'Marie Vivre Learning Hub
**Founder / Executive Director:** Mary Okunloye (Ms. Mary) — also an Educational Psychologist & Consultant
**Tagline:** Learn. Grow. Thrive.
**Location:** No. 139, Trademore Avenue, Trademore Estate, off VON Garden Estate, Lugbe, Abuja
**Phone 1:** 08068600747
**Phone 2:** 09015566523
**Email:** info@dmarievivre.org · dmarievivre@gmail.com
**Instagram:** @dvlearninghub (the ONLY active handle as of 2025)
**Store:** https://selar.com/m/d-marievivre

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| HTML | HTML5 semantic | No framework needed |
| CSS | Custom CSS design system — v6.0 "Glasslight" | Premium gentle-glassmorphism, full brand control |
| JavaScript | Vanilla JS | Zero dependencies |
| Fonts | DM Serif Display + DM Sans (Google Fonts) | CDN, no build step |
| Hosting | GitHub Pages | Free, 60-second deploy |
| Shop | Selar.com (external links) | All purchases route to Selar |
| Forms | Client-side only (WhatsApp / mailto deep links) | No backend, no data stored |

**No build step. No npm. No bundler. Push to GitHub → live in 60 seconds.**

---

## Repository File Structure

```
dmarievivre/
│
├── index.html                              ✅ COMPLETE — Homepage
├── learning-hub.html                       ✅ COMPLETE — All 7 programs incl. Adult Education
├── kidspray.html                           ✅ COMPLETE — Faith arm, birthday packages, community
├── shop.html                               ✅ COMPLETE — Gift packages + digital products
├── book.html                               ✅ COMPLETE — The Monkey With One Hand
├── about.html                              ✅ COMPLETE — Ms. Mary's story + credentials
├── media.html                              ✅ NEW — Media & Press, publications, consultation form
├── resources.html                          ✅ COMPLETE — Free tips, routines, FAQ, gallery
├── contact.html                            ✅ COMPLETE — Contact & location
│
├── README.md                               ✅ This file
│
└── assets/
    │
    ├── css/
    │   └── style.css                       ✅ v6.0 "Glasslight" design system (~1350 lines)
    │
    ├── js/
    │   └── main.js                         ✅ Nav, scroll, FAQ, tabs, lightbox, consultation form, parallax
    │
    └── images/
        └── logo/
            ├── logo.jpg                    ✅ Official logo (lightbulb + pencil)
            └── logo.png
```

**Note on photography:** beyond the logo, this rebuild intentionally does not bundle local
program/portrait photos. Where a real photo exists on the live WordPress site
(`dmarievivre.org/wp-content/uploads/...`), pages link to it directly. Where no real photo
is available, pages show a styled glass-tinted placeholder (icon + label) via the
`data-fallback` system in `main.js` / `style.css` — this degrades gracefully even if an
external image 404s. **Replacing these with real, owned photography is the single highest-leverage
next step** (see "Image Brief" below).

---

## Design System — v6.0 "Glasslight"

A signature look built around soft, ambient "aurora" light blobs behind frosted glass
surfaces — warm and pastel rather than the cooler/darker glassmorphism seen elsewhere,
to match a nurturing children's-education brand. Brand colours are preserved; a cool
periwinkle counter-tone and the lightbulb-echoing "halo ring" motif were added.

| Token | Hex | Usage |
|---|---|---|
| `--orange` | `#FF7D1E` | Primary brand — buttons, badges, glow |
| `--orange-deep` | `#E56500` | Hover states |
| `--navy` / `--navy-deep` | `#243349` / `#161F2D` | Ink, dark glass surfaces, footer |
| `--peri` (periwinkle) | `#AFC2E8` | NEW — cool glass counter-tone, aurora blobs |
| `--gold` | `#FFD040` | Accent glow, Arts & Crafts |
| `--green` | `#2EAD6B` | Special Needs accent |
| `--purple` | `#7B3FE4` | Tech Club accent |

**Glass recipe (light):** `background: rgba(255,255,255,.58)`, `backdrop-filter: blur(22px) saturate(180%)`,
soft top-edge highlight border, navy-tinted shadow. **Dark variant** used for footer / hero panels.

**Mobile-first:** lighter blur + fewer aurora blobs under 768px (GPU cost), 16px minimum
form font-size (prevents iOS auto-zoom), 44px+ tap targets, `scroll-margin-top` on all
anchors so the floating nav never covers a jumped-to section, `dvh` viewport units for the hero.

---

## Media & Press (`media.html`) — NEW

Built per request, linked from `about.html` ("Learn More" panel) and the footer. Structure:

- **Real, verified items only.** Currently features:
  - A national newspaper feature (THISDAY, June 21 2026) on intentional parenting,
    quoting Ms. Mary as "Educational Psychologist & Consultant."
  - A YouTube video feature (embedded player).
- **Expandable by design.** Each press item is a self-contained `<article class="press-card">`
  block — to add a new feature, copy one and edit the outlet, headline, excerpt, date, and link.
  A "Publications" section follows the same pattern for future books/articles.
- **"Coming soon" placeholder cards** are dashed-border and clearly templated — never
  filled with invented claims.
- **Consultation request form** (`#consultForm`): a no-backend form that builds a
  pre-filled WhatsApp or email message client-side (see `main.js`). Nothing is stored.

> ⚠️ When adding new press coverage, only add items that are real and verifiable — do not
> invent quotes, dates, or outlet names.

---

## Brand Identity (Confirmed)

### Logo
Lightbulb outline (orange) with a pencil inside (navy). Text "D'Marie Vivre Learning Hub"
in navy, tagline "Learn. Grow. Thrive." Saved at `assets/images/logo/logo.jpg`.

### Tagline
**"Learn. Grow. Thrive."**

### Core Values
**Creativity · Diligence · Nurturing · Growth**

### Typography
DM Serif Display (headings/quotes) + DM Sans (body/UI) — both Google Fonts, loaded via CDN.

---

## Complete Program & Service List

### For Children
| Program | Type | Schedule |
|---|---|---|
| After-School Service | Physical hub | Mon–Sat |
| Reading Club | Physical + Online | Ongoing |
| Creative Writing Club (Write Well) | Online | Sat 10–12pm & 4–6pm, Sun 4–6pm |
| Arts & Crafts Club | Physical hub | Ongoing |
| Saturday Tech Club | Physical hub | Saturdays |
| Special Needs Education | Physical hub | By arrangement |
| World Read Aloud Day | Annual event | February |

### For Adults
| Program | Type | Skills |
|---|---|---|
| Adult Education (Beginner Classes) | Physical hub | Reading, Writing, Simple Maths, Everyday English |

### Cross-Cutting Services
Education Consulting · School Start-up Consulting · Curriculum Development ·
Teacher Training · Parent Coaching · KidsPray (faith arm — own dedicated page, in nav)

---

## Key Links & Integrations

| Integration | URL / Handle |
|---|---|
| Selar Store | https://selar.com/m/d-marievivre |
| Book on Selar | https://selar.co/t8355l |
| WhatsApp (primary) | https://wa.me/2348068600747 |
| Phone 2 | +234 901 556 6523 |
| Instagram (hub) | https://www.instagram.com/dvlearninghub/ |
| Instagram (KidsPray) | https://www.instagram.com/kidspraywithms.mary/ |
| YouTube | https://www.youtube.com/@kidspraywithmsmary2218 |
| Facebook | https://web.facebook.com/kidspraywithmsmary |
| TikTok | https://www.tiktok.com/@kidspray |
| Press: THISDAY feature | https://www.thisdaylive.com/2026/06/21/educational-psychological-consultant-warns-against-confusing-availability-with-presence-in-parenting/ |
| Press: video feature | https://youtu.be/glQ0uyShjLg |

---

## Image Brief — Highest-Leverage Next Step

The site is fully built and functions correctly with zero local photos beyond the logo
(styled placeholders fill every gap), but real photography will lift it from "great" to
"unmistakably theirs." Priority shoot list:

| File (suggested path) | What to shoot |
|---|---|
| `assets/images/hero/hero-home.jpg` | Ms. Mary with children at the hub — wide, joyful, bright. 1920×1080 min. |
| `assets/images/about/mary-portrait.jpg` | Warm professional portrait of Ms. Mary, 3:4 ratio |
| `assets/images/programs/*.jpg` | One real photo per program (after-school, reading, arts, tech) |
| `assets/images/programs/special-needs.jpg` | Patient one-on-one or small-group learning moment |
| `assets/images/og/og-image.jpg` | 1200×630px social-share graphic |

Once shot, drop files into the matching `assets/images/...` path and update the `src=`
on the relevant `<img>` — the `data-fallback` placeholder disappears automatically the
moment a real image loads successfully.

---

## GitHub Pages Deployment

```bash
git add .
git commit -m "Description of change"
git push origin main
# Auto-deploys in ~30 seconds
```

**Custom domain (dmarievivre.org):** add 4 A records to GitHub's IPs (185.199.108–111.153),
then set the custom domain under Settings → Pages, and enable "Enforce HTTPS."

---

## Important Notes for Anyone Editing the Site

1. **Brand colours are Orange (#FF7D1E) + Navy (#243349)** — confirmed from the logo and
   official flyers. The v6 "Glasslight" system adds a periwinkle glass counter-tone and
   gold glow as accents — it does not replace the brand colours.
2. **Two phone numbers**: 08068600747 AND 09015566523 — both must appear everywhere.
3. **Use `@dvlearninghub` ONLY** for the hub's main Instagram.
4. **Adult Education is a core program** — has its own homepage banner and a full section
   on `learning-hub.html#adult-education`. Do not remove it.
5. **KidsPray has its own dedicated page and nav link** (`kidspray.html`) — it is the
   faith arm of the hub, not a footer-only afterthought.
6. **Media & Press (`media.html`) must only contain real, verifiable items.** Never invent
   press coverage, quotes, or outlets. Use the dashed "coming soon" card style for anything
   not yet confirmed.
7. **All purchases go through Selar** — never build an in-house checkout. The consultation
   form on `media.html` is *not* a checkout — it just opens WhatsApp/email with a pre-filled
   message; nothing is stored or processed.
8. **Full address**: No. 139, Trademore Avenue, Trademore Estate, off VON Garden Estate, Lugbe, Abuja.

---

*Release v1.1.0 — June 2026 — design system: v6.0 "Glasslight" premium glassmorphism*
*Built for D'Marie Vivre Learning Hub, Lugbe, Abuja, Nigeria*
*Full version history: see `CHANGELOG.md`*
