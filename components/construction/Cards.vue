<template>
   <v-container>
    <v-row>
      <v-col
        v-for="item in constructions"
        :key="item"
        cols="12"

      >
        <div class="flex justify-center">
          <NuxtLink :to="`/construction/${item.id}`">
            <v-card
              class="bg-amber-lighten-4"
              height="200"
              width="300"
              :title="item.name"
            ></v-card>
          </NuxtLink>
        </div>
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
