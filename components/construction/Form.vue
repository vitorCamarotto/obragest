<template>
  <v-card class="my-5 mx-auto px-6 py-8" max-width="344">
    <div class="close-btn">
      <Icon
        name="material-symbols:close-rounded"
        @click="closeForm"
      ></Icon>
    </div>
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
          v-if="!isProcessing"
          class="submit-btn"
          size="large"
          variant="elevated"
        >
          Adicionar Obra
        </v-btn>
        <v-progress-circular
          indeterminate
          v-if="isProcessing"
          class="progress-circle"
        />
      </div>
    </v-form>
  </v-card>
</template>

<script setup>
  let isProcessing = ref(false)

  const form = ref(null)
  const valid = ref(false)
  const name = ref('')
  const nameRules = [
      v => !!v || 'Nome da obra é obrigatório',
      v => (v && v.length <= 20) || 'O nome deve ter no máximo 20 caracteres',
  ]

  const emit = defineEmits([
    'onFormSubmit', 'closeForm'
  ])

  function validate() {
    form.value.validate().then(response => {
      let isValid = response.valid
      valid.value = isValid
    })
  }

  function submit() {
    isProcessing.value = true

    validate()

    if (valid.value) {
      emit('onFormSubmit', name)
    }

    isProcessing.value = false
  }

  function closeForm () {
    emit('closeForm')
  }
</script>

<style scoped lang="scss">

.submit-btn {
  color: black !important;
  background-color: var(--color-primary) !important;
}

.close-btn {
  display: flex;
  justify-content: flex-end;
  font-size: 32px;
  margin-bottom: 24px;
  cursor: pointer;
}

.progress-circle {
  color: var(--color-primary);
}
</style>
