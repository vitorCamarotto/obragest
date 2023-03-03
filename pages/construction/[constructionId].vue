<template>
  <div class="flex flex-col align-center">
    <div class="prose mt-4">
      <h2> Obra: {{ construction.name }} </h2>
    </div>

    <div class="prose mt-4">
      <h3>
        Custos
      </h3>
    </div>

    <div class="mt-4">
      <v-btn
        v-if="!showForm"
        @click="showForm = true"
        class="bg-white"
      >
        <Icon
          name="material-symbols:add-circle-rounded"
          size="24px"
          class="text-amber-lighten-2 mr-2"
          />
        Novo Custo
      </v-btn>
    </div>

    <Transition name="slide-fade">
      <ExpenseForm v-if="showForm" @on-form-submit="createExpense" />
    </Transition>

    <ExpenseTable :expenses="expenses" class="mt-4"/>

  </div>
</template>

<script setup>
  const loggedUser = useSupabaseUser()

  onMounted(() => {
    watchEffect(() => {
      if(!loggedUser.value) {
        return navigateTo('/auth/login')
      }
    })
  })

  // consts
  const constructionId =  useRoute().params.constructionId

  const showForm = ref(false)
  const construction = await getConstruction()
  const expenses = new Set(await getExpenses())

  // methods
  async function getConstruction () {
    try {
      const fetchedConstruction = await $fetch(`/api/construction/${constructionId}`)

      return fetchedConstruction
    } catch (error) {
      console.error(error)
    }
  }

  async function getExpenses () {
    try {
      const fetchedExpenses = await $fetch(`/api/construction/${constructionId}/expense/getAll`)

      return fetchedExpenses
    } catch (error) {
      console.error(error)
    }
  }

  function createExpense (params) {
    console.log('params', params.type)
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
</style>