<script lang="ts" setup>
const { showSidebar } = useToggleContent()
const { showModal } = useModal()

const loadQuestions = async () => {
  
}

onMounted(() => {
  showSidebar.value = false
  showModal.value = false
})
</script>

<template>
  <div>
    <h1 class="">Fragen</h1>
  </div>
</template>