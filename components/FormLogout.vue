<script lang="ts" setup>
const props = defineProps({
  id: Number
})

// login with credentials
const logout = async () => {
  try {
    // send credentials to api/auth
    await $fetch('/api/auth/logout', {
      method: 'POST',
      body: {
        id: props.id
      }
    })
  }
  catch (error) {
    // console.error(error.statusMessage);
  }
}
</script>

<template>
  <div class="form-logout">
    <button class="btn btn-logout" @click="logout()">Logout</button>
  </div>
</template>