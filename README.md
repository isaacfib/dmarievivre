# D'Marie Vivre Learning Hub — Website

**Live URL (once deployed):** `https://[yourusername].github.io/dmarievivre/`
**Production domain:** `https://dmarievivre.org`

> *"Learn. Grow. Thrive."*
> Your one-stop education solution — Lugbe, Abuja, Nigeria.

---

## About This Project

Complete ground-up redesign of dmarievivre.org. The old WordPress site (Paloma FSE theme)
has been replaced with a fast, mobile-first static site deployed to GitHub Pages.
Brand colours, tagline, programs, and contact details are all confirmed from the official
2025 flyers and Instagram account.

**Business:** D'Marie Vivre Learning Hub
**Founder:** Mary Okunloye (Ms. Mary), Lead Facilitator
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
| CSS | Custom CSS design system | Full brand control, no bloat |
| JavaScript | Vanilla JS | Zero dependencies |
| Fonts | DM Serif Display + DM Sans (Google Fonts) | CDN, no build step |
| Hosting | GitHub Pages | Free, 60-second deploy |
| Shop | Selar.com (external links) | All purchases route to Selar |

**No build step. No npm. No bundler. Push to GitHub → live in 60 seconds.**

---

## Repository File Structure

```
dmarievivre/
│
├── index.html                              ✅ BUILT — Homepage (v3, Orange+Navy brand)
├── learning-hub.html                       🔲 TODO — Programs deep-dive page
├── kidspray.html                           🔲 TODO — KidsPray faith content
├── shop.html                               🔲 TODO — Full product/shop page
├── book.html                               🔲 TODO — The Monkey With One Hand
├── about.html                              🔲 TODO — About Ms. Mary
├── resources.html                          🔲 TODO — Free Resources & Tips
├── contact.html                            🔲 TODO — Contact & Location map
│
├── README.md                               ✅ This file
│
└── assets/
    │
    ├── css/
    │   └── style.css                       ✅ BUILT — Full design system (v3 Orange+Navy)
    │
    ├── js/
    │   └── main.js                         ✅ BUILT — Nav, scroll, animations
    │
    └── images/
        │
        ├── logo/
        │   └── logo.jpg                    ✅ SAVED — Official logo (lightbulb + pencil)
        │
        ├── programs/
        │   ├── afterschool.jpg             ✅ SAVED — From official After-School flyer
        │   ├── reading-club.jpg            ✅ SAVED — From official Reading Club flyer
        │   ├── arts-crafts.jpg             ✅ SAVED — From official Arts & Crafts flyer
        │   ├── tech-club.jpg               ✅ SAVED — From official Saturday Tech Club flyer
        │   ├── adult-education.jpg         ✅ SAVED — From official Adult Education flyer
        │   ├── who-we-are.jpg              ✅ SAVED — Services overview flyer
        │   ├── approach.jpg                ✅ SAVED — Approach/method flyer (navy)
        │   ├── core-values.jpg             ✅ SAVED — Core Values flyer (orange)
        │   ├── creative-writing.jpg        🔲 NEEDED — Child writing, real photo
        │   └── special-needs.jpg           🔲 NEEDED — Inclusive learning moment
        │
        ├── hero/
        │   └── hero-home.jpg               🔲 NEEDED — See brief below
        │
        ├── about/
        │   ├── mary-portrait.jpg           🔲 NEEDED — Warm professional portrait
        │   └── mary-teaching.jpg           🔲 NEEDED — Ms. Mary with learners
        │
        ├── book/
        │   └── book-lifestyle.jpg          🔲 NEEDED — Child reading the book
        │   (book cover/spreads loaded from WordPress server URLs)
        │
        ├── shop/
        │   ├── affirmation-pack.jpg        🔲 NEEDED
        │   ├── prayer-pack.jpg             🔲 NEEDED
        │   ├── devotional-pack.jpg         🔲 NEEDED
        │   └── birthday-pack.jpg           🔲 NEEDED
        │
        └── og/
            └── og-image.jpg               🔲 NEEDED — 1200×630px social share graphic
```

---

## Build Status

| File | Status | Notes |
|---|---|---|
| `index.html` | ✅ Complete | Full homepage, correct Orange+Navy brand |
| `assets/css/style.css` | ✅ Complete | v3 design system, Orange+Navy tokens |
| `assets/js/main.js` | ✅ Complete | All interactions |
| `learning-hub.html` | 🔲 **Next to build** | All programs, Adult Ed section |
| `kidspray.html` | 🔲 Planned | Faith content, prayer resources |
| `shop.html` | 🔲 Planned | Products + Selar deep links |
| `book.html` | 🔲 Planned | Dedicated book page |
| `about.html` | 🔲 Planned | Ms. Mary story + core values |
| `resources.html` | 🔲 Planned | Tips + free downloads |
| `contact.html` | 🔲 Planned | Map + hours + both phone numbers |

