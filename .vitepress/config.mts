import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shiv Swarodaya",
  titleTemplate: ':title | Shiv Swarodaya',
  description: "Master life and beyond by understanding Svara — the ancient breath intelligence system of 396 Sanskrit verses",
  srcDir: 'pages',
  base: '/', // Change to '/Shiv-Swaroday/' for GitHub Pages deployment
  
  sitemap: {
    hostname: 'https://shiv-swarodaya.web.app',
    lastmodDateOnly: false,
    transformItems(items) {
      return items.map(item => ({ ...item, lastmod: new Date().toISOString().split('T')[0] }))
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'google-site-verification', content: 'ISyhWYghhy6zyrFJyjBVPM1Veb7BmVGnstTrr2_IQQI' }],
    ['meta', { name: 'description', content: 'Master life and beyond by understanding Svara — the ancient breath intelligence system of 396 Sanskrit verses' }],
    ['meta', { property: 'og:title', content: 'Shiv Swarodaya — Master Life & Beyond' }],
    ['meta', { property: 'og:description', content: 'Navigate 396 verses of ancient breath science as a living concept map. Learn how svara, tattvas, nadis, and prana form one unified system.' }],
    ['meta', { name: 'keywords', content: 'Shiv Swarodaya, Shiv Svarodaya, swara vigyan, swara, swar, svara, breath science, yoga, pranayama, tattvas, nadis, Ida, Pingala, Sushumna, pranic flow' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Shiv Swarodaya',
      alternateName: 'Shiv Svarodaya',
      url: 'https://shiv-swarodaya.web.app',
      description: 'Master life and beyond by understanding Svara — the ancient breath intelligence system of 396 Sanskrit verses'
    })]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/mythological.webp',
    
    nav: [
      { text: '📝 Overview', link: '/overview' },
      { text: '📖 Glossary', link: '/glossary' }
    ],

    sidebar: [
      {
        text: 'Hub',
        items: [
          { text: '📝 Overview', link: '/overview' }
        ]
      },
      {
        text: 'Spine — Foundation',
        collapsed: false,
        items: [
          { text: '01 · Tattvas', link: '/tattvas' },
          { text: '02 · Prana & Vayus', link: '/prana-vayus' },
          { text: '03 · Nadis', link: '/nadis' },
          { text: '04 · Svara', link: '/svara' }
        ]
      },
      {
        text: 'Bhukti — Reading the World',
        collapsed: false,
        items: [
          { text: '05 · Prediction Engine', link: '/bhukti-reading-the-world' },
          { text: '06 · Combat', link: '/bhukti-combat' },
          { text: '07 · Conception', link: '/bhukti-conception' },
          { text: '08 · Disease Prognosis', link: '/bhukti-disease-prognosis' },
          { text: '09 · Lifespan Prognosis', link: '/bhukti-lifespan-prognosis' },
          { text: '10 · Weather & Agriculture', link: '/bhukti-weather-agriculture' }
        ]
      },
      {
        text: 'Mukti — Transforming the Self',
        collapsed: false,
        items: [
          { text: '11 · Yoga Path', link: '/mukti-yoga' }
        ]
      },
      {
        text: 'Synthesis',
        collapsed: false,
        items: [
          { text: '12 · Unifying View', link: '/unifying-view' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: '📖 Glossary', link: '/glossary' }
        ]
      }
    ],

    socialLinks: [],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'A navigable concept map of the 396-verse Sanskrit scripture on breath science',
      copyright: '© 2026 Shiv Swarodaya Concept Map'
    }
  },

  // Enable Mermaid via markdown config
  markdown: {
    config: (md) => {
      // Mermaid will be handled by the custom theme
    }
  },

  // Clean URLs (no .html extension)
  cleanUrls: true
})
