<template>
  <v-card class="my-5 mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" validate-on="submit">
        <v-text-field
          v-model="constructionName"
          :rules="nameRules"
          class="mb-2"
          clearable
          label="Nome da obra"
        />
        <v-btn
          @click.prevent="addConstruction()"
          class="bg-white"
          size="large"
          type="submit"
          variant="elevated"
        >
          Adicionar Obra
        </v-btn>
      </v-form>
    </v-card>
</template>

<script setup>
  const addConstruction = async () => {
    const response = await $fetch('/api/construction/create', {
      method: 'POST',
        body: {
          name: constructionName.value,
          userId: loggedUser.value.id
        }
      }
    )

    if (response) {
      const newConstruction = {
        id: response.id,
        name: response.name
      }

      constructionName.value = ''
      cardConstructions.value.push(newConstruction)
    }
  }
</script>

<style>

</style>