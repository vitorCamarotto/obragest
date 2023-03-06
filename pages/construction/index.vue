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

    <Transition name="blur">
      <ConstructionForm v-if="showForm" @on-form-submit="addConstruction" />
    </Transition>


    <ConstructionCards :constructions="cardConstructions" />
  </div>
</template>

<script setup>

  const { $toast } = useNuxtApp()
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
    try {
      const fetchedConstructions = await $fetch('/api/construction/getAll')

      fetchedConstructions.forEach(element => {
        const construction = {
          id: element.id,
          name: element.name
        }
        cardConstructions.value.push(construction)
      })

    } catch (error) {
      console.error(error)
    }
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
        $toast.success('Yay!!!')

      }
    } catch (error) {
      console.error(error)
    }
  }
</script>

<style>
.blur-enter-active,
.blur-leave-active {
  transition: all 0.4s;
}
.blur-enter-from,
.blur-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.prose {
  max-width: 100%;
}
</style>
