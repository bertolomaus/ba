<script lang="ts" setup>
import AskQuestion from './AskQuestion.vue'
import SVGClose from './SVGClose.vue'

const { modalAskQuestion, toggleModal, showModal } = useModal()
</script>

<template>
  <div class="modal" :class="{'open': showModal}">
    <div class="modal-overlay" @click="toggleModal"></div>
    <SVGClose class="modal-close" @click="toggleModal" />
    <div class="modal-content">
      <AskQuestion v-if="modalAskQuestion" />
    </div>
  </div>
</template>