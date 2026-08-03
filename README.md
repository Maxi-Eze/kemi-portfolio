# KE Creatives — Portfolio Website

Portfolio site for **Kemi Esther Kareem** (KE Creatives) — Creative Director & Social Media Manager based in Lagos, Nigeria.

It is a plain **static website** (HTML, CSS, JavaScript) — no build step, no frameworks. You can open it by double-clicking `index.html`, and it deploys anywhere that serves static files (e.g. Netlify).

## Pages

| File | Page | Contents |
|------|------|----------|
| `index.html` | Home | Hero intro, client testimonials, banner image |
| `about.html` | About | About Kemi, key stats, "Work With Me" button |
| `services.html` | Services | Service cards with "Book This" buttons |
| `portfolio.html` | Portfolio | Filterable work gallery with image/video lightbox |
| `contact.html` | Contact | Contact details + inquiry form |

All pages share the same navigation bar and footer.

## Shared files

- **`ke-creatives.css`** — all styling for every page (colours, layout, responsive rules).
- **`ke-creatives.js`** — shared behaviour: mobile menu toggle, portfolio filter tabs, video autoplay on scroll, lightbox, and pre-selecting a service on the contact form.
- **`media/`** — all images and videos used across the site.

## How things connect

- The **navbar** links point to real pages (`about.html`, `services.html`, …); the current page is highlighted.
- The **"Book This"** buttons on Services link to `contact.html?service=...`, which auto-selects that service in the contact form dropdown.
- The **contact form** submits via [FormSubmit](https://formsubmit.co/) to `kareemkemiesther8@gmail.com`.

## Editing the site

1. Edit the relevant `.html` file for page content, or `ke-creatives.css` for styling.
2. To add a portfolio item, copy an existing `.portfolio-card` block in `portfolio.html` and update its image/text. Put new images or videos in the `media/` folder first.
3. Save, then commit and push:
   ```bash
   git add -A
   git commit -m "Describe your change"
   git push
   ```
   If the repo is connected to Netlify, the live site updates automatically.

## Local preview

Just open `index.html` in a browser — no server required. (For features that behave better over HTTP, you can optionally run `python -m http.server` in this folder and visit `http://localhost:8000`.)

## Deployment

Hosted as a static site on **Netlify**:
- Publish directory: repository root (`.`)
- Build command: none
