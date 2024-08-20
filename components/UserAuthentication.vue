<script lang="ts" setup>
import FormLogin from '../components/FormLogin.vue'
import FormRegister from '../components/FormRegister.vue'

const { showLogin } = useToggleContent()
</script>

<template>
  <div class="user-authentication">
    <FormLogin v-if="showLogin" />
    <FormRegister v-else />
  </div>
</template>