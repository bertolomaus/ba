<script lang="ts" setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { generateNumber } from '~/composables/generateRandomNumber'

const { login } = useAuth();
const username = ref<string>('');
const password = ref<string>('');
const passwordConfirm = ref<string>('');

const register = async () => {
  // generate a random 8-digit id
  const newId = ref<number>(generateNumber(8))

  let requestUsername = await $fetch('/api/data/getUsername', {
    method: 'POST',
    body: {
      username: username.value,
      id: newId.value
    }
  })

  // if newId is by change unavailable, keep generating new ones until one is free
  while(requestUsername.matchingIdFound){
    newId.value = generateNumber(8)
    requestUsername = await $fetch('/api/data/getUsername', {
      method: 'POST',
      body: {
        username: username.value,
        id: newId.value
      }
    })
  }

  // check if username is already taken
  if(requestUsername.matchingNameFound){
    console.log('name already taken')
  }
  //check if pw was entered correctly
  else if(password.value === passwordConfirm.value){
    // insert a new user into table 'users'
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        id: newId.value,
        username: username.value,
        password: password.value
      }
    })
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