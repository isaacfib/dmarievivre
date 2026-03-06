# D'Marie Vivre Learning Hub — Website

**Live URL (once deployed):** `https://[yourusername].github.io/dmarievivre/`
**Production domain:** `https://dmarievivre.org`

> *"Every child is a star waiting to shine."*
> Your one-stop education solution — Abuja, Nigeria.

---

## About This Project

Complete ground-up redesign and rebuild of dmarievivre.org.
The old WordPress site (Paloma FSE theme, single scrolling page) has been replaced
with a fast, mobile-first static site deployed directly to GitHub Pages.

**Business:** D'Marie Vivre Learning Hub
**Founder:** Mary Okunloye (Ms. Mary)
**Location:** No. 139 Trademore Avenue, Phase 2, Trademore Estate, Lugbe, Abuja, Nigeria
**Contact:** info@dmarievivre.org · +234 806 860 0747
**Store:** https://selar.com/m/d-marievivre

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| HTML | HTML5 (semantic) | No framework needed, fast load |
| CSS | Custom CSS (design system) | Full control, no bloat |
| JavaScript | Vanilla JS | Zero dependencies |
| Fonts | Google Fonts (DM Serif Display + DM Sans) | Loaded via CDN |
| Hosting | GitHub Pages | Free, instant deploy from repo |
| Forms | Formspree (planned) | No backend needed |
| Shop | Selar.com (external) | All purchases route to Selar |

**No build step. No npm. No bundler. Push to GitHub → live in 60 seconds.**

---

## Repository File Structure

```
dmarievivre/
│
├── index.html                        ✅ BUILT — Homepage
├── learning-hub.html                 🔲 TODO — Programs & Learning Hub
├── kidspray.html                     🔲 TODO — KidsPray faith content
├── shop.html                         🔲 TODO — Full product/shop page
├── book.html                         🔲 TODO — The Monkey With One Hand
├── about.html                        🔲 TODO — About Ms. Mary
├── resources.html                    🔲 TODO — Free Resources & Tips
├── contact.html                      🔲 TODO — Contact & Location
│
├── README.md                         ✅ This file
│
└── assets/
    │
    ├── css/
    │   └── style.css                 ✅ BUILT — Full design system
    │
    ├── js/
    │   └── main.js                   ✅ BUILT — Nav, scroll, animations
    │
    └── images/
        │
        ├── logo/
        │   └── dmarievivre-logo.png  🔲 NEEDED — Brand logo PNG
        │
        ├── hero/
        │   ├── hero-home.jpg         🔲 NEEDED — See image brief below
        │   ├── hero-learning.jpg     🔲 NEEDED
        │   ├── hero-kidspray.jpg     🔲 NEEDED
        │   ├── hero-about.jpg        🔲 NEEDED
        │   └── hero-shop.jpg         🔲 NEEDED
        │
        ├── programs/
        │   ├── strictly-read.jpg     🔲 NEEDED — Flagship program photo
        │   ├── write-well.jpg        🔲 NEEDED
        │   ├── afterschool.jpg       🔲 NEEDED
        │   ├── book-club.jpg         🔲 NEEDED
        │   └── summer-club.jpg       🔲 NEEDED
        │
        ├── about/
        │   ├── mary-portrait.jpg     🔲 NEEDED — Primary founder photo
        │   ├── mary-teaching.jpg     🔲 NEEDED
        │   └── mary-praying.jpg      🔲 NEEDED
        │
        ├── kidspray/
        │   ├── children-praying.jpg  ✅ EXISTS (WordPress: Children_praying_Secondary-1.jpg)
        │   ├── devotional-time.jpg   🔲 NEEDED
        │   └── birthday-prayer.jpg   🔲 NEEDED
        │
        ├── book/
        │   ├── book-cover.jpg        ✅ EXISTS (WordPress: The-Monkey-With-One-Hand-Fortune-Okunloye-2.jpg)
        │   ├── book-spread.jpg       ✅ EXISTS (WordPress: The-Monkey-With-One-Hand-Fortune-Okunloye1-2.jpg)
        │   ├── book-interior.jpg     ✅ EXISTS (WordPress: The-Monkey-With-One-Hand-Fortune-Okunloye2-2.jpg)
        │   └── book-lifestyle.jpg    🔲 NEEDED — Child reading the book
        │
        ├── shop/
        │   ├── prayer-pack.jpg       🔲 NEEDED
        │   ├── affirmation-pack.jpg  🔲 NEEDED
        │   ├── devotional-pack.jpg   🔲 NEEDED
        │   ├── bible-plan.jpg        🔲 NEEDED
        │   └── birthday-pack.jpg     🔲 NEEDED
        │
        ├── gallery/
        │   ├── gallery-1.jpg         ✅ EXISTS (WordPress: IMG_6964)
        │   ├── gallery-2.jpg         ✅ EXISTS (WordPress: IMG_6965)
        │   └── gallery-3.jpg         ✅ EXISTS (WordPress: IMG_6963)
        │
        └── og/
            └── og-image.jpg          🔲 NEEDED — 1200×630px social share image
```

