<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth'

const { logout } = useAuth()
const { clearData } = useUserData()
</script>

<template>
  <div class="form-logout">
    <form @submit.prevent="logout(), clearData()">
      <div class="field">
        <button class="btn btn-logout btn-submit" type="submit">Logout</button>
      </div>
    </form>
  </div>
</template>