<template>
  <div>
    <div class="prose flex justify-center mt-4">
      <h2> Obra: {{ construction.name }} </h2>
    </div>

    <div class="prose flex justify-center mt-4">
      <h3>
        Custos
      </h3>
    </div>

    <ExpensesTable :expenses="expenses"/>
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
