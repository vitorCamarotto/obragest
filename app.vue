<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
export default {
  setup () {
    const client = useSupabaseClient()

    return {
      client
    }
  }
}
</script>