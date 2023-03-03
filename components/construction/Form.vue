<template>
  <v-card class="my-5 mx-auto px-6 py-8" max-width="344">
    <v-form
      v-model="valid"
      ref="form"
      validate-on="input"
    >
      <v-text-field
        v-model="name"
        :rules="nameRules"
        class="mb-2"
        label="Nome da obra"
        clearable
      />
      <div class="flex justify-center">
        <v-btn
          @click.prevent="submit"
          class="bg-amber-lighten-2"
          size="large"
          variant="elevated"
        >
          Adicionar Obra
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup>
  const form = ref(null)
  const valid = ref(false)
  const name = ref('')
  const nameRules = [
      v => !!v || 'Nome da obra é obrigatório',
      v => (v && v.length <= 20) || 'O nome deve ter no máximo 20 caracteres',
  ]

  const emit = defineEmits([
    'onFormSubmit'
  ])

  function validate() {
    form.value.validate().then(response => {
      let isValid = response.valid
      valid.value = isValid
    })
  }

  function submit() {
    validate()

    if (valid.value) {
      emit('onFormSubmit', name)
    }
  }
</script>
