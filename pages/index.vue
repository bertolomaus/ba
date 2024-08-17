<script lang="ts" setup>
import FormLogin from '../components/FormLogin.vue'
import FormRegister from '../components/FormRegister.vue'
import UserAuthentication from '../components/UserAuthentication.vue'
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
  <UserAuthentication :authCookie="authCookie" />
</template>