<template>
  <v-app id="inspire">
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="valid">
        <v-text-field
          v-model="constructionName"
          class="mb-2"
          clearable
          label="Nome da obra"
        />
        <v-btn
          @click.prevent="addConstruction()"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Adicionar Obra
        </v-btn>
      </v-form>
    </v-card>
    <v-app-bar
      app
      extended
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="item in tableConstructions"
            :key="item"
            cols="6"
          >
            <v-card height="200">
              {{ item }}
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

  <div class="flex justify-center">
    <v-btn
      @click.prevent="signOut()"
      color="success"
      size="large"
      type="submit"
      variant="elevated"
      class="mt-5 w-1/3"
    >
      Log Out
    </v-btn>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })

  const constructionName = ref('')
  const valid = ref(false)
  const tableConstructions = ref(new Set())

  const client = useSupabaseClient()
  const signOut = async () => {
    try {
      await client.auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }
  const loggedUser = useSupabaseUser()

  onMounted(() => {
    watchEffect(() => {
      if (!loggedUser.value) {
        return navigateTo('/auth/login')
      }
    })

    fetchConstructions()
  })

  const addConstruction = async () => {
    const response = await $fetch('/api/construction/create', {
      method: 'POST',
        body: {
          name: constructionName.value,
          userId: loggedUser.value.id
        }
      }
    )

    fetchConstructions()
  }

  const fetchConstructions = async () => {
    const fetchedConstructions = await $fetch('/api/construction/get')

    fetchedConstructions.forEach(element => {
      tableConstructions.value.add(element.name)
    });
  }

</script>
