<script lang="ts" setup>
import EditProject from '../components/EditProject.vue'

onMounted(() => {
})
</script>

<template>
  <div class="new-project">
    <h2 class="h2">Starte ein neues Projekt</h2>
    <EditProject :update-on-save="false" :id="0" />
  </div>
</template>