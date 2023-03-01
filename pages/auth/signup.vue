<template>
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
        Cadastrar
      </v-btn>
    </v-form>
  </v-card>

  <div class="flex justify-center">
    <div class="prose">
      <p class="flex justify-center mt-5">
        Você receberá um email de confirmação.
      </p>
    </div>
  </div>
  <div class="flex justify-center mt-4">
    <NuxtLink :to="'/auth/login'" class="font-medium text-blue-600 hover:underline">
      Fazer Login
    </NuxtLink>
  </div>
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