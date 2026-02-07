// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: false },

  app: {
    head: {
            link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Kantumruy+Pro:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/icon',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'EN', file: 'en.json' },
      { code: 'km', language: 'km-KH', name: 'ខ្មែរ', file: 'km.json' }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en'
    }
  },

  runtimeConfig: {
    public: {
      directusUrl: process.env.DIRECTUS_URL || 'https://your-directus-api.com',
      telegramUsername: process.env.TELEGRAM_USERNAME || 'cambodiarc',
      phoneNumber: process.env.PHONE_NUMBER || '+855 12 345 678'
    }
  },

  image: {
    directus: {
      baseURL: (process.env.DIRECTUS_URL || 'https://your-directus-api.com') + '/assets/'
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { swr: 3600 },
    '/products/**': { isr: 86400 }
  }
})