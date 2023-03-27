<template>
  <v-app>
    <v-app-bar
      app
      elevation="8"
      class="navbar text-white"
    >
      <v-app-bar-nav-icon class="navbar__ball">
        <NuxtLink :to="'/'">

        <ClientOnly>
          <Icon
            name="material-symbols:other-houses-outline"
            size="40px"
            class="navbar__icon mb-1"
            />
        </ClientOnly>
      </NuxtLink>
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

  async function signOut () {
    try {
      await client.auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }

  const loggedUser = useSupabaseUser()

  onMounted(() => {
    if (useRoute().path !== '/auth/signup') {
      watchEffect(() => {
        if(!loggedUser.value) {
          return navigateTo('/auth/login')
        }
      })
    }
  })
</script>

<style scoped lang="scss">

.navbar {
  background-color: var(--color-ice) !important;
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
