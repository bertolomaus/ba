<script lang="ts" setup>
const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { fetchQuestionData } = useQuestionData()
const route = useRoute()
const question = ref<Question>()
const qId = route.query.id?.toString()

onMounted(async () => {
  showSidebar.value = false
  showModal.value = false
  const request = await fetchQuestionData(parseInt(qId ? qId : "0"))
  question.value = request?.question
})
</script>

<template>
  <div>
    <h1 class="">{{ question?.title }}</h1>
    <h2 class="h3">Worum geht es?</h2>
    <ul class="tags">
      <li v-for="(skill, index) of question?.requiredSkills" :key="index">{{ skill }}</li>
    </ul>
    <h3 class="h3">Beschreibung</h3>
    <p>{{ question?.description }}</p>
    <h3 class="h3">Lösungsansätze</h3>
    <p>{{ question?.attemptedSolutions }}</p>
    <pre>{{ question }}</pre>
  </div>
</template>