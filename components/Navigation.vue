<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth'
const { isLoggedIn, userId } = useAuth()
</script>

<template>
  <nav class="navigation">
    <ul class="flex flex-row justify-center">
      <li>
        <NuxtLink to="/">Dashboard</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/profil">Profil</NuxtLink>
      </li>
      <li>
        Logged In: {{ isLoggedIn }}, User ID: {{ userId }}
      </li>
    </ul>
  </nav>
</template>