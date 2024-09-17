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
  <div>
    <h1 class="">Projekte</h1>
    <pre v-if="questionsList.filter(q => q.isVisible || !q.isVisible && q.owner == userId).length == 0">Logg dich ein, alle Fragen sind isVisible = false</pre>
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