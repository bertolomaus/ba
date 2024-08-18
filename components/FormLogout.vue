<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth'

const { logout } = useAuth()
</script>

<template>
  <div class="form-logout">
    <form @submit.prevent="logout">
      <div class="field">
        <button class="btn btn-logout btn-submit" type="submit">Logout</button>
      </div>
    </form>
  </div>
</template>