<script lang="ts" setup>
import { useFetch } from 'nuxt/app';
import { ref } from 'vue';

const username = ref<string>('u1');
const password = ref<string>('u1');
const userData = ref<any>();

const login = async () => {
    userData.value = await useFetch('/api/auth/login',{
        method: 'POST',
        body: {
            username: username.value,
            password: password.value
        }
    });
    console.log(userData.value)
}
</script>

<template>
    <form class="form-login" @submit.prevent="login">
        <div class="field-username">
            <input class="border border-black mb-2" type="text" name="username" v-model="username"autocomplete="username" required />
            <label for="username">Email</label>
        </div>
        <div class="field-password">
            <input class="border border-black mb-2" type="text" name="password" v-model="password" autocomplete="current-password" required />
            <label for="username">Passwort</label>
        </div>
        <div class="field-submit">
            <button type="submit">Login</button>
        </div>
    </form>
</template>