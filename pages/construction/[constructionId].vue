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
      <v-btn class="bg-white">
        <Icon
          name="material-symbols:add-circle-rounded"
          size="24px"
          class="text-amber-lighten-2 mr-2"
          />
        Novo Custo
      </v-btn>
    </div>

    <ExpensesTable :expenses="expenses" class="mt-4"/>

  </div>
</template>

<script setup>
  const constructionId =  useRoute().params.constructionId

  const getConstruction = async () => {
    try {
      const fetchedConstruction = await $fetch(`/api/construction/${constructionId}`)

      return fetchedConstruction
    } catch (error) {
      console.error(error)
    }
  }

  const getExpenses = async () => {
    try {
      const fetchedExpenses = await $fetch(`/api/construction/${constructionId}/expense/getAll`)

      return fetchedExpenses
    } catch (error) {
      console.error(error)
    }
  }

  const construction = await getConstruction()

  const expenses = new Set(await getExpenses())

</script>
