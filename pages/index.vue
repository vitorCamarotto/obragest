<template>
  <v-card>
    <v-layout>
      <v-app-bar title="ObraGest"></v-app-bar>

      <v-navigation-drawer>
        <v-list>
          <v-list-item title="Navigation drawer"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 300px;">
        <v-btn variant="outlined" @click="createUser">
          Button
        </v-btn>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>

export default {
  methods: {
    async createUser () {
      try {
        await $fetch('/api/user/create')
      } catch (error) {
        console.error(error)
      }
    }
  }
}

</script>