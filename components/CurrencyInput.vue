<template>
  <v-text-field
    ref="inputRef"
    class="mb-2"
    label="Valor"
    clearable
  />
</template>

<script>
import { watch } from 'vue'
import { useCurrencyInput } from 'vue-currency-input'

const CURRENCY_OPTIONS = {
  locale: 'pt-BR',
  precision: 2,
  currency: 'BRL',
  currencyDisplay: 'symbol',
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: true,
  useGrouping: true,
  accountingSign: false,
  valueScaling: 'precision',
  allowNegative: false
}

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  setup (props) {
    Object.entries(props.options).forEach(
      ([key, value]) => { CURRENCY_OPTIONS[key] = value }
    )

    const { inputRef, formattedValue, setValue } = useCurrencyInput(CURRENCY_OPTIONS)

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value)
      }
    )

    return { inputRef, formattedValue }
  }
}
</script>
