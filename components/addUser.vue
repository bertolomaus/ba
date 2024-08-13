<script lang="ts" setup>

const addUser = async () => {
    const { data } = await useFetch('/api/addUser');
    console.log(data);
}
</script>

<template>
    <div>
        <h1>Add User</h1>
        <button @click="addUser">ADD</button>
    </div>
</template>