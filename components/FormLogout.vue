<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth'

const { logout } = useAuth()
</script>

<template>
  <div class="form-logout">
    <button class="btn btn-logout" @click="logout()">Logout</button>
  </div>
</template>