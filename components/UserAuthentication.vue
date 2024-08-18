<script lang="ts" setup>
import FormLogin from '../components/FormLogin.vue'
import FormRegister from '../components/FormRegister.vue'
import FormLogout from '../components/FormLogout.vue'
import { useAuth } from '~/composables/useAuth'
import { useData } from '~/composables/useData'

const { isLoggedIn, userId } = useAuth()
const { getName, updateUserData } = useData()

</script>

<template>
  <div class="user-authentication">
    <FormRegister class="mb-8" />
    <FormLogin class="mb-8"  />
    <FormLogout />
  </div>
</template>