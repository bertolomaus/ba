<script lang="ts" setup>
import EditQuestion from '../components/EditQuestion.vue'
</script>

<template>
  <div class="ask-question">
    <h2 class="h2">Stell deine Frage</h2>
    <EditQuestion :id="0" :update-on-save="false" />
  </div>
</template>