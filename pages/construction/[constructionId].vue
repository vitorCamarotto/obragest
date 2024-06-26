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

    <Transition name="blur">
      <div class="mt-4"
        v-if="!showForm"
      >
        <v-btn
          @click="showForm = true"
          class="bg-white"
        >
          <Icon
            name="material-symbols:add-circle-rounded"
            size="24px"
            class="plus-icon mr-2"
            />
          Novo Custo
        </v-btn>
      </div>
    </Transition>

    <Transition name="blur">
      <ExpenseForm
        v-if="showForm"
        @on-form-submit="createExpense"
        @closeForm="showForm = false"
        />
    </Transition>

    <ExpenseTable
      :expenses="expenses"
      @onDeleteExpense="deleteExpense"
      class="mt-4"
    />
  </div>
</template>

<script setup>
  const { $toast } = useNuxtApp()
  let isProcessing = ref(true)

  // consts
  const constructionId =  useRoute().params.constructionId

  const showForm = ref(false)
  const construction = await getConstruction()
  let expenses = ref(await getExpenses())

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
    isProcessing.value = true

    try {
      const fetchedExpenses = await $fetch(`/api/construction/${constructionId}/expense/getAll`)

      isProcessing.value = false

      return fetchedExpenses
    } catch (error) {
      console.error(error)

      isProcessing.value = false
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
        expenses.value.unshift(response)
        showForm.value = false
        $toast.success('Custo adicionado')
      }

    } catch (error) {
      console.error(error)
      $toast.error('Erro ao adicionar custo')
    }
  }

  async function deleteExpense (expenseId) {
  try {
    const response = await $fetch(`/api/construction/${constructionId}/expense/delete`, {
      method: 'DELETE',
      body: {
        expenseId: expenseId
      }
    })

    if (response) {
      expenses.value = expenses.value.filter(expense => expense.id !== expenseId) // Add this line
      $toast.success('Custo removido')
    }
  } catch (error) {
    console.error(error)
    $toast.error('Erro ao remover custo')
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

.plus-icon {
  color: var(--color-primary);
}


.progress-circle {
  color: var(--color-primary);
  margin-top: 100px;
}
</style>
