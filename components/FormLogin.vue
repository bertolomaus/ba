<script lang="ts" setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { login } = useAuth();

const email = ref<string>('')
const password = ref<string>('')

// login with credentials
const handleLogin = async () => {
  try {
    // send credentials to api/auth
    const loginRequest = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
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
      <div class="field-email">
        <input class="border border-black mb-2" type="text" name="email" v-model="email" autocomplete="on"
          required />
        <label for="email">E-Mail</label>
      </div>
      <div class="field-password">
        <input class="border border-black mb-2" type="text" name="password" v-model="password"
          autocomplete="on" required />
        <label for="password">Passwort</label>
      </div>
      <div class="field-submit">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>