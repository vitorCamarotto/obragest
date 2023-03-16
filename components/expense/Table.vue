<template>
  <v-table class="table">
      <thead>
        <tr>
          <th class="text-left">
            Valor
          </th>
          <th class="text-left">
            Tipo
          </th>
          <th class="text-left">
            Descrição
          </th>
          <th class="text-left">
            Método de Pagamento
          </th>
          <th class="text-left">
            Data
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="expense in expenses"
          :key="expense"
        >
          <td>R$ {{ expense.amount / 100 }}</td>
          <td>{{ expense.type }}</td>
          <td>{{ expense.description }}</td>
          <td>{{ expense.payment_method }}</td>
          <td>{{ expense.date }}</td>
        </tr>
      </tbody>
    </v-table>
</template>

<script setup>

const props = defineProps({
  expenses: {
    type: Set,
    required: true
  }
})

props.expenses.forEach(element => {
  if (element.date) {
    let date = new Date(element.date).toLocaleDateString('pt-BR')
    element.date = date
  }
});
</script>


<style scoped lang="scss">
.table {
  background-color: var(--color-light);
  margin-bottom: 24px;
}

</style>