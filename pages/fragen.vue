<script lang="ts" setup>
const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { questionsList, updateQuestionsList } = useQuestionData()

const loadQuestions = async () => {
  const list = await updateQuestionsList()
}

onMounted(() => {
  showSidebar.value = false
  showModal.value = false
  loadQuestions()
})
</script>

<template>
  <div>
    <h1 class="">Fragen</h1>
  </div>
</template>