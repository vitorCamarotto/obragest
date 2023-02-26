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
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Sign In
      </v-btn>
    </v-form>
  </v-card>
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
