<script lang="ts" setup>
import { accessCookie } from '~/composables/accessCookie'

const authCookie = ref<any>()

onMounted(() => {
  // check for auth cookie when loading the page
  authCookie.value = accessCookie('auth')
    .then(cookie => {
      authCookie.value = cookie
      console.log(authCookie.value)
    })
    .catch(error => {
      console.error('Error:', error);
    });
})
</script>

<template>
  <div>
    <h1 class="">Profil</h1>
  </div>
</template>