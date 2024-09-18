<script lang="ts" setup>
const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { fetchProjectData } = useProjectsData()
const route = useRoute()
const project = ref<Project>()
const qId = route.query.id?.toString()

onMounted(async () => {
  showSidebar.value = false
  showModal.value = false
  const request = await fetchProjectData(parseInt(qId ? qId : "0"))
  project.value = request?.project
})
</script>

<template>
  <div>
    <h1 class="">{{ project?.title }}</h1>
    <h2 class="h3">Worum geht es?</h2>
    <ul class="tags">
      <li v-for="(skill, index) of project?.requiredSkills" :key="index">{{ skill }}</li>
    </ul>
    <h3 class="h3">Beschreibung</h3>
    <p>{{ project?.description }}</p>
    <h3 class="h3">Was ist das Ziel?</h3>
    <p>{{ project?.goal }}</p>
    <pre>{{ project }}</pre>
  </div>
</template>