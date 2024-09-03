<script lang="ts" setup>
import FormLogout from './FormLogout.vue'
import UserAuthentication from './UserAuthentication.vue'
import SVGClose from './SVGClose.vue'

const { isLoggedIn, userId } = useAuth()
const { showLogin, toggleAuthForm, showSidebar, toggleSidebar, showSidebarNav, showNavigation, showInteraction } = useToggleContent()
const { modalShowAskQuestion } = useModal()
const profileLink = computed(() => `/profile?id=${userId}`)
</script>

<template>
  <div class="header">
    <div class="headerbar">
      <div class="logo">
        <NuxtLink to="/">
          <img src="../assets/img/logo-dark-red.png" alt="Wizard Logo" height="64" width="207">
          <!-- <img src="../assets/img/logo-dark-red.png" alt="Wizard Logo" height="64" width="207" class="dark:opacity-0">
          <img src="../assets/img/logo-light-red.png" alt="Wizard Logo" height="64" width="207" class="dark:opacity-1"> -->
        </NuxtLink>
      </div>
      <div class="sidebar-togglers">
        <div class="open-navigation" @click="showNavigation">
          <svg viewBox="0 0 8 7">
            <rect width="8" height="1" x="0" y="0" />
            <rect width="8" height="1" x="0" y="3" />
            <rect width="8" height="1" x="0" y="6" />
          </svg>
        </div>
        <div class="open-interaction" @click="showInteraction">
          <img src="../assets/img/profile-male-red.png" alt="Wizard Logo" height="64" width="64">
        </div>
      </div>
    </div>
    <div class="sidebar" :class="[{'open': showSidebar}]">
      <div class="sidebar-overlay" @click="toggleSidebar"></div>
      <div class="sidebar-content">
        <div class="sidebar-controls">
          <div class="sidebar-controls-highlight" :class="[{'highlight-nav': showSidebarNav}, {'highlight-interaction': !showSidebarNav}]"></div>
          <div class="sidebar-open-navigation" @click="showNavigation">
            <svg viewBox="0 0 8 7">
              <rect width="8" height="1" x="0" y="0" />
              <rect width="8" height="1" x="0" y="3" />
              <rect width="8" height="1" x="0" y="6" />
            </svg>
          </div>
          <div class="sidebar-open-interaction" @click="showInteraction">
            <img src="../assets/img/profile-male-red.png" alt="Wizard Logo" height="48" width="48">
          </div>
          <SVGClose class="sidebar-close" @click="toggleSidebar" />
        </div>
        <div class="navigation" :class="[{'active': showSidebarNav}]">
          <p class="h4">Navigation</p>
          <nav>
            <ul>
              <li>
                <NuxtLink to="/">Dashboard</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{path: 'profil', query: {wizard: userId}}">Profil</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/fragen">Fragen</NuxtLink>
                <ul>
                  <li><NuxtLink to="/fragen">Frage 1</NuxtLink></li>
                  <li><NuxtLink to="/fragen">Frage 2</NuxtLink></li>
                  <li><NuxtLink to="/fragen">Frage 3</NuxtLink></li>
                </ul>
              </li>
              <li>
                <NuxtLink to="/projekte">Projekte</NuxtLink>
                <ul>
                  <NuxtLink to="/projekte">Projekt 1</NuxtLink>
                  <NuxtLink to="/projekte">Projekt 2</NuxtLink>
                  <NuxtLink to="/projekte">Projekt 3</NuxtLink>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div class="interaction" :class="[{'active': !showSidebarNav}]">
          <div class="sidebar-authentication">
            <p class="h4">Interaktion</p>
            <UserAuthentication v-if="!isLoggedIn" />
            <div v-else>
              <p class="btn" @click="modalShowAskQuestion">Frage stellen</p>
              <FormLogout />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>