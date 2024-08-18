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
      <div class="field field-email">
        <input type="text" name="email" v-model="email" autocomplete="on" required :class="{'has-text': email}" />
        <label for="email">E-Mail</label>
      </div>
      <div class="field field-password">
        <input type="text" name="password" v-model="password" autocomplete="on" required :class="{'has-text': password}" />
        <label for="password">Passwort</label>
      </div>
      <div class="field field-submit">
        <button class="btn btn-submit" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>