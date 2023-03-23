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

  const signOut = async () => {
    try {
      await client.auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }

  const loggedUser = useSupabaseUser()

  onMounted(() => {
    console.log(useRoute().path === '/auth/signup')
    if (!useRoute().path === '/auth/signup') {
      watchEffect(() => {
        if(!loggedUser.value) {
          return navigateTo('/auth/login')
        }
      })
    }
  })
</script>

<style scoped lang="scss">
.text-amber-lighten-5 {
  color: var(--color-ice) !important;
}

.navbar {
  background-color: var(--color-ice) !important;
  width: 100%;

  &__icon {
    color: var(--color-primary);
  }

  &__ball {
    animation: colorAnimation 3s infinite;
    background-color: var(--color-ice);

    &-loading {
      background-color: rgb(255, 255, 60);
    }

    &-completed {
      background-color: rgb(41, 246, 41);

    }
  }
}

@keyframes colorAnimation {
  0% {
    background-color: var(--color-ice);
  }

  20% {
    background-color: yellow;
  }

  50% {
    background-color: green;
  }

  100% {
    background-color: var(--color-ice);
  }
}

.logout-btn {
  color: black !important;
  border: var(--btn-border);
}
</style>
