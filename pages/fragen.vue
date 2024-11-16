<script lang="ts" setup>
const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { questionsList, updateQuestionsList } = useQuestionData()
const { userId } = useAuth()

const loadQuestions = async () => {
  updateQuestionsList()
}

onMounted(async () => {
  showSidebar.value = false
  showModal.value = false
  await loadQuestions()
})
</script>

<template>
  <div class="fragen">
    <div class="container">
      <h1 class="">Fragen</h1>
      <div class="list-questions cards">
        <NuxtLink class="card"
          v-for="(q, index) of questionsList.filter(q => q.isVisible || !q.isVisible && q.owner == userId)" :key="index"
          :to="{ path: 'frage', query: { id: q.id } }">
          <h3>{{ q.title }}</h3>
          <ul class="lq-tags tags">
            <li class="lq-tags-item" v-for="(skill) of q.requiredSkills">
              {{ skill }}
            </li>
          </ul>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>