---

## Brand Identity (Confirmed from Official Flyers)

### Colours

| Token | Hex | Source | Usage |
|---|---|---|---|
| `--orange` | `#FF7D1E` | Logo, all flyers | Primary — buttons, badges, accents |
| `--orange-deep` | `#E56500` | Hover state | Button hover |
| `--orange-pale` | `#FFF0E6` | Background tints | Tag backgrounds |
| `--navy` | `#26334A` | Logo text, flyers | Primary text, headers, footer |
| `--navy-mid` | `#3D5173` | Mid-tone | Borders, secondary elements |
| `--navy-pale` | `#E8EDF5` | Background | Tags, chips |
| `--yellow` | `#FFD040` | Arts & Crafts accent | Highlight, energy |
| `--purple` | `#7B3FE4` | Tech Club accent | Digital/tech content |
| `--green` | `#2EAD6B` | Special Needs accent | Inclusive/growth |

> ⚠️ **The previous v2 design used forest green (#1b4332) as primary — this was WRONG.**
> The real brand colours are Orange + Navy as shown across all 8 official flyers.

### Logo

The official logo is a **lightbulb outline (in orange) with a pencil inside (navy)**, with the text
"D'Marie Vivre Learning Hub" in navy and the tagline "Learn. Grow. Thrive."
Saved at: `assets/images/logo/logo.jpg`
Also available at: `https://dmarievivre.org/wp-content/uploads/2023/06/D_MARIE-VIVRE-001.png`

### Tagline

**"Learn. Grow. Thrive."** — appears on the logo itself and all official flyers.
(Not "Grooming and Nurturing" — that was the 2023 era.)

### Core Values (confirmed from flyer)

**Creativity · Diligence · Nurturing · Growth**

### Approach (confirmed from flyer)

"Creativity and activity-based approach with well-detailed illustrations"

### Typography

| Font | Role | Source |
|---|---|---|
| DM Serif Display | All headings, quotes | Google Fonts |
| DM Sans | Body, labels, buttons | Google Fonts |

---

## Complete Program & Service List (2025–2026)

### For Children

| Program | Type | Schedule | Notes |
|---|---|---|---|
| After-School Service | Physical hub | Mon–Sat | Homework, reading, arts, STEM, games |
| Reading Club | Physical + Members | Ongoing | "Where Young Minds Meet Big Stories" |
| Creative Writing Club (Write Well) | Online | Sat 10–12pm & 4–6pm, Sun 4–6pm | Remedial + creative |
| Arts & Crafts Club | Physical hub | Ongoing | Painting, drawing, self-expression |
| Saturday Tech Club | Physical hub | Saturdays | Computer skills, typing, MS Office, design |
| Special Needs Education | Physical hub | By arrangement | Personalised, patient, inclusive |
| Children's Book Club | Physical + Online | Monthly | Book exploration, role-play |
| World Read Aloud Day | Annual event | February | Literacy campaign |

### For Adults (2025 Expansion)

| Program | Type | Skills |
|---|---|---|
| Adult Education (Beginner Classes) | Physical hub | Reading, Writing, Simple Maths, Everyday English |

### Cross-Cutting Services

- Education Consulting (schools, parents, teachers)
- Online Training
- School Start-up Consulting
- Curriculum Development
- Teacher Training
- Parent Coaching
- Child Counseling (via KidsPray arm)

---

## Key Links & Integrations

| Integration | URL / Handle |
|---|---|
| Selar Store | https://selar.com/m/d-marievivre |
| Book on Selar | https://selar.co/t8355l |
| WhatsApp (primary) | https://wa.me/2348068600747 |
| Phone 2 | +234 901 556 6523 |
| Instagram | https://www.instagram.com/dvlearninghub/ |
| YouTube | https://www.youtube.com/@kidspraywithmsmary2218 |
| Facebook | https://web.facebook.com/kidspraywithmsmary |
| TikTok | https://www.tiktok.com/@kidspray |
| Google Maps | 139 Trademore Avenue, Lugbe, Abuja |

> ⚠️ `@dmarievivrelearninghub` is the OLD inactive Instagram handle. Always use `@dvlearninghub`.

---

## Image Brief

### Priority 1 — Must have before launch

| File | What to shoot |
|---|---|
| `hero/hero-home.jpg` | Ms. Mary with children at the hub — wide, joyful, bright. Landscape 1920×1080px minimum. Action centre-right for text overlay on left. |
| `about/mary-portrait.jpg` | Professional warm portrait of Ms. Mary. Good light, smiling. Portrait 3:4 ratio. |
| `programs/creative-writing.jpg` | Child writing (pencil or tablet), focused and proud. 16:9. |
| `og/og-image.jpg` | 1200×630px graphic: logo + "Learn. Grow. Thrive." on orange background. Make in Canva. |

### Priority 2 — Enhances significantly

| File | What to shoot |
|---|---|
| `programs/special-needs.jpg` | One-on-one or small group learning, patient/inclusive atmosphere |
| `about/mary-teaching.jpg` | Ms. Mary actively facilitating with learners around her |
| `book/book-lifestyle.jpg` | Child genuinely absorbed in reading The Monkey With One Hand |

### Assets already saved (from uploaded flyers)

```
assets/images/logo/logo.jpg              ← Official brand logo
assets/images/programs/afterschool.jpg   ← After-School Service flyer
assets/images/programs/reading-club.jpg  ← Reading Club flyer
assets/images/programs/arts-crafts.jpg   ← Arts & Crafts flyer
assets/images/programs/tech-club.jpg     ← Saturday Tech Club flyer
assets/images/programs/adult-education.jpg ← Adult Education flyer
assets/images/programs/who-we-are.jpg    ← Services overview
assets/images/programs/approach.jpg      ← Approach statement
assets/images/programs/core-values.jpg   ← Core Values
```

### Assets on WordPress server (use directly or download)

```
https://dmarievivre.org/wp-content/uploads/2023/06/D_MARIE-VIVRE-001.png        (logo)
https://dmarievivre.org/wp-content/uploads/2023/06/Welcome-to-DMarieVivre.jpg   (Mary's photo)
https://dmarievivre.org/wp-content/uploads/2024/01/IMG_6964-1024x1024.jpg       (gallery)
https://dmarievivre.org/wp-content/uploads/2024/01/IMG_6965-1024x1024.jpg       (gallery)
https://dmarievivre.org/wp-content/uploads/2024/01/IMG_6963-1024x1024.jpg       (gallery)
https://dmarievivre.org/wp-content/uploads/2024/03/The-Monkey-With-One-Hand-Fortune-Okunloye-2.jpg
https://dmarievivre.org/wp-content/uploads/2024/03/The-Monkey-With-One-Hand-Fortune-Okunloye1-2.jpg
https://dmarievivre.org/wp-content/uploads/2024/03/The-Monkey-With-One-Hand-Fortune-Okunloye2-2.jpg
```

---

## GitHub Pages Deployment

### First-time setup

1. Push all files to the `main` branch of your GitHub repository
2. Go to **Settings → Pages**
3. Under *Source*: **Deploy from a branch** → branch: `main` → folder: `/ (root)`
4. Click **Save**
5. Live at `https://[yourusername].github.io/dmarievivre/` within ~60 seconds

### Updating the site

```bash
git add .
git commit -m "Description of change"
git push origin main
# Auto-deploys in ~30 seconds
```

### Custom domain setup (dmarievivre.org)

1. In your domain registrar, add these 4 A records pointing to GitHub IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
2. In GitHub: **Settings → Pages → Custom domain** → enter `dmarievivre.org`
3. Check **Enforce HTTPS** ✓

---

## SEO Keywords

The site structure targets these searches:
- `learning hub Abuja`
- `afterschool program Abuja`
- `reading club children Abuja`
- `creative writing kids Abuja`
- `tech club children Nigeria`
- `adult education Lugbe Abuja`
- `special needs education Abuja`
- `arts and crafts club kids Nigeria`
- `D'Marie Vivre`
- `dvlearninghub`

---

## Important Notes for Anyone Editing the Site

1. **Brand colours are Orange (#FF7D1E) + Navy (#26334A)** — confirmed from the official logo and all 8 flyers. Do not revert to forest green.
2. **Two phone numbers**: 08068600747 AND 09015566523 — both must appear everywhere.
3. **Use `@dvlearninghub` ONLY** — `@dmarievivrelearninghub` is outdated and inactive.
4. **Adult Education is now a core program** — it's on the homepage, it has its own section, do not remove it.
5. **KidsPray is supportive, not primary** — present in footer and community sections only.
6. **Tagline is "Learn. Grow. Thrive."** — not "Grooming and Nurturing".
7. **All purchases go through Selar** — never try to build an in-house checkout.
8. **Full address**: No. 139, Trademore Avenue, Trademore Estate, off VON Garden Estate, Lugbe, Abuja.

---

*Last updated: March 2026 — v3.0 full rebrand*
*Built for D'Marie Vivre Learning Hub, Lugbe, Abuja, Nigeria*
