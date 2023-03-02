<template>
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
        class="bg-amber-lighten-2"
        size="large"
        type="submit"
        variant="elevated"
      >
        Entrar
      </v-btn>
    </v-form>
  </v-card>

  <div class="flex justify-center mt-5">
    <NuxtLink :to="'/auth/signup'" class="font-medium text-blue-600 hover:underline">
      Crie sua conta
    </NuxtLink>
  </div>
</template>

<script setup>
  const email = ref('')
  const password = ref('')
  const valid = ref(false)

  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const signIn = async () => {
    try {
      await client.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })
    } catch (error) {
      console.error(error)
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
