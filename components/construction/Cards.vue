<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="item in constructions"
        :key="item.id"
        cols="12"
        md="6"
        lg="4"
        class="my-4"
      >
        <div class="construction-card" @contextmenu.prevent="rightClickMenu">
          <NuxtLink :to="`/construction/${item.id}`" @click="onCardClick">
            <v-card
              class="elevation-10 rounded-lg bg-white"
              height="100px"
              width="100%"
              :src="item.image"
              :alt="item.name"
            >
              <v-progress-linear
                  class="construction-progress"
                  color="blue"
                  height="5"
                  :value="item.progress"
                  background-color="rgba(0,0,0,0.1)"
                  rounded
              ></v-progress-linear>
              <v-card-title class="text-center text-uppercase">
                {{ item.name }}
              </v-card-title>
            </v-card>
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

  function rightClickMenu () {
    alert('oiiii')
  }
  const emit = defineEmits([
    'onCardClick'
  ])

  function onCardClick () {
    emit('onCardClick')
  }
</script>

<style scoped>
.construction-card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;
}

.construction-card v-card {
  transition: transform 0.3s;
}

.construction-card:hover v-card {
  transform: scale(1.1);
}

.construction-card v-card-title {
  font-weight: 600;
  font-size: 18px;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 10px;
}

.construction-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: -5px;
}
</style>
