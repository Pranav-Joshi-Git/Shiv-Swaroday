# Shiv Swarodaya — A Concept Map

*The ancient science of breath, mapped as one connected system.*

**Shiv Swarodaya** is a Sanskrit scripture — a dialogue between Lord Shiva and Goddess Parvati, 396 verses — on the *science of breath* (**svara**). Its central claim: the breath flowing moment to moment through the nostrils and subtle channels (**nadis**) mirrors the elements (**tattvas**) and the cosmos itself. Read that flow, and you can interpret the world; master it, and you can transform yourself.

This project is **not a translation.** It is a navigable **concept map** — diagrams and tables — showing how those 396 verses fit together as a single architecture.

Live site: [shiv-swarodaya.web.app](https://shiv-swarodaya.web.app)

---

## Architecture

```
Shiv-Swaroday/
├── pages/                              # srcDir — all content lives here
│   ├── index.md                        # Home page
│   ├── overview.md                     # Hub diagram — full system at a glance
│   │
│   ├── tattvas.md                      # Spine: the five elements
│   ├── prana-vayus.md                  # Spine: prana & the five vayus
│   ├── nadis.md                        # Spine: Ida / Sushumna / Pingala
│   ├── svara.md                        # Spine: svara & poorna/shoonya
│   │
│   ├── bhukti-reading-the-world.md     # Branch: prediction engine
│   ├── bhukti-combat.md                # Branch: war & combat
│   ├── bhukti-conception.md            # Branch: conception & enchantment
│   ├── bhukti-disease-prognosis.md     # Branch: disease prognosis
│   ├── bhukti-lifespan-prognosis.md    # Branch: death signs & lifespan
│   ├── bhukti-weather-agriculture.md   # Branch: weather & agriculture
│   │
│   ├── mukti-yoga.md                   # Branch: the yoga path to liberation
│   ├── unifying-view.md                # Synthesis: the unifying view
│   ├── glossary.md                     # Reference: key Sanskrit terms
│   │
│   └── public/
│       └── mythological.png            # Site logo / favicon
│
├── .vitepress/
│   ├── config.mts                      # VitePress config (srcDir: 'pages')
│   ├── theme/
│   │   ├── index.ts                    # Custom theme (Mermaid support)
│   │   └── style.css                   # Custom styles
│   └── dist/                           # Build output (git-ignored)
│
├── firebase.json               # Firebase Hosting config (public: .vitepress/dist)
├── package.json
└── README.md
```

**Stack:** [VitePress](https://vitepress.dev) + [vitepress-plugin-mermaid](https://github.com/emersonbottero/vitepress-plugin-mermaid) for Mermaid diagram support, deployed to [Firebase Hosting](https://firebase.google.com/docs/hosting).

---

## Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`
- Firebase project named `shiv-swarodaya` (already configured in `firebase.json`)

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (hot-reload)
npm run docs:dev
```

The site is served at `http://localhost:5173`. Edits to any `.md` file reload instantly.

---

## Build

```bash
npm run docs:build
```

Output is written to `.vitepress/dist/`. Run this before every deployment.

To preview the production build locally before deploying:

```bash
npm run docs:preview
```

Served at `http://localhost:4173`.

---

## Deploy to Firebase Hosting

```bash
# 1. Build the site
npm run docs:build

# 2. Log in to Firebase (first time only)
firebase login

# 3. Deploy
firebase deploy --only hosting
```

The `firebase.json` is already configured to serve from `.vitepress/dist`:

```json
{
  "hosting": {
    "public": ".vitepress/dist",
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

> **Note:** Always run `npm run docs:build` before `firebase deploy`. Deploying without building will push a stale or empty `dist/` folder.

---

## Adding a New Page

1. Create a new `.md` file in the project root (e.g., `my-topic.md`).
2. Add it to the sidebar in [.vitepress/config.mts](.vitepress/config.mts).
3. Link to it from `index.md` or another page using `/my-topic` (no `.md` extension — `cleanUrls` is enabled).
4. Build and deploy.

---

## Content

**Spine — Foundation**
1. [Tattvas](tattvas.md)
2. [Prana & Vayus](prana-vayus.md)
3. [Nadis](nadis.md)
4. [Svara](svara.md)

**Bhukti — Reading the World**
5. [Reading the World](bhukti-reading-the-world.md)
6. [War & Combat](bhukti-combat.md)
7. [Conception](bhukti-conception.md)
8. [Disease Prognosis](bhukti-disease-prognosis.md)
9. [Lifespan Prognosis](bhukti-lifespan-prognosis.md)
10. [Weather & Agriculture](bhukti-weather-agriculture.md)

**Mukti — Transforming the Self**
11. [Yoga Path](mukti-yoga.md)

**Synthesis**
12. [Unifying View](unifying-view.md)

---

*A note on spirit:* Swarodaya belongs to a traditional worldview. This map preserves its claims faithfully — tagging `[claim]` where assertions go beyond observable fact — without endorsing them as science. The aim is to make a dense, sprawling text **navigable**.
