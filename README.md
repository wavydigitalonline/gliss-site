# Gliss website — static rebuild

Plain HTML + Tailwind CDN + vanilla JS. No build tools, no npm, no framework.
Upload the whole folder to GitHub and flip on Pages — that's it.

## 1. Files in this repo

```
index.html      ← Home
services.html   ← Services
pricing.html    ← Pricing
about.html      ← About
contact.html    ← Contact
css/style.css   ← All custom styling on top of Tailwind
js/script.js    ← Mobile menu, FAQ accordion, image fallback, WhatsApp form logic
images/         ← Put your real image files here (see below)
```

## 2. Add your real images — exact filenames

Drop these 5 files into the `images/` folder, named **exactly** like this
(lowercase, these extensions). The pages already reference them, so once
they're in place they'll just appear — nothing else to edit.

| Filename             | Where it's used                              | Suggested size |
|-----------------------|-----------------------------------------------|-----------------|
| `images/logo.png`     | Nav bar + footer logo                         | square, transparent PNG, ~200×200px |
| `images/hero-bg.jpg`  | **New** homepage hero background (this is the one you're swapping) | 1920×1080px, landscape |
| `images/ai-automation.jpg` | "Work less. Convert more." AI section image | 1200×1200px or wider |
| `images/why-gliss.jpg` | "Why Gliss" section image                    | 1200×1200px or wider |
| `images/founder.jpg`  | Kevin's founder photo                         | 800×1000px portrait |

Until a file is in place, that slot shows a small dark placeholder label
(e.g. "hero-bg.jpg not found") instead of a broken image icon — so you'll
know at a glance exactly which ones are still missing.

> **Note on the logo / AI / why-gliss / founder images:** I wasn't able to pull the actual
> binary image files from your live Lovable site — my tools can only read
> its HTML/text, not download images, and this sandbox has no general
> internet access. Easiest fix: open your Lovable site, right-click each
> image → "Save image as…", rename to match the table above, and drop it
> into `images/`.

## 3. WhatsApp number

Set once, at the top of `js/script.js`:

```js
const GLISS_WHATSAPP_NUMBER = "27714636308";
```

Every button/link on the site (except the `tel:` and `mailto:` links) opens
WhatsApp with a pre-filled message specific to that button — e.g. the
Growth plan button opens WhatsApp already saying "I'm interested in the
Growth plan (R599.99/month)." The contact form has no backend; instead,
on submit it builds a WhatsApp message out of whatever the visitor typed
(name, email, phone, service, message) and opens a pre-filled WhatsApp
chat for them to hit send on.

Nav links ("Home", "Services", "Learn more", "View Pricing" etc.) stay as
normal page links — turning those into WhatsApp links would break site
navigation, so I kept those as-is and routed every actual call-to-action
button to WhatsApp instead.

## 4. Upload to GitHub + go live

1. Create a new repo on GitHub, e.g. `gliss-site`.
2. Upload all files/folders from this project keeping the same structure
   (`index.html` at the repo root, `css/`, `js/`, `images/` as subfolders).
3. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch:
   `main` / folder `/ (root)` → Save.
4. GitHub gives you a URL like `https://yourusername.github.io/gliss-site/`.
5. To use your own domain: Settings → Pages → Custom domain → enter
   `www.yourdomain.com` (or your domain) → GitHub will show you the DNS
   records to add at your domain registrar (usually a `CNAME` record
   pointing to `yourusername.github.io`, or `A` records for an apex
   domain). Once DNS propagates, tick "Enforce HTTPS".

That's the whole flow — no build step, no CLI, just upload and switch Pages on.
