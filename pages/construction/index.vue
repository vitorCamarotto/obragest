<template>
  <div class="mt-5">
    <div class="prose flex justify-center">
      <h1 class="ml-3">
        Suas Obras
      </h1>
    </div>

    <Transition name="blur">
      <div class="flex justify-center mt-4" v-if="!showForm">
        <v-btn
          class="bg-white"
          @click="showForm = true"
        >
        <Icon
            name="material-symbols:add-circle-rounded"
            size="24px"
            class="plus-icon mr-2"
          />
          Nova Obra
        </v-btn>
      </div>
    </Transition>


    <Transition name="blur">
      <ConstructionForm
        v-if="showForm"
        @on-form-submit="addConstruction"
        @closeForm="showForm = false" />
    </Transition>

    <div class="construction-cards">
      <Transition name="blur" mode="out-in">
        <v-progress-circular
          :size="100"
          indeterminate
          v-if="isProcessing"
          class="progress-circle"
        />
        <ConstructionCards
          v-else
          :constructions="cardConstructions"
          @on-card-click="onCardClick"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup>
  const { $toast } = useNuxtApp()

  // initial setup
  definePageMeta({
    middleware: ['auth']
  })

  onMounted(() => {
    fetchConstructions()
  })

  // refs
  const showForm = ref(false)
  const cardConstructions = ref(new Array())
  let isProcessing = ref(true)

  // methods
  function onCardClick () {
    isProcessing.value = true
  }

  async function fetchConstructions () {
    isProcessing.value = true
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
    isProcessing.value = false
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
        $toast.success('Construção adicionada')

      }
    } catch (error) {
      console.error(error)
      $toast.error('Erro ao adicionar construção')
    }
  }
</script>

<style scoped lang="scss">
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

.plus-icon {
  color: var(--color-primary);
}

.construction-cards {
  display: flex;
  justify-content: center;
}

.progress-circle {
  color: var(--color-primary);
  margin-top: 100px;
}
</style>
