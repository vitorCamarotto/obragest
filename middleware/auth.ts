export default defineNuxtRouteMiddleware ((to) => {
  const user = useSupabaseUser()

  if (!user.value) {
    return navigateTo('/auth/login')
  } else if (user.value && to.path === '/') {
    return navigateTo('/construction')
  }
})