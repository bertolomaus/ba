<script lang="ts" setup>
import { ref } from 'vue'
import { accessCookie } from '~/composables/accessCookie';

const username = ref<string>('u1')
const password = ref<string>('u1')
const authCookie = ref<any>()

// login with credentials
const login = async () => {
    try{
        // send credentials to api/auth
        await $fetch('/api/auth/login',{
            method: 'POST',
            body: {
                username: username.value,
                password: password.value
            }
        })

        // set the auth cookie
        authCookie.value = await accessCookie('auth')
    }
    catch (error){
        // console.error(error.statusMessage);
    }
}

const printCookie = async () => {
    authCookie.value = await accessCookie('auth')
    console.log(authCookie.value)
}

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
    <h2 v-if="authCookie">AUTHED USER ID: {{ authCookie.id }}</h2>
    <form class="form-login" @submit.prevent="login">
        <div class="field-username">
            <input class="border border-black mb-2" type="text" name="username" v-model="username"autocomplete="username" required />
            <label for="username">Email</label>
        </div>
        <div class="field-password">
            <input class="border border-black mb-2" type="text" name="password" v-model="password" autocomplete="current-password" required />
            <label for="password">Passwort</label>
        </div>
        <div class="field-submit">
            <button type="submit">Login</button>
        </div>
    </form>
    <button class="my-4" @click="printCookie()">COOKIE</button>
</template>