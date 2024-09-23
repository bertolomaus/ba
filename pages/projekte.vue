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
      <pre v-if="projectsList.filter(p => p.isVisible || !p.isVisible && p.owner == userId).length == 0">Logg dich ein, alle Projekte sind isVisible = false</pre>
      <ul class="questions-list gap-4 grid grid-cols-1">
        <li class="ql-item card" v-for="(p, index) of projectsList.filter(p => p.isVisible || !p.isVisible && p.owner == userId)" :key="index">
          <NuxtLink :to="{path: 'projekt', query: {id: p.id}}">
            <h3>{{ p.title }}</h3>
            <ul class="pl-tags tags">
              <li class="pl-tags-item" v-for="(skill) of p.requiredSkills">
                {{ skill }}
              </li>
            </ul>
          </NuxtLink>
          </li>
      </ul>
    </div>
  </div>
</template>