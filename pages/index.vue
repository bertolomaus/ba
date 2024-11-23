<script lang="ts" setup>
import UserAuthentication from '../components/UserAuthentication.vue'

const { isLoggedIn } = useAuth()
const { modalShowNewQuestion, modalShowNewProject, showModal } = useModal()
const { showSidebar } = useToggleContent()

onMounted(() => {
  showSidebar.value = false
  showModal.value = false
})
</script>

<template>
  <div class="dashboard">
    <div class="container">
      <div class="el-headline">
        <h1>Willkommen im Freiraum</h1>
      </div>
      <div class="el-text columns-2 gap-4">
        <p>
          Im Projekt „Freiraum für die Kompetenzentwicklung“ möchte das Institut für Multimediale und Interaktive
          Systeme den Studierenden der Medieninformatik die Möglichkeit geben, individuelle Stärken und Defizite
          bezüglich relevanter Fertigkeiten (zum Beispiel Programmieren, Design, Usability Tests) gemeinsam mit
          Dozierenden und anderen Studierenden zu identifizieren. Dabei sollen Wege zum Beheben der individuellen
          Defizite als auch zum Ausbau bzw. Weitergeben von individuellen Stärken identifiziert und gefördert werden.
        </p>
      </div>
      <div class="quote my-8 mx-auto">
        <NuxtImg :src="'quote.png'" alt="Zitat Gabe Newell" class="quote-icon" />
        <blockquote>The programmers of tomorrow are the wizards of the future. You're going to look like you have
          magic powers compared to everybody else.</blockquote>
        <p>- Gabe Newell</p>
      </div>
      <div class="el-text columns-2 gap-4">
        <p>
          Die Wizard WebApp soll euch dabei helfen, eure Stärken, Kenntnisse und Erfahrungen mit anderen zu teilen.
          Hier
          könnt ihr eure Projekte präsentieren, Fragen stellen und mit anderen Teilnehmern des Freiraums in Kontakt
          kommen. Hier werden ihr darüber informiert, wenn jemand eine Frage hat, bei der ihr womöglich helfen könnt
          oder eure Fertigkeiten bei einem Gruppenprojekt gesucht werden.
        </p>
      </div>
      <UserAuthentication v-if="!isLoggedIn" />
    </div>
    <div class="teaser grid grid-cols-2 gap-8 mx-8" v-if="isLoggedIn">
      <div @click="modalShowNewProject" class="teaser-item">
        <NuxtImg :src="'project.jpg'" alt="Neues Projekt beginnen" />
        <div class="teaser-content">Fang ein neues Projekt an</div>
      </div>
      <div @click="modalShowNewQuestion" class="teaser-item">
        <NuxtImg :src="'question.jpg'" alt="Frage stellen" />
        <div class="teaser-content">Stell eine neue Frage</div>
      </div>
    </div>
  </div>
</template>