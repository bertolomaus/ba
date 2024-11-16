<script lang="ts" setup>
const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { projectsList, updateProjectsList } = useProjectsData()
const { userId } = useAuth()

const loadProjects = async () => {
  updateProjectsList()
}

onMounted(async () => {
  showSidebar.value = false
  showModal.value = false
  await loadProjects()
})
</script>

<template>
  <div class="projekte">
    <div class="container">
      <h1 class="">Projekte</h1>
      <pre
        v-if="projectsList.filter(p => p.isVisible || !p.isVisible && p.owner == userId).length == 0">Logg dich ein, alle Projekte sind isVisible = false</pre>
      <div class="cards list-projects">
        <NuxtLink class="card"
          v-for="(p, index) of projectsList.filter(p => p.isVisible || !p.isVisible && p.owner == userId)" :key="index"
          :to="{ path: 'projekt', query: { id: p.id } }">
          <h3>{{ p.title }}</h3>
          <ul class="lp-tags tags">
            <li class="lp-tags-item" v-for="(skill) of p.requiredSkills">
              {{ skill }}
            </li>
          </ul>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>