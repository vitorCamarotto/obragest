<template>
  <v-card class="my-5 mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" validate-on="submit">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          class="mb-2"
          clearable
          label="Nome da obra"
        />
        <v-btn
          @click="onSubmit"
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
  const name = ref('')
  const form = ref(false)

  const emit = defineEmits([
    'onFormSubmit'
  ])

  function onSubmit() {
    emit('onFormSubmit', name)
  }

  const nameRules = [
    value => {
      if (value) return true

      return 'Name is requred.'
    }
  ]
</script>
