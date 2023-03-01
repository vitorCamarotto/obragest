<template>
  <v-app>
    <v-app-bar
      app
      class="bg-blue"
    >
    <v-app-bar-nav-icon class="bg-white"></v-app-bar-nav-icon>

    <NuxtLink :to="'/'">
      <v-toolbar-title>ObraGest</v-toolbar-title>
    </NuxtLink>

      <v-spacer></v-spacer>

      <v-btn
        @click.prevent="signOut()"
        class="bg-white">
        Sair
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
  const client = useSupabaseClient()

  const signOut = async () => {
    try {
      await client.auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }
</script>
