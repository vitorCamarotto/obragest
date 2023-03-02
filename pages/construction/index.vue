<template>
  <div class="mt-5">
    <div class="prose">
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

    <ConstructionForm v-if="showForm" @on-form-submit="addConstruction" />
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

        name.value = ''
        cardConstructions.value.push(newConstruction)
      }
    } catch (error) {
      console.error(error)
    }
  }
</script>
