<script lang="ts" setup>
import EditProject from '~/components/EditProject.vue'
import Edit from '~/components/Edit.vue'

const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { fetchProjectData } = useProjectsData()
const { editMode } = useEdit()
const { userId } = useAuth()
const { addVisitedProject } = useUserData()
const route = useRoute()
const project = ref<Project>()
const pId = ref(parseInt(route.query.id?.toString() ? route.query.id?.toString() : "0"))

onMounted(async () => {
  showSidebar.value = false
  showModal.value = false
  const request = await fetchProjectData(pId.value)
  project.value = request?.project
  addVisitedProject(pId.value)
})

watch(async () =>
  route.query,
  async () => {
    pId.value = parseInt(route.query.id?.toString() ? route.query.id?.toString() : "0")
    const request = await fetchProjectData(pId.value)
    project.value = request?.project
    fetchProjectData(pId.value)
  }
)
</script>

<template>
  <div class="projekt">
    <div class="container">
      <Edit v-if="project?.owner === userId" />
      <EditProject v-if="editMode" :update-on-save="true" :id="pId" />

      <div v-else class="project-viewer">
        <h1 class="">{{ project?.title }}</h1>
        <h2 class="h3">Was ist das Ziel?</h2>
        <p>{{ project?.goal }}</p>
        <h3 class="h3">Beschreibung</h3>
        <p>{{ project?.description }}</p>
        <h3 class="h3">Welche Fertigkeiten & Technologien werden genutzt?</h3>
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
        <h3 class="h3" v-if="project?.resources && project?.resources.length > 0">Verwendete Ressourcen</h3>
        <ul>
          <li v-for="(resource, index) in project?.resources" :key="index">
            <NuxtLink :to="resource.src" target="_blank" :title="`${resource.name} für ${project?.title}`">{{
              resource.name }}</NuxtLink>
          </li>
        </ul>
        <div v-if="false">
          <h3 class="h3">Projektmitglieder</h3>
          <div class="field-members" v-if="project && project.members.length > 0">
            <ul>
              <li v-for="(member, index) in project?.members" :key="index" class="card card-user">
                <NuxtLink :to="{ path: 'profil', query: { wizard: member.id } }"
                  class="flex gap-4 flex-wrap items-center">
                  <NuxtImg :src="member.avatar" :alt="member.name" :height="64" />
                  <p class="h4">{{ member.name }}</p>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <h3 class="text-green" v-if="project?.isLookingForMembers">{{ project.members[0].name }} sucht noch Mitglieder
          für sein Projekt</h3>
        <h3 class="h3 text-red" v-if="project?.isDone">Dieses Projekt ist abgeschlossen.</h3>
      </div>
    </div>
  </div>
</template>