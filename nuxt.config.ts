// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxtjs/supabase', 'nuxt-icon'],
  css: ['~/assets/css/main.css', 'vuetify/lib/styles/main.sass', '~/assets/scss/main.scss', '@mdi/font/css/materialdesignicons.min.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['vuetify', '@vuepic/vue-datepicker']
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  }
})
