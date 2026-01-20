export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    //'vue3-perfect-scrollbar/nuxt',
    '@nuxt/ui',

  ],
  theme: {
    extend: {
      colors: {
        'medical-dark': '#002d1e',
        'icons-medical': '#7435c1'
      }
    }
  },
  css: [
    '~/assets/css/main.css',
    'assets/css/style.css'
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'deep-chat'
    }
  },

  app: {
    head: {
      link: [
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css'
        // },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
        }
      ]
    }
  }
})
