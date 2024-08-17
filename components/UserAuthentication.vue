<script lang="ts" setup>
import FormLogin from '../components/FormLogin.vue'
import FormRegister from '../components/FormRegister.vue'
import FormLogout from '../components/FormLogout.vue'
import { useAuth } from '~/composables/useAuth'

const { isLoggedIn } = useAuth();

const logShiet = () => {
}

</script>

<template>
  <div class="user-authentication">
    <h1>USER AUTH</h1>
    <p>auth status: {{ isLoggedIn }}</p>
    <p>user id:</p>
    <button @click="logShiet()" class="border border-slate-600 bg-slate-100 my-4 py-4 px-16">LOG SHIET</button>
    <FormRegister />
    <FormLogin />
    <FormLogout />
  </div>
</template>