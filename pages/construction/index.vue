<template>

  <h3 class="flex justify-center text-h3 mt-4">Adicionar nova Obra</h3>
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
        block
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Adicionar Obra
      </v-btn>
    </v-form>
  </v-card>

  <v-btn
    @click.prevent="signOut()"
    block
    color="success"
    size="large"
    type="submit"
    variant="elevated"
    class="mt-5"
  >
    Log Out
  </v-btn>
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })

  const constructionName = ref('')
  const valid = ref(false)

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
  })

  const addConstruction = async () => {
    await $fetch('/api/construction/create', {
      method: 'POST',
        body: {
          name: constructionName.value,
          userId: loggedUser.value.id
        }
      }
    )
  }

</script>
