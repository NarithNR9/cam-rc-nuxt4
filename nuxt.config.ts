// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Nuxt 4 features
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/icon'
  ],
  // Directus and App constants
  runtimeConfig: {
    public: {
      directusUrl: process.env.DIRECTUS_URL || 'https://your-directus-api.com'
    }
  },

  // Image optimization for Directus
  image: {
    directus: {
      baseURL: 'https://your-directus-api.com/assets/'
    }
  },
  css: ['~/assets/css/main.css'],

  routeRules: {
    // 1. Homepage: Cache for 1 hour, refresh in background
    '/': { swr: 3600 }, 

    // 2. Product Detail Pages: Cache for 1 day (or until you update)
    '/products/**': { isr: 86400 },

  }
})