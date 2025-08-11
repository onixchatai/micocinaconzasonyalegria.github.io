Mi Cocina • PWA Mobile Ordering (Pickup Only)
====================================================

Quick Start
-----------
1) Upload this folder to Netlify (drag-and-drop) or any static host.
2) Set your WhatsApp number in `app.js` (state.business.whatsapp).
3) Edit `data/menu.json` to match your menu and prices.
4) Publish. On phones, users can "Install App" (PWA) and order for pickup.

How Orders Work
---------------
- This template sends orders via WhatsApp (opens a prefilled message).
- No backend is required.
- For launch: Pickup only and optional Zelle (show payment at pickup).

Customization
-------------
- Tax rate: `app.js` → state.taxRate
- Business address/name: `app.js` → state.business
- Menu: `data/menu.json` (add categories/items).
- Icons/branding: replace files in /assets (keep same filenames/sizes).
- Colors/spacing: edit `styles.css`

PWA Notes
---------
- `service-worker.js` caches core files for offline use.
- `manifest.json` defines app icons and install banner.
- When you update, bump CACHE_NAME in `service-worker.js`.

Support
-------
- Built by wwww.onixchatai.com with ♥. Adapt freely.
