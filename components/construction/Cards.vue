<template>
   <v-container>
    <v-row>
      <v-col
        v-for="item in constructions"
        :key="item"
        cols="12"

      >
        <NuxtLink :to="`/construction/${item.id}`">
          <div class="flex justify-center">
            <v-card
              class="bg-amber-lighten-4"
              height="200"
              width="300"
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
