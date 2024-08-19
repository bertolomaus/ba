<script lang="ts" setup>
import FormLogout from './FormLogout.vue'
import UserAuthentication from './UserAuthentication.vue'
import { useAuth } from '~/composables/useAuth'
const { isLoggedIn, userId } = useAuth()
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
        <div class="toggle-nav">
          <svg viewBox="0 0 8 7">
            <rect width="8" height="1" y="0" />
            <rect width="8" height="1" y="3" />
            <rect width="8" height="1" y="6" />
          </svg>
        </div>
        <div class="toggle-profil">
          <span>☃</span>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <div class="navigation">
        <nav>
          <ul>
            <li>
              <NuxtLink to="/">Dashboard</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/profil">Profil</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/frgen">Fragen</NuxtLink>
              <ul>
                <li>Frage 1</li>
                <li>Frage 2</li>
                <li>Frage 3</li>
              </ul>
            </li>
            <li>
              <NuxtLink to="/projekte">Projekte</NuxtLink>
              <ul>
                <li>Projekt 1</li>
                <li>Projekt 2</li>
                <li>Projekt 3</li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div class="interaction">
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
</template>