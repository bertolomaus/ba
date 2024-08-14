<script lang="ts" setup>
const addUser = async () => {
    const { data } = await $fetch('/api/auth/register');
}
</script>

<template>
    <button @click="addUser">ADD</button>
</template>