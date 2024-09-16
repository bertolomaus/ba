<script lang="ts" setup>
const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { fetchQuestionData } = useQuestionData()
const route = useRoute()
const question = ref<Question>()
const qId = route.query.frage?.toString()

onMounted(async () => {
  showSidebar.value = false
  showModal.value = false
  const request = await fetchQuestionData(parseInt(qId ? qId : "0"))
  question.value = request?.question
})
</script>

<template>
  <div>
    <h1 class="">Frage Sub</h1>
    <pre>{{ question }}</pre>
  </div>
</template>