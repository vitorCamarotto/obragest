<template>
  <v-table class="table">
      <thead>
        <tr>
          <th>
            Descrição
          </th>
          <th>
            Valor
          </th>
          <th>
            Data
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="expense in expenses"
          :key="expense"
        >
          <td>{{ expense.description }}</td>
          <td>R$ {{ expense.amount / 100 }}</td>
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
  width: clamp(340px, 90%, 600px);
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

.table th {
  font-weight: bold !important;
  text-align: left !important;
  padding: 10px !important;
  background-color: var(--color-secondary) !important;
  color: #333 !important;
  border-bottom: 2px solid #ddd !important;
}

.table td {
  text-align: left !important;
  padding: 10px !important;
  border-bottom: 1px solid #ddd !important;
}

.table tbody tr:hover {
  background-color: #f5f5f5;
}


</style>