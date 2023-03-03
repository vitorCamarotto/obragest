<template>
  <div class="mt-5">
    <div class="prose flex justify-center">
      <h1 class="ml-3">
        Suas Obras
      </h1>
    </div>

    <div class="flex justify-center mt-4">
      <v-btn
        class="bg-white"
        v-if="!showForm"
        @click="showForm = true"
      >
      <Icon
          name="material-symbols:add-circle-rounded"
          size="24px"
          class="text-amber-lighten-2 mr-2"
        />
        Nova Obra
      </v-btn>
    </div>

    <Transition name="slide-fade">
      <ConstructionForm v-if="showForm" @on-form-submit="addConstruction" />
    </Transition>


    <ConstructionCards :constructions="cardConstructions" />
  </div>
</template>

<script setup>
  // initial setup
  definePageMeta({
    middleware: ['auth']
  })

  const loggedUser = useSupabaseUser()

  onMounted(() => {
    watchEffect(() => {
      if (!loggedUser.value) {
        return navigateTo('/auth/login')
      }
    })

    fetchConstructions()
  })

  // refs
  const showForm = ref(false)
  const cardConstructions = ref(new Array())

  // methods
  async function fetchConstructions () {
    const fetchedConstructions = await $fetch('/api/construction/getAll')

    fetchedConstructions.forEach(element => {
      const construction = {
        id: element.id,
        name: element.name
      }
      cardConstructions.value.push(construction)
    })
  }

  async function addConstruction(name) {
    try {
      const response = await $fetch('/api/construction/create', {
        method: 'POST',
          body: {
            name: name.value,
            userId: loggedUser.value.id
          }
        }
      )

      if (response) {
        const newConstruction = {
          id: response.id,
          name: response.name
        }

        cardConstructions.value.push(newConstruction)
        showForm.value = false
      }
    } catch (error) {
      console.error(error)
    }
  }
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.prose {
  max-width: 100%;
}
</style>
