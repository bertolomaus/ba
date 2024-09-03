<script lang="ts" setup>
import UserAuthentication from '../components/UserAuthentication.vue'
import BavariaIpsum from '../components/BavariaIpsum.vue'

const { isLoggedIn } = useAuth()
const { modalShowAskQuestion } = useModal()
const { showSidebar } = useToggleContent()

onMounted(() => {
  showSidebar.value = false
})
</script>

<template>
  <div class="dashboard">
    <div class="container">
      <div class="el-headline">
        <h1>Willkommen im Freiraum</h1>
      </div>
      <div class="el-text columns-2 gap-8">
        <BavariaIpsum :paragraphs="3" />
      </div>
    </div>
    
    <UserAuthentication v-if="!isLoggedIn" />
    <div class="btn mx-auto w-max mt-8" @click="modalShowAskQuestion">Frage Stellen</div>
  </div>
</template>