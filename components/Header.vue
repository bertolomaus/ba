<script lang="ts" setup>
import FormLogout from './FormLogout.vue'
import UserAuthentication from './UserAuthentication.vue'
import SVGClose from './SVGClose.vue'
import IconLogin from './IconLogin.vue'
import type { Project } from '~/composables/useProjectsData';

const { isLoggedIn, userId, login } = useAuth()
const { userData, fetchUserData, findProjectsUserCanHelpWith, projectsUserCanHelpWith, findQuetionsUserCanHelpWith, questionsUserCanHelpWith } = useUserData()
const { showSidebar, toggleSidebar, showSidebarNav, showNavigation, showInteraction } = useToggleContent()
const { modalShowNewQuestion, modalShowNewProject } = useModal()
const { editModeOn } = useEdit()
const { isScrolled } = useWindow()
const profileLink = ref(computed(() => ({
  path: 'profil',
  query: { wizard: userId.value }
})))
const userCanHelpWithSomething = ref(false)

// if (localStorage.getItem('isLoggedIn')) {
//   login(parseInt(localStorage.getItem('isLoggedIn') as string))
// }

const questionIsNew = (qId: number) => {
  return !userData.value.visitedQuestions.includes(qId)
}

const projectIsNew = (pId: number) => {
  return !userData.value.visitedProjects.includes(pId)
}

const generateNavigationLinks = async () => {
  console.log(userData.value);
  try {
    await fetchUserData(userId.value)
    await findProjectsUserCanHelpWith()
    await findQuetionsUserCanHelpWith()
    checkIfUserCanHelpWithSomething()
  } catch (error) {
    console.error(error)
  }
}

const checkIfUserCanHelpWithSomething = () => {
  userCanHelpWithSomething.value = false;

  projectsUserCanHelpWith.value.forEach(p => {
    if (!userData.value.visitedProjects.includes(p.id)) {
      userCanHelpWithSomething.value = true;
    }
  })
  questionsUserCanHelpWith.value.forEach(q => {
    if (!userData.value.visitedQuestions.includes(q.id)) {
      userCanHelpWithSomething.value = true;
    }
  })
}

// onMounted(async () => {
//   if (isLoggedIn.value) {
//     await fetchUserData(userId.value)
//     await findProjectsUserCanHelpWith()
//     await findQuetionsUserCanHelpWith()
//     checkIfUserCanHelpWithSomething()
//   }
// })

watch(isLoggedIn, async (newVal, oldVal) => {
  try {
    await fetchUserData(userId.value)
    await findProjectsUserCanHelpWith()
    await findQuetionsUserCanHelpWith()
    checkIfUserCanHelpWithSomething()
  } catch (error) {
    console.error(error)
  }
});

</script>

<template>
  <div class="header">
    <div class="headerbar" :class="{ 'scrolled': isScrolled }">
      <div class="logo">
        <NuxtLink to="/">
          <NuxtImg src="logo-light-red-new.png" alt="Wizard Logo" height="64" />
        </NuxtLink>
      </div>
      <div class="sidebar-togglers">
        <div v-if="isLoggedIn" class="open-navigation" @click="showNavigation(); generateNavigationLinks()">
          <svg viewBox="0 0 8 7">
            <rect width="8" height="1" x="0" y="0" />
            <rect width="8" height="1" x="0" y="3" />
            <rect width="8" height="1" x="0" y="6" />
          </svg>
        </div>
        <div class="open-interaction" @click="showInteraction(); generateNavigationLinks()">
          <NuxtImg v-if="isLoggedIn" :src="userData.avatar" alt="Wizard Logo" width="64" />
          <p class="btn" v-else>Login</p>
          <div class="notification" v-if="isLoggedIn && userCanHelpWithSomething"></div>
        </div>
      </div>
    </div>
    <div class="sidebar" :class="[{ 'open': showSidebar }]">
      <div class="sidebar-overlay" @click="toggleSidebar"></div>
      <div class="sidebar-content">
        <div class="sidebar-controls">
          <div v-if="isLoggedIn" class="sidebar-controls-highlight"
            :class="[{ 'highlight-nav': showSidebarNav }, { 'highlight-interaction': !showSidebarNav }]"></div>
          <div v-if="isLoggedIn" class="sidebar-open-navigation" @click="showNavigation(); generateNavigationLinks()">
            <svg viewBox="0 0 8 7">
              <rect width="8" height="1" x="0" y="0" />
              <rect width="8" height="1" x="0" y="3" />
              <rect width="8" height="1" x="0" y="6" />
            </svg>
          </div>
          <div class="sidebar-open-interaction" @click="showInteraction(); generateNavigationLinks()">
            <NuxtImg v-if="isLoggedIn" :src="userData.avatar" alt="Wizard Logo" width="48" class="px-2 w-16" />
            <IconLogin v-else />
            <div class="notification" v-if="isLoggedIn && userCanHelpWithSomething">
            </div>
          </div>
          <SVGClose class="sidebar-close" @click="toggleSidebar" />
        </div>
        <div class="navigation" :class="[{ 'active': showSidebarNav }]">
          <p class="h4">Navigation</p>
          <nav>
            <ul>
              <li>
                <NuxtLink to="/">Dashboard</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="profileLink">Profil</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/fragen">Fragen</NuxtLink>
                <ul>
                  <li v-for="(question, index) in userData.questions" :key="index">
                    <NuxtLink :to="{ path: 'frage', query: { id: question.id } }">{{ question.title }}</NuxtLink>
                  </li>
                </ul>
              </li>
              <li>
                <NuxtLink to="/projekte">Projekte</NuxtLink>
                <ul>
                  <li v-for="(project, index) in userData.projects" :key="index">
                    <NuxtLink :to="{ path: 'projekt', query: { id: project.id } }">{{ project.title }}</NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div class="interaction" :class="[{ 'active': !showSidebarNav }]">
          <div class="sidebar-authentication">
            <p class="h4">Interaktion</p>
            <UserAuthentication v-if="!isLoggedIn" />
            <div v-else>
              <NuxtLink class="btn-link" :to="profileLink" @click="editModeOn">Profil bearbeiten</NuxtLink>
              <a href="#" class="btn-link" @click="modalShowNewQuestion">Frage stellen</a>
              <a href="#" class="btn-link" @click="modalShowNewProject">Neues Projekt</a>
              <p class="h6">Fragen, bei denen du helfen könntest</p>
              <div class="with-tags">
                <NuxtLink v-for="(frage, index) in questionsUserCanHelpWith" :key="index"
                  :to="{ path: 'frage', query: { id: frage.id } }">
                  <span class="relative block">
                    {{ frage.title }}
                    <span v-if="questionIsNew(frage.id)" class="icon-new">!</span>
                  </span>
                  <ul class="tags tags-xs">
                    <li v-for="(skill, index) in frage.skills" :key="index">{{ skill }}</li>
                  </ul>
                </NuxtLink>
              </div>
              <p class="h6">Projekte, die nach deinen Fertigkeiten suchen</p>
              <div class="with-tags">
                <NuxtLink v-for="(projekt, index) in projectsUserCanHelpWith" :key="index"
                  :to="{ path: 'projekt', query: { id: projekt.id } }">
                  <span class="relative block">
                    {{ projekt.title }}
                    <span v-if="projectIsNew(projekt.id)" class="icon-new">!</span>
                  </span>
                  <ul class="tags tags-xs">
                    <li v-for="(skill, index) in projekt.skills" :key="index">{{ skill }}</li>
                  </ul>
                </NuxtLink>
              </div>
              <FormLogout class="my-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>