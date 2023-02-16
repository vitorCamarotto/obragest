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
        @click.prevent="signUp()"
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

<script>
  export default {
    data () {
      return {
        valid: false,
        email: '',
        password: ''
      }
    },
    methods: {
      async signUp () {

        try {
          await this.client.auth.signUp({
            email: this.email,
            password: this.password
          })
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
</script>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })
</script>