<script lang="ts" setup>
import { questions } from '~/schema';

const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { questionsList, updateQuestionsList } = useQuestionData()
const { userId } = useAuth()

const loadQuestions = async () => {
  updateQuestionsList()
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
    <ul class="questions-list gap-4 grid grid-cols-1">
      <li class="ql-item card" v-for="(q, index) of questionsList.filter(q => q.isVisible || !q.isVisible && q.owner == userId)" :key="index">
        <NuxtLink :to="{path: 'frage', query: {id: q.id}}">
          <h3>{{ q.title }}</h3>
          <ul class="ql-tags tags">
            <li class="ql-tags-item" v-for="(skill) of q.requiredSkills">
              {{ skill }}
            </li>
          </ul>
        </NuxtLink>
        </li>
    </ul>
  </div>
</template>