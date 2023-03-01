<template>
  <v-table>
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
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="expense in expenses"
          :key="expense"
        >
          <td>{{ expense.amount }}</td>
          <td>{{ expense.type }}</td>
          <td>{{ expense.description }}</td>
        </tr>
      </tbody>
    </v-table>
</template>

<script setup>

defineProps({
  expenses: {
    type: Set,
    required: true
  }
})

</script>
