<template>
  <v-app>
    <v-app-bar
      app
      elevation="8"
      class="navbar text-white"
    >
      <v-app-bar-nav-icon class="bg-white">
        <ClientOnly>
          <Icon
            name="material-symbols:other-houses-outline"
            size="40px"
            class="navbar__icon mb-1"
            />
        </ClientOnly>
      </v-app-bar-nav-icon>
      <NuxtLink :to="'/'">
        <div class="prose">
          <v-toolbar-title class="ml-3">ObraGest</v-toolbar-title>
        </div>
      </NuxtLink>
      <v-spacer></v-spacer>
      <v-btn
        @click.prevent="signOut()"
        class="logout-btn"
      >
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

<style scoped lang="scss">
.text-amber-lighten-5 {
  color: #f3f7f9 !important;
}

.navbar {
  background-color: #f3f7f9 !important;
  width: 100%;
  &__icon {
    color: var(--color-primary);
  }
}

.logout-btn {
  color: black !important;
  border: var(--btn-border);
}
</style>
