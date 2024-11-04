<script lang="ts" setup>
import EditQuestion from '~/components/EditQuestion.vue'
import Edit from '../components/Edit.vue'

const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { fetchQuestionData } = useQuestionData()
const route = useRoute()
const question = ref<Question>()
const qId = parseInt(route.query.id?.toString() ? route.query.id?.toString() : "0")
const { userData } = useUserData()
const { editMode, toggleEditMode } = useEdit()

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
      <Edit />
      <EditQuestion v-if="editMode" :id="qId" :update-on-save="true" />
    </div>
  </div>
</template>