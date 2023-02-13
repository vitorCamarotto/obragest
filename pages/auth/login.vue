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

<script>
  export default {
    data () {
      return {
        valid: false,
        email: '',
        password: ''
      }
    },
    setup () {
      const client = useSupabaseClient()

      return {
        client
      }
    },
    methods: {
      async signIn () {
        try {
         await this.client.auth.signInWithPassword({
            email: this.email,
            password: this.password
          })

          await navigateTo('/construction')
        } catch (error) {
          console.error(error)
        }
      },
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