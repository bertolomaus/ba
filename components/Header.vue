<script lang="ts" setup>
import FormLogout from './FormLogout.vue'
import UserAuthentication from './UserAuthentication.vue'

const { isLoggedIn, userId } = useAuth()
const { showLogin, toggleAuthForm, showSidebar, toggleSidebar, showSidebarNav, showNavigation, showInteraction } = useToggleContent()
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
        <div class="toggle-nav" @click="showNavigation">
          <svg viewBox="0 0 8 7">
            <rect width="8" height="1" x="0" y="0" />
            <rect width="8" height="1" x="0" y="3" />
            <rect width="8" height="1" x="0" y="6" />
          </svg>
        </div>
        <div class="toggle-profil" @click="showInteraction">
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
          <div class="sidebar-close" @click="toggleSidebar">
            <svg viewBox="0 0 9 9">
              <rect width="1" height="9" x="4" y="0" />
              <rect width="9" height="1" x="0" y="4" />
            </svg>
          </div>
        </div>
        <div class="navigation" :class="[{'active': showSidebarNav}]">
          <nav>
            <ul>
              <li>
                <NuxtLink to="/">Dashboard</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/profil">Profil</NuxtLink>
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
            <UserAuthentication v-if="!isLoggedIn" />
            <FormLogout v-else />
            <p>
              Logged In: {{ isLoggedIn }}<br />
              UserID: {{ userId }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>