<script lang="ts" setup>
import NewQuestion from './NewQuestion.vue'
import NewProject from './NewProject.vue'
import SVGClose from './SVGClose.vue'

const { modalNewProject, modalNewQuestion, toggleModal, showModal } = useModal()
</script>

<template>
  <div class="modal" :class="{'open': showModal}">
    <div class="modal-overlay" @click="toggleModal"></div>
    <SVGClose class="modal-close" @click="toggleModal" />
    <div class="modal-content">
      <div class="container">
        <NewQuestion v-if="modalNewQuestion" />
        <NewProject v-if="modalNewProject" />
      </div>
    </div>
  </div>
</template>