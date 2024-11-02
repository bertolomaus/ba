<script lang="ts" setup>
import EditProject from '~/components/EditProject.vue'
import Edit from '~/components/Edit.vue'

const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { fetchProjectData } = useProjectsData()
const { editMode } = useEdit()
const route = useRoute()
const project = ref<Project>()
const pId = route.query.id?.toString()

onMounted(async () => {
  showSidebar.value = false
  showModal.value = false
  const request = await fetchProjectData(parseInt(pId ? pId : "0"))
  project.value = request?.project
})
</script>

<template>
  <div class="projekt">
    <div class="container">
      <Edit />
      <EditProject v-if="editMode" :update-on-save="true" :id="parseInt(pId ? pId : '0')" />

      <div v-else class="project-viewer">
        <h1 class="">{{ project?.title }}</h1>
        <h3 class="h3">Was ist das Ziel?</h3>
        <p>{{ project?.goal }}</p>
        <h3 class="h3">Beschreibung</h3>
        <p>{{ project?.description }}</p>
        <h2 class="h3">Welche Fertigkeiten & Technologien werden genutzt?</h2>
        <ul class="tags">
          <li v-for="(skill, index) of project?.requiredSkills" :key="index">{{ skill }}</li>
        </ul>
        <h3 class="h3">Wann ist das Ziel erreicht?</h3>
        <p>{{ project?.winCondition }}</p>
        <h3 class="h3">Warum ist das Ziel erreichbar?</h3>
        <p>{{ project?.whyAchieveable }}</p>
        <h3 class="h3">Warum ist das Ziel relevant?</h3>
        <p>{{ project?.whyRelevant }}</p>
        <h3 class="h3">Realistische Deadline</h3>
        <p>{{ project?.deadline }}</p>
        <h3 class="h3">Verwendete Ressourcen</h3>
        <p>{{ project?.resources }}</p>
        <h3 class="h3">Projektmitglieder</h3>
        <p>{{ project?.members }}</p>
        <p>Werden noch Mitglieder gesucht? {{ project?.isLookingForMembers }}</p>
        <h3 class="h3">Soll das Projekt für alle sichtbar sein?</h3>
        <p>{{ project?.isVisible }}</p>
        <h3 class="h3">Projekt ist abgeschlossen</h3>
        <p>{{ project?.isDone }}</p>
      </div>
      <pre class="mt-16">{{ project }}</pre>
    </div>
  </div>
</template>