export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn.value && to.path !== '/') {
    return navigateTo('/')
  }
})