### Build Status

| File | Status | Notes |
|---|---|---|
| `index.html` | ✅ Complete | Full homepage, 2025 rebrand |
| `assets/css/style.css` | ✅ Complete | Full design system |
| `assets/js/main.js` | ✅ Complete | All interactions |
| `learning-hub.html` | 🔲 Next | Programs deep-dive |
| `kidspray.html` | 🔲 Planned | Faith content hub |
| `shop.html` | 🔲 Planned | Product grid + Selar links |
| `book.html` | 🔲 Planned | Book dedicated page |
| `about.html` | 🔲 Planned | Ms. Mary full story |
| `resources.html` | 🔲 Planned | Tips + free downloads |
| `contact.html` | 🔲 Planned | Map + form + hours |

---

## Image Brief

All images marked 🔲 NEEDED must be sourced from Google Drive or shot new.
Every `<!-- 📸 IMAGE NEEDED -->` comment in the HTML files gives the exact spec.
Quick reference below:

### Priority 1 — Must have before launch

| File | What to photograph or find |
|---|---|
| `hero/hero-home.jpg` | Ms. Mary with 4–6 children actively reading/learning at the hub. Warm, bright, joyful. Landscape min 1920×1080px. Faces/action on centre-right. |
| `about/mary-portrait.jpg` | Professional yet warm portrait of Ms. Mary. Smiling, good light, portrait orientation (3:4). This is the face of the brand. |
| `programs/strictly-read.jpg` | The actual November Strictly Read event — children ages 5–7, books open, focused and smiling. Real hub setting. |
| `logo/dmarievivre-logo.png` | Download from WordPress: https://dmarievivre.org/wp-content/uploads/2023/06/D_MARIE-VIVRE-001.png |

### Priority 2 — Enhances the site significantly

| File | What to photograph or find |
|---|---|
| `programs/write-well.jpg` | Child writing (pencil or tablet), focused and proud. Bright, clean setting. |
| `programs/afterschool.jpg` | Children in the afterschool session — relaxed but engaged. Real hub setting. |
| `about/mary-teaching.jpg` | Ms. Mary actively teaching or facilitating — children around her. |
| `book/book-lifestyle.jpg` | A child actually reading The Monkey With One Hand. Natural, absorbed. |
| `shop/affirmation-pack.jpg` | Flat lay of the affirmation pack on a clean, warm surface. |
| `og/og-image.jpg` | Canva or Figma graphic: brand logo + tagline on forest green. 1200×630px. |

### Priority 3 — Add after launch

| File | What to photograph or find |
|---|---|
| `programs/book-club.jpg` | Book club session — children with books in a circle or at tables. |
| `kidspray/birthday-prayer.jpg` | Birthday celebration moment with prayer/gift. |
| `shop/birthday-pack.jpg` | Presented birthday gift pack, beautifully arranged. |
| `programs/summer-club.jpg` | Summer club group photo — outdoor or bright indoor. |

### Images already available (on WordPress server)

These can be downloaded directly — no new photos needed:

```
https://dmarievivre.org/wp-content/uploads/2023/06/D_MARIE-VIVRE-001.png
https://dmarievivre.org/wp-content/uploads/2023/06/Children_praying_Secondary-1.jpg
https://dmarievivre.org/wp-content/uploads/2023/06/Welcome-to-DMarieVivre.jpg
https://dmarievivre.org/wp-content/uploads/2024/01/IMG_6964-1024x1024.jpg
https://dmarievivre.org/wp-content/uploads/2024/01/IMG_6965-1024x1024.jpg
https://dmarievivre.org/wp-content/uploads/2024/01/IMG_6963-1024x1024.jpg
https://dmarievivre.org/wp-content/uploads/2024/03/The-Monkey-With-One-Hand-Fortune-Okunloye-2.jpg
https://dmarievivre.org/wp-content/uploads/2024/03/The-Monkey-With-One-Hand-Fortune-Okunloye1-2.jpg
https://dmarievivre.org/wp-content/uploads/2024/03/The-Monkey-With-One-Hand-Fortune-Okunloye2-2.jpg
```

---

## Design System

### Colours

