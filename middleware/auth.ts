export default defineNuxtRouteMiddleware ((to) => {
  const user = useSupabaseUser()

  console.log('HOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', user.value)
  if (!user.value) {
    return navigateTo('/auth/login')
  }
})