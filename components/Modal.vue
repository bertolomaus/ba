<script lang="ts" setup>
import AskQuestion from './AskQuestion.vue'

const { modalAskQuestion } = useModal()
</script>

<template>
  <div class="ask-question">
    <h2 class="h2">Modal</h2>
    <AskQuestion v-if="modalAskQuestion" />
  </div>
</template>