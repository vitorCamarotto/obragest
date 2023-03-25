<template>
  <div class="wrapper">
    <div class="prose flex justify-center mt-5 mb-5">
      <h1>Faça Login</h1>
    </div>
    <v-card class="mx-auto px-6 py-8 card" max-width="344">
      <v-form v-model="valid">
        <v-text-field
          v-model="email"
          class="mb-2"
          clearable
          label="Email"
        />
        <v-text-field
          v-model="password"
          type="password"
          clearable
          label="Password"
          placeholder="Enter your password"
        />
        <v-btn
          @click.prevent="signIn()"
          block
          v-if="!isProcessing"
          class="button"
          size="large"
          type="submit"
          variant="outlined"
        >
          Entrar
        </v-btn>
        <v-progress-circular
          indeterminate
          v-if="isProcessing"
          class="progress-circle"
        />
      </v-form>
    </v-card>

    <div class="prose flex justify-center mt-5">
      <NuxtLink :to="'/auth/signup'" class="font-medium text-blue-600 hover:underline">
        Crie sua conta
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: false
  })

  const { $toast } = useNuxtApp()

  const email = ref('')
  const password = ref('')
  const valid = ref(false)
  let isProcessing = ref(false)

  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const signIn = async () => {
    isProcessing.value = true

    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) {
      isProcessing.value = false
      console.error(error)
      $toast.error('Erro ao fazer login')
    }
  }

  onMounted(() => {
    watchEffect(() => {
      if (user.value) {
        return navigateTo('/construction')
      }
    })
  })
</script>

<style scoped lang="scss">

.prose {
  max-width: 100%;
}

.wrapper {
  margin-top: 200px;
}

.card {
  background-color: var(--color-light);
}
.button {
  color: black !important;
  background-color: white !important;
  border: var(--btn-border)
}

.progress-circle {
  color: var(--color-primary);
  margin-left: 40%;
}
</style>
