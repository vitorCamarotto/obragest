<template>
  <div class="mt-5">
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="valid">
        <v-text-field
          v-model="constructionName"
          class="mb-2"
          clearable
          label="Nome da obra"
        />
        <v-btn
          @click.prevent="addConstruction()"
          class="bg-white"
          size="large"
          type="submit"
          variant="elevated"
        >
          Adicionar Obra
        </v-btn>
      </v-form>
    </v-card>
  </div>
  <v-container>
    <v-row>
      <v-col
        v-for="item in cardConstructions"
        :key="item"
        cols="12"
        class="flex justify-center"

      >
        <NuxtLink :to="`/construction/${item.id}`">
          <div class="">
            <v-card
              class="bg-amber-lighten-4"
              height="200"
              width="500"
              :title="item.name"
            >
              <v-card-actions>
                <v-btn></v-btn>
              </v-card-actions>
          </v-card>
          </div>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })

  const constructionName = ref('')
  const valid = ref(false)
  const cardConstructions = ref(new Set())

  const loggedUser = useSupabaseUser()

  onMounted(() => {
    watchEffect(() => {
      if (!loggedUser.value) {
        return navigateTo('/auth/login')
      }
    })

    fetchConstructions()
  })

  const addConstruction = async () => {
    const response = await $fetch('/api/construction/create', {
      method: 'POST',
        body: {
          name: constructionName.value,
          userId: loggedUser.value.id
        }
      }
    )

    fetchConstructions()
  }

  const fetchConstructions = async () => {
    const fetchedConstructions = await $fetch('/api/construction/getAll')

    fetchedConstructions.forEach(element => {
      const construction = {
        name: element.name,
        id: element.id
      }
      cardConstructions.value.add(construction)
    });
  }

</script>
