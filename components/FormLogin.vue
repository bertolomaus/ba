<script lang="ts" setup>
import { ref } from 'vue';
const username = ref<string>('u1');
const password = ref<string>('u1');
const userData = ref<any>();
const cookieData = ref<any>();

const login = async () => {
    try{
        userData.value = await $fetch('/api/auth/login',{
            method: 'POST',
            body: {
                username: username.value,
                password: password.value
            }
        });
    }
    catch (error){
        // console.error(error.statusMessage);
    }
}

const accessCookie = async (name: string) => {
    try{
        cookieData.value = await $fetch('/api/accessCookie',{
            method: 'POST',
            body: {
                name: name
            }
        });
        return cookieData.value
    }
    catch (error){
        // console.error(error.statusMessage);
    }
}

const printCookie = () => {
    const cookie = accessCookie('auth');
    console.log(cookie)
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
            <label for="password">Passwort</label>
        </div>
        <div class="field-submit">
            <button type="submit">Login</button>
        </div>
    </form>
    <button class="my-4" @click="printCookie()">COOKIE</button>
</template>