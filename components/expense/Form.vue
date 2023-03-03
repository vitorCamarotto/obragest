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
      <Datepicker
        ref="datepicker"
        class="mb-5"
        v-model="date"
        :format="'dd/MM/yyyy'"
        show-now-button
        now-button-label="Hoje"
        :enable-time-picker="false"
      >
        <template #action-select>
            <v-btn
             size="large"
             class="text-amber-darken-4 mt-3 p-10"
             variant="outlined"
             @click="selectDate"
            >
             Selecionar
            </v-btn>
        </template>
      </Datepicker>

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
      <v-select
        v-model="type"
        :items="expense_types"
        label="Tipo"
      ></v-select>
      <v-select
        v-model="paymentMethod"
        :items="payment_methods"
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
import { expense_types, payment_methods } from '~~/constants'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const datepicker = ref(null)
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

function validate () {
  form.value.validate().then(response => {
      let isValid = response.valid
      valid.value = isValid
    })
  }

function submit () {
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

function selectDate () {
  datepicker.value.selectDate()
}

</script>

<style>
.dp__theme_light {
   --dp-background-color: #ffffff;
   --dp-text-color: #212121;
   --dp-hover-color: #f3f3f3;
   --dp-hover-text-color: #212121;
   --dp-hover-icon-color: #959595;
   --dp-primary-color: #FF8F00;
   --dp-primary-text-color: #f8f5f5;
   --dp-secondary-color: #c0c4cc;
   --dp-border-color: #ddd;
   --dp-menu-border-color: #FFCA28;
   --dp-border-color-hover: #FFCA28;
   --dp-disabled-color: #f6f6f6;
   --dp-scroll-bar-background: #f3f3f3;
   --dp-scroll-bar-color: #FF8F00;
   --dp-success-color: #FF8F00;
   --dp-success-color-disabled: #a3d9b1;
   --dp-icon-color: #FF8F00;
   --dp-danger-color: #ff6f60;
   --dp-highlight-color: rgba(25, 118, 210, 0.1);
}

.dp__action_buttons {
  width: 100%;
}
</style>