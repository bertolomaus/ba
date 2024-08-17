<script lang="ts" setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { login } = useAuth();

const username = ref<string>('u1')
const password = ref<string>('u1')

// login with credentials
const handleLogin = async () => {
  try {
    // send credentials to api/auth
    const loginRequest = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })
    if(loginRequest.success){
      login(loginRequest.userId)
    }
  }
  catch (error) {
    // console.error(error.statusMessage);
  }
}
</script>

<template>
  <div class="form-login">
    <form @submit.prevent="handleLogin">
      <div class="field-username">
        <input class="border border-black mb-2" type="text" name="username" v-model="username" autocomplete="username"
          required />
        <label for="username">Email</label>
      </div>
      <div class="field-password">
        <input class="border border-black mb-2" type="text" name="password" v-model="password"
          autocomplete="current-password" required />
        <label for="password">Passwort</label>
      </div>
      <div class="field-submit">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>