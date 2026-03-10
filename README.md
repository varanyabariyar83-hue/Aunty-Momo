# Aunty Momo 🥟

> Handmade momos with love. Amar Colony, Lajpat Nagar, New Delhi.
> Deployed on [Cloudflare Pages](https://pages.cloudflare.com/).

---

## File Structure

```
aunty-momo/
├── index.html              ← Full website (HTML + CSS + JS, self-contained)
├── wrangler.toml           ← Cloudflare Pages config
├── README.md               ← This file
└── functions/
    └── api/
        ├── info.js         ← GET  /api/info
        └── order.js        ← POST /api/order
```

---

## Deploy to Cloudflare Pages

### Option A — GitHub (recommended)

1. Push this folder to a GitHub repo (keep `functions/api/` structure).
2. Cloudflare Dashboard → **Pages** → **Create a project** → **Connect to Git**.
3. Select your repo:

   | Setting          | Value           |
   |------------------|-----------------|
   | Framework preset | None            |
   | Build command    | *(leave empty)* |
   | Build output dir | *(leave empty)* |

4. **Save and Deploy** ✅

### Option B — Wrangler CLI

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name aunty-momo
```

---

## API Endpoints

### `GET /api/info`
```bash
curl https://your-site.pages.dev/api/info
```

### `POST /api/order`
```bash
curl -X POST https://your-site.pages.dev/api/order \
  -H "Content-Type: application/json" \
  -d '{"name":"Priya","phone":"+91 99999 99999","items":[{"name":"Chicken Momos","qty":2}]}'
```

---

## Restaurant Details

| Field    | Value |
|----------|-------|
| Phone    | +91 85277 88210 |
| WhatsApp | [wa.me/918527788210](https://wa.me/918527788210) |
| Address  | Main Market, Block C, Amar Colony, Lajpat Nagar, New Delhi – 110024 |
| Hours    | Opens 11 AM |

---

## Quick Customisation

| What             | Where |
|------------------|-------|
| Phone/WhatsApp   | `index.html` (search `918527788210`) + `functions/api/info.js` |
| Menu/Prices      | `index.html` (menu section) + `functions/api/info.js` |
| Colours          | `index.html` → `:root` CSS variables |
| Webhook          | `wrangler pages secret put ORDER_WEBHOOK_URL` |
