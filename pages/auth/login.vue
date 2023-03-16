<template>
  <div>

    <div class="prose flex justify-center mt-5">
      <h1>Faça Login</h1>
    </div>
    <v-card class="mx-auto px-6 py-8" max-width="344">
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
  const email = ref('')
  const password = ref('')
  const valid = ref(false)
  let isProcessing = ref(false)

  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const signIn = async () => {
    isProcessing.value = true
    console.log(isProcessing)
    try {
      await client.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })
    } catch (error) {
      console.error(error)
    }

    isProcessing.value = false
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