<template>
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

  const client = useSupabaseClient()

  const signOut = async () => {
    try {
      await client.auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }

  const user = useSupabaseUser()

  onMounted(() => {
    watchEffect(() => {
      if (!user.value) {
        return navigateTo('/auth/login')
      }
    })
  })

</script>