| Token | Hex | Usage |
|---|---|---|
| `--forest` | `#1b4332` | Primary brand green — headers, buttons, nav |
| `--forest-mid` | `#2d6a4f` | Hover states |
| `--forest-light` | `#52b788` | Accent lines, tags |
| `--forest-pale` | `#d8f3dc` | Tag backgrounds, avatar backgrounds |
| `--sun` | `#f7b731` | Primary accent — CTAs, highlights, stars |
| `--sun-deep` | `#d4920c` | Sun hover, category labels |
| `--coral` | `#e05c36` | Write Well accent |
| `--sky` | `#3b82f6` | After-school accent |
| `--cream` | `#fffbf5` | Page background |
| `--ink` | `#0f1923` | Body text |

### Typography

| Font | Role | Source |
|---|---|---|
| DM Serif Display | All headings, quotes, display text | Google Fonts |
| DM Sans | Body text, labels, buttons, nav | Google Fonts |

### Key Components (in style.css)

- `.btn` + variants (`.btn-forest`, `.btn-sun`, `.btn-coral`, `.btn-outline-*`)
- `.section-tag` + variants (`.tag-forest`, `.tag-sun`, `.tag-coral`, `.tag-sky`)
- `.program-card` + `.program-card-hero` (featured wide layout)
- `.pkg-card` + `.pkg-card-popular` (gift package tiers)
- `.reveal` + `.reveal-d1/d2/d3/d4` (scroll animation system)
- `.float-wa` (fixed WhatsApp button)
- `.ann-bar` (announcement banner)
- `.nav` + `.nav.scrolled` + `.nav.hero-over`

---

## Key Links & Integrations

| Integration | URL / Handle | Notes |
|---|---|---|
| Selar Store | https://selar.com/m/d-marievivre | All product purchases |
| Book on Selar | https://selar.co/t8355l | Direct book link |
| WhatsApp | https://wa.me/2348068600747 | Primary conversion channel |
| Instagram (main) | https://www.instagram.com/dvlearninghub/ | Active — 2025 handle |
| YouTube | https://www.youtube.com/@kidspraywithmsmary2218 | KidsPray videos |
| Facebook | https://web.facebook.com/kidspraywithmsmary | KidsPray community |
| TikTok | https://www.tiktok.com/@kidspray | Prayer snippets |
| Twitter/X | https://twitter.com/dmarievivre | Low activity |
| LinkedIn | https://www.linkedin.com/company/dmarievivre/ | B2B |
| Google Maps | 139 Trademore Avenue, Lugbe, Abuja | Embed on contact page |

> ⚠️ Note: The old Instagram handle `@dmarievivrelearninghub` linked on the
> original WordPress site is outdated. The correct active handle is `@dvlearninghub`.

---

## GitHub Pages Deployment

### First-time setup
1. Push all files to the `main` branch of your GitHub repository
2. Go to **Settings → Pages**
3. Under *Source*, select **Deploy from a branch**
4. Set branch to **`main`** and folder to **`/ (root)`**
5. Click **Save**
6. Your site will be live at `https://[yourusername].github.io/dmarievivre/` within ~60 seconds

### Updating the site
```bash
# Make your changes, then:
git add .
git commit -m "Description of what changed"
git push origin main
# GitHub Pages auto-deploys — live in ~30 seconds
```

### Custom domain (dmarievivre.org)
1. In your domain registrar (e.g. Namecheap, GoDaddy), add a CNAME record:
   - Name: `www` → Value: `[yourusername].github.io`
   - Or for apex domain: add 4 A records pointing to GitHub's IPs
2. In GitHub repo: **Settings → Pages → Custom domain** → enter `dmarievivre.org`
3. Check **Enforce HTTPS**

GitHub's IPs for apex domain A records:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

---

## SEO Keywords to Own

The new site is structured to rank for:
- `Abuja reading program`
- `afterschool Abuja children`
- `creative writing for kids Abuja`
- `literacy confidence Nigeria`
- `faith-based children education Abuja`
- `children book club Abuja`
- `KidsPray Nigeria`

---

## Important Notes for Editors

1. **All "buy" buttons link to Selar** — do not try to build an in-house checkout
2. **WhatsApp CTA is the #1 conversion tool** — never remove the floating WhatsApp button
3. **Do not link to `@dmarievivrelearninghub`** anywhere — this is the old, inactive handle. Use `@dvlearninghub`
4. **Beauty section has been intentionally removed** — per the 2025 rebrand. Do not add it back without discussion
5. **KidsPray is supportive, not primary** — it appears in footer, community CTA and testimonials only on the homepage
6. **The full address is:** No. 139 Trademore Avenue, Phase 2, Trademore Estate, Lugbe, Abuja — use this in full everywhere

---

*Last updated: March 2026*
*Built for D'Marie Vivre Learning Hub, Abuja, Nigeria*
