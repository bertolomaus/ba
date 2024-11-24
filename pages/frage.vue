<script lang="ts" setup>
import EditQuestion from '~/components/EditQuestion.vue'
import Edit from '../components/Edit.vue'

const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { fetchQuestionData, fetchOwner } = useQuestionData()
const { userId } = useAuth()
const route = useRoute()
const question = ref<Question>()
const qId = ref(parseInt(route.query.id?.toString() ? route.query.id?.toString() : "0"))
const { userData, addVisitedQuestion } = useUserData()
const { editMode, toggleEditMode } = useEdit()
const ownerData = ref<OwnerData | undefined>()

onMounted(async () => {
  showSidebar.value = false
  showModal.value = false
  const request = await fetchQuestionData(qId.value)
  question.value = request?.question
  const requestOwner = await fetchOwner(question.value?.owner)
  ownerData.value = requestOwner
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
        <h3 class="h3">Fragesteller</h3>
        <div class="owner">
          <NuxtLink :to="{ path: 'profil', query: { wizard: question?.owner } }"
            class="flex gap-4 flex-wrap items-center">
            <NuxtImg :src="ownerData?.avatar" :alt="ownerData?.name" :height="64" />
            <p class="h4">{{ ownerData?.name }}</p>
          </NuxtLink>
        </div>
        <h3 class="h3">Welche Fertigkeiten oder Kenntnisse sind zur Lösung erforderlich?</h3>
        <ul class="tags">
          <li v-for="(skill, index) of question?.requiredSkills" :key="index">{{ skill }}</li>
        </ul>
        <h3 class="h3">Beschreibung</h3>
        <p>{{ question?.description }}</p>
        <h3 class="h3">Welche Lösungsansätze wurden schon versucht?</h3>
        <p>{{ question?.attemptedSolutions }}</p>
        <h3 class="h3">Du kannst {{ ownerData?.name }} helfen? So kannst du Kontakt aufnehmen:</h3>
        <ul class="flex gap-4 contact-owner">
          <li v-if="ownerData?.contact[0]">
            <a :href="`https://wa.me/${ownerData?.contact[0]}`" class="flex gap-2 items-center" target="_blank">
              <NuxtImg :src="'wa.png'" alt="Icon Whatsapp" height="24" />
              Whatsapp
            </a>
          </li>
          <li v-if="ownerData?.contact[1]">
            <p class="flex gap-2 items-center">
              <NuxtImg :src="'discord.png'" alt="Icon Discord" height="24" />
              Discord: {{ ownerData?.contact[1] }}
            </p>
          </li>
          <li v-if="ownerData?.contact[2]">
            <a :href="`signal://send?phone=${ownerData?.contact[2]}`" class="flex gap-2 items-center" target="_blank">
              <NuxtImg :src="'signal.png'" alt="Icon Signal" height="24" />
              Signal
            </a>
          </li>
          <li v-if="ownerData?.contact[3]">
            <a :href="`https://web.webex.com/meet/${ownerData?.contact[3]}`" class="flex gap-2 items-center"
              target="_blank">
              <NuxtImg :src="'webex.png'" alt="Icon Webex" height="24" />
              Webex
            </a>
          </li>
          <li v-if="ownerData?.contact[4]">
            <a :href="`mailto:${ownerData?.contact[4]}`" class="flex gap-2 items-center" target="_blank">
              <NuxtImg :src="'mail.png'" alt="Icon Email" height="24" />
              Email
            </a>
          </li>
        </ul>
        <h3 class="h3 text-red" v-if="question?.isSolved">Dieses Problem wurde gelöst.</h3>
      </div>
    </div>
  </div>
</template>