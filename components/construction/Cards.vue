<template>
   <v-container>
    <v-row>
      <v-col
        v-for="item in constructions"
        :key="item"
        cols="12"

      >
        <NuxtLink :to="`/construction/${item.id}`">
          <div class="">
            <v-card
              class="bg-amber-lighten-4"
              height="200"
              :title="item.name"
            >
              <v-card-actions>
                <v-btn></v-btn>
              </v-card-actions>
          </v-card>
          </div>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

defineProps({
  constructions: {
    type: Array,
    required: true
  }
})

</script>

<style>

</style>