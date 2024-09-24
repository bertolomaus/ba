<script lang="ts" setup>
import EditQuestion from '../components/EditQuestion.vue'
onMounted(() => {
})
</script>

<template>
  <div class="ask-question">
    <h2 class="h2">What knowledge dost thou seek?</h2>
    <EditQuestion :id="0" :update-on-save="false" />
  </div>
</template>