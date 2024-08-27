<script lang="ts" setup>
import Header from '~/components/Header.vue'
import Modal from '~/components/Modal.vue'

const { showModal } = useModal()
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
    <Modal v-if="showModal" />
  </div>
</template>
