<script lang="ts" setup>
import EditQuestion from '~/components/EditQuestion.vue'
import Edit from '../components/Edit.vue'

const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { fetchQuestionData } = useQuestionData()
const { userId } = useAuth()
const route = useRoute()
const question = ref<Question>()
const qId = ref(parseInt(route.query.id?.toString() ? route.query.id?.toString() : "0"))
const { userData, addVisitedQuestion } = useUserData()
const { editMode, toggleEditMode } = useEdit()

onMounted(async () => {
  showSidebar.value = false
  showModal.value = false
  const request = await fetchQuestionData(qId.value)
  question.value = request?.question
  addVisitedQuestion(qId.value)
})

watch(async () =>
  route.query,
  async () => {
    qId.value = parseInt(route.query.id?.toString() ? route.query.id?.toString() : "0")
    const request = await fetchQuestionData(qId.value)
    question.value = request?.question
    addVisitedQuestion(qId.value)
  }
)
</script>

<template>
  <div class="frage">
    <div class="container">
      <Edit v-if="question?.owner === userId" />
      <EditQuestion v-if="editMode" :id="qId" :update-on-save="true" />

      <div v-else class="question-viewer">
        <h1 class="">{{ question?.title }}</h1>
        <h3 class="h3">Welche Fertigkeiten oder Kenntnisse sind zur Lösung erforderlich?</h3>
        <ul class="tags">
          <li v-for="(skill, index) of question?.requiredSkills" :key="index">{{ skill }}</li>
        </ul>
        <h3 class="h3">Beschreibung</h3>
        <p>{{ question?.description }}</p>
        <h3 class="h3">Welche Lösungsansätze wurden schon versucht?</h3>
        <p>{{ question?.attemptedSolutions }}</p>
        <h3 class="h3 text-red" v-if="question?.isSolved">Dieses Problem wurde gelöst.</h3>
      </div>
    </div>
  </div>
</template>