<template>
  <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Nome da Obra
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in constructions"
          :key="item"
        >
          <td>{{ item }}</td>
        </tr>
      </tbody>
    </v-table>
</template>

<script setup>

defineProps({
  constructions: {
    type: Set,
    required: true
  }
})

</script>
