<script lang="ts" setup>
import FormLogin from '../components/FormLogin.vue'
import FormRegister from '../components/FormRegister.vue'
import FormLogout from '../components/FormLogout.vue'

const props = defineProps({
  authCookie: Object
})


</script>

<template>
  <div class="user-authentication">
    <h1>USER AUTH</h1>
    <FormRegister />
    <FormLogin />
    <FormLogout />
  </div>
</template>