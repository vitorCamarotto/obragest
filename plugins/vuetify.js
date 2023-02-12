import { createVuetify } from 'vuetify'
<<<<<<< HEAD
import { md3 } from 'vuetify/blueprints'
=======
>>>>>>> master
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
<<<<<<< HEAD
    blueprint: md3
=======
>>>>>>> master
  })

  nuxtApp.vueApp.use(vuetify)
})
