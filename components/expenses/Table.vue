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
          <td>R$ {{ expense.amount / 100 }}</td>
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
