import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shiv Swarodaya",
  description: "The ancient science of breath, mapped as one connected system",
  base: '/', // Change to '/Shiv-Swaroday/' for GitHub Pages deployment
  
  sitemap: {
    hostname: 'https://shiv-swarodaya.web.app'
  },

  head: [
    ['link', { rel: 'icon', href: '/mythological.png' }],
    ['meta', { name: 'description', content: 'A navigable concept map of the 396-verse Sanskrit scripture on breath science' }],
    ['meta', { property: 'og:title', content: 'Shiv Swarodaya Concept Map' }],
    ['meta', { property: 'og:description', content: 'The ancient science of breath, mapped as one connected system' }],
    ['meta', { name: 'keywords', content: 'Shiv Swarodaya, Shiv Svarodaya, swara vigyan, swara, swar, svara, breath science, yoga, pranayama, tattvas, nadis, Ida, Pingala, Sushumna, pranic flow' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/mythological.png',
    
    nav: [
      { text: '📝 Overview', link: '/00-overview' },
      { text: '📖 Glossary', link: '/glossary' }
    ],

    sidebar: [
      {
        text: 'Hub',
        items: [
          { text: '📝 Overview', link: '/00-overview' }
        ]
      },
      {
        text: 'Spine — Foundation',
        collapsed: false,
        items: [
          { text: '01 · Tattvas', link: '/01-tattvas' },
          { text: '02 · Prana & Vayus', link: '/02-prana-vayus' },
          { text: '03 · Nadis', link: '/03-nadis' },
          { text: '04 · Svara', link: '/04-svara' }
        ]
      },
      {
        text: 'Bhukti — Reading the World',
        collapsed: false,
        items: [
          { text: '05 · Prediction Engine', link: '/05-bhukti-reading-the-world' },
          { text: '06 · Combat', link: '/06-bhukti-combat' },
          { text: '07 · Conception', link: '/07-bhukti-conception' },
          { text: '08 · Disease Prognosis', link: '/08-bhukti-disease-prognosis' },
          { text: '09 · Lifespan Prognosis', link: '/09-bhukti-lifespan-prognosis' },
          { text: '10 · Weather & Agriculture', link: '/10-bhukti-weather-agriculture' }
        ]
      },
      {
        text: 'Mukti — Transforming the Self',
        collapsed: false,
        items: [
          { text: '11 · Yoga Path', link: '/11-mukti-yoga' }
        ]
      },
      {
        text: 'Synthesis',
        collapsed: false,
        items: [
          { text: '12 · Unifying View', link: '/12-unifying-view' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: '📖 Glossary', link: '/glossary' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Pranav-Joshi-Git/Shiv-Swaroday' }
    ],

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
