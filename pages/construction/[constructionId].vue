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

    <Transition name="blur">
      <ExpenseForm v-if="showForm" @on-form-submit="createExpense" />
    </Transition>

    <ExpenseTable :expenses="expenses" class="mt-4"/>

  </div>
</template>

<script setup>
  const { $toast } = useNuxtApp()
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
  const expenses = ref(new Set(await getExpenses()))

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

  async function createExpense (params) {
    try {
      const response = await $fetch(`/api/construction/${constructionId}/expense/create`, {
        method: 'POST',
          body: {
            amount: params.amount,
            description: params.description,
            type: params.type,
            date: params.date,
            payment_method: params.paymentMethod
        }
      })

      if (response) {
        expenses.value.add(response)
        showForm.value = false
        $toast.success('Custo adicionado')
        console.log(client)
      }

    } catch (error) {
      console.error(error)
      $toast.error('Erro ao adicionar custo')
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
</style>