// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxtjs/supabase', 'nuxt-icon'],
  css: ['~/assets/css/main.css', 'vuetify/lib/styles/main.sass'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['vuetify']
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  }
})
