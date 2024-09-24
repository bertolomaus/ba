<script lang="ts" setup>
import EditQuestion from '~/components/EditQuestion.vue'

const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { fetchQuestionData } = useQuestionData()
const route = useRoute()
const question = ref<Question>()
const qId = parseInt(route.query.id?.toString() ? route.query.id?.toString() : "0")
const { userData } = useUserData()

onMounted(async () => {
  showSidebar.value = false
  showModal.value = false
  const request = await fetchQuestionData(qId)
  question.value = request?.question
})
</script>

<template>
  <div class="frage">
    <div class="container">
      <EditQuestion :id="qId" :update-on-save="true" />
      <pre class="mt-16">{{ userData.questions }}</pre>
    </div>
  </div>
</template>