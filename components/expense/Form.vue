<template>
  <v-card class="my-5 mx-auto px-6 py-8 bg-amber-lighten-5" width="500">
    <div class="prose flex justify-center mb-3 mt-5">
      <h2 class="mt-3">
        Adicionar custo
      </h2>
    </div>
    <v-form
      v-model="valid"
      ref="form"
      validate-on="input"
    >
      <v-text-field
        v-model="amount"
        class="mb-2"
        label="Valor"
        clearable
      />
      <v-text-field
        v-model="description"
        class="mb-2"
        label="Descrição"
        clearable
      />
      <v-text-field
        v-model="type"
        class="mb-2"
        label="Tipo"
        clearable
      />
      <v-text-field
        v-model="date"
        class="mb-2"
        label="Data"
        clearable
      />
      <v-text-field
        v-model="paymentMethod"
        class="mb-2"
        label="Método de Pagamento"
        clearable
      />
      <div class="flex justify-center">
        <v-btn
          @click.prevent="submit"
          class="bg-amber-lighten-2"
          size="large"
          variant="elevated"
        >
          Adicionar custo
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup>

const form = ref(null)
const valid = ref(false)
const description = ref('')
const type = ref('')
const amount = ref('')
const date = ref(null)
const paymentMethod = ref('')

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

  let params = {
    description: description.value,
    type: type.value,
    amount: amount.value,
    date: date.value,
    paymentMethod: paymentMethod.value
  }

  if (valid.value) {
    emit('onFormSubmit', params)
  }
}

</script>
