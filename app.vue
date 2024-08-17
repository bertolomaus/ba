<script lang="ts" setup>
import Navigation from '~/components/Navigation.vue'
import { accessCookie } from '~/composables/accessCookie'

const authCookie = ref<any>()

onMounted(() => {
  // check for auth cookie when loading the page
  authCookie.value = accessCookie('auth')
    .then(cookie => {
      authCookie.value = cookie
    })
    .catch(error => {
      console.error('Error:', error);
    });
})
</script>

<template>
  <div>
    <Navigation />
    <NuxtPage />
  </div>
</template>
