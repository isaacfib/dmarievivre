# D'Marie Vivre Learning Hub: Website (classic version) v2.0.0

**Live URL:** https://www.dmarievivre.org
**Stack:** HTML5, one CSS file, vanilla JavaScript. No build step, no framework, no npm. Same layout as the previous site (v1.9.0), so it deploys the same way: upload or push the files (GitHub Pages works as before).

```
index.html            Home
learning-hub.html     Programmes and fees, FAQ
calendar.html         2027 calendar
shop.html             Hub Bookshop (order list sent by email)
book.html             The Monkey With One Hand
kidspray.html         Kidspray (faith and community)
funart.html           Kidspray Fun Art
about.html            About Ms. Mary
media.html            Media and press
resources.html        Free resources and FAQ
services.html         Space hire and school training
contact.html          Contact and enquiry form
404.html
assets/css/style.css  Design system
assets/js/main.js     Behaviour (menu, calendar, books, forms)
assets/js/config.js   Site settings: Hub email, WhatsApp, placeholder switch
assets/data/          events.json and books.json (edit these to update the site)
assets/images/        logo, photos, book covers
tools/books-editor.html  Edit the book list without coding
docs/                 Placeholder checklist (PDF)
```

## Before going live
1. **Set the Hub email.** Open `assets/js/config.js` and put the address that should receive enquiries and book orders in `email`. Double-check the spelling: a wrong address loses orders.
2. **Activate form delivery once.** Forms are delivered by FormSubmit (free). The first form sent from the live site makes FormSubmit email a one-time "Activate" link to that inbox. Click it, then send a test enquiry and a test book order. If delivery ever fails, visitors are offered "Send by email" and WhatsApp.
3. **Fill the placeholders.** Dashed orange boxes mark missing photos, books and testimonials. `docs/placeholders-checklist.pdf` lists every one by ID with the format needed. Drop a photo with the right name into `assets/images/photos/` and it replaces the placeholder automatically. When you launch with gaps still open, set `showPlaceholders` to `false` in `assets/js/config.js` and all placeholders disappear.

## Books (10 to 20 titles)
Open `tools/books-editor.html` in any browser, load `assets/data/books.json`, replace the placeholder rows with real books (title, author, category, ages, price, cover path), then download and replace `books.json`. Leave price empty to show "Ask for price". Put cover images in `assets/images/books/`. Visitors add books to an order list; the order arrives by email with their name, phone, pickup or delivery choice and the list. No payment happens online.

## Updating the calendar
Edit `assets/data/events.json`. Each event has a date (`YYYY-MM-DD`) or a month, a type (`free`, `paid`, `ad`, `ws`) and an optional fee. The Home page "Next at the Hub" and the Calendar update by themselves, and past events fade out.

## Changing fees
Fees live in the programmes page (search for the amount). The Adult Learning offer price switches to the normal price automatically after 30 January 2027.

## Private information
Nothing about staffing, capacity, margins or finances is on the site.

## Deploying to GitHub Pages
```bash
git add .
git commit -m "Website v2.0.0"
git push origin main
```
Custom domain: keep the existing DNS records and the Pages custom domain setting.
