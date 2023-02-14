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
</script>

<script>
export default {
  setup () {
    const client = useSupabaseClient()

    return {
      client
    }
  },
  methods: {
    async signOut () {
      try {
        await this.client.auth.signOut()
      } catch (error) {
        console.error(error)
      }
    }
  }
}

</script>