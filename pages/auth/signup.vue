<template>
  <div>
    <div class="flex justify-center mt-5">
      <div class="prose">
        <h1>
          Crie sua conta
        </h1>
      </div>
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
          @click.prevent="signUp()"
          v-if="!isProcessing"
          block
          class="button"
          size="large"
          type="submit"
          variant="outlined"
        >
          Cadastrar
        </v-btn>
        <v-progress-circular
          indeterminate
          v-if="isProcessing"
          class="progress-circle"
        />
      </v-form>
    </v-card>

    <div class="flex justify-center">
      <div class="prose">
        <p class="flex justify-center mt-5">
          Você receberá um email de confirmação.
        </p>
      </div>
    </div>
    <div class="prose flex justify-center mt-4">
      <NuxtLink :to="'/auth/login'" class="font-medium text-blue-600 hover:underline">
        Fazer Login
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const { $toast } = useNuxtApp()

  const email = ref('')
  const password = ref('')
  const valid = ref(false)
  let isProcessing = ref(false)

  const client = useSupabaseClient()

  async function signUp () {
    isProcessing.value = true

    try {
      await client.auth.signUp({
        email: this.email,
        password: this.password
      })

      $toast.success('Sucesso! Verifique seu email')
    } catch (error) {
      console.error(error)
    }

    isProcessing.value = false
  }


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
