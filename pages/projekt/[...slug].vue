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

// const url = ref<string>(window.location.href.split('projekt/')[1])
// const contentQuery = await queryContent('projekt').where({ _path: '/projekt/' + url.value }).findOne()
</script>

<template>
  <div>
    <h1 class="">Fragen</h1>
  </div>
</template>