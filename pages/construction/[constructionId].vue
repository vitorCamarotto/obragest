<template>
  <div>
    <h1> Obra: {{ construction.name }} </h1>

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

  const construction = await getConstruction()
</script>

<style>

</style>