<template>
  <v-table class="table">
    <thead>
      <tr>
        <th>
          Valor
        </th>
        <th>
          Detalhes
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="expense in formattedExpenses"
        :key="expense.id"
      >
      <td>{{ expense.formattedAmount }}</td>
      <td>
        <v-expansion-panels variant="popout">
          <v-expansion-panel>
            <v-expansion-panel-title>
              {{ expense.type }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="expand-wrapper">
                <div class="expand-left-side">
                  <div>
                    {{ expense.formattedDate }}
                  </div>
                  <v-divider class="border-opacity-100"></v-divider>
                  <div>
                    {{ expense.payment_method }}
                  </div>
                  <v-divider class="border-opacity-100"></v-divider>
                  <div>
                    {{ expense.description }}
                  </div>
                </div>
                <div class="expand-right-side">
                  <Icon
                    name="material-symbols:delete"
                    class="trash-icon"
                    @click="deleteExpense(expense.id)"
                  />
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
  const props = defineProps({
    expenses: {
      type: Array,
      required: true
    }
  })

  const emit = defineEmits([
    'onDeleteExpense'
  ])

  function deleteExpense (expenseId) {
    alert('Tem certeza que deseja remover essa despesa?')
    emit('onDeleteExpense', expenseId)
  }

  const formattedExpenses = computed(() => {
    return props.expenses.map(expense => {
      const formattedDate = expense.date
        ? new Date(expense.date).toLocaleDateString('pt-BR')
        : "";

      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      });

      const formattedAmount = formatter.format(expense.amount / 100);

      return {
        ...expense,
        formattedAmount,
        formattedDate
      };
    });
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
  background-color: var(--color-ice);
}

.expand-wrapper {
  display: flex;
}
.expand-left-side {
  width: 70%;
}
.expand-right-side {
  display: flex;
  justify-content: center;
  width: 30%;
}

.trash-icon {
  margin-top: 12px;
  font-size: 24px;
  cursor: pointer;
}
</style>

<style>
.v-expansion-panel-text__wrapper {
  padding: 4px 12px 8px;
  flex: 1 1 auto;
  max-width: 100%;
  min-height: 240px;
}

.v-expansion-panel--active > .v-expansion-panel-title {
  min-height: 24px;
}
</style>
