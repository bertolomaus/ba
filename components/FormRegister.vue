<script lang="ts" setup>
import { ref } from 'vue';
const username = ref<string>('');
const password = ref<string>('');
const passwordConfirm = ref<string>('');
const userData = ref<any>();

const register = async () => {
  try {
    userData.value = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    });
  }
  catch (error) {
    // console.error(error.statusMessage);
  }
}
</script>

<template>
  <div class="form-register">
    <form @submit.prevent="register">
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
      <div class="field-password">
        <input class="border border-black mb-2" type="text" name="password" v-model="passwordConfirm"
          autocomplete="current-password" required />
        <label for="password">Passwort bestätigen</label>
      </div>
      <div class="field-submit">
        <button type="submit">Registrieren</button>
      </div>
    </form>
  </div>
</template>