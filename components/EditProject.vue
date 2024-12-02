<script lang="ts" setup>
import Autocomplete from '../components/Autocomplete.vue'
import Trash from '../components/Trash.vue'

interface Props {
  id?: number,
  updateOnSave: boolean
}

const props = defineProps<Props>()
const { getSkills, allSkills, setSkills } = useSkills()
const { userId } = useAuth()
const { fetchMembers, fetchProjectData, project } = useProjectsData()
const { userData, fetchUserData, updateUserData } = useUserData()
const { editMode } = useEdit()
const { toggleModal } = useModal()
const route = useRouter()
const possibleHelpers = ref<UserDataShort[]>([])
const resourceName = ref<string>('')
const resourceSrc = ref<string>('')
const showResourceDetails = ref<boolean>(false)

const getHelpers = async () => {
  try {
    // send credentials to api/data
    const matchesRequest = await $fetch('/api/getUserIdsBySkills', {
      method: 'POST',
      body: {
        skills: project.value.requiredSkills
      }
    })
    possibleHelpers.value = computed(() => matchesRequest.matches.sort((a, b) => b.skills.length - a.skills.length)).value
  }
  catch (error) {
    console.error(error)
  }
}

const addRequiredSkill = async (eventPayload: { payload: string }) => {
  project.value.requiredSkills.push(eventPayload.payload)
  await getHelpers()
}

const removeSkill = async (index: number) => {
  project.value.requiredSkills.splice(index, 1)
  await getHelpers()
}

const toggleNewResource = () => {
  showResourceDetails.value = !showResourceDetails.value
}

const addResource = () => {
  project.value.resources.push({ name: resourceName.value, src: resourceSrc.value })
  closeResource()
}

const removeResource = (index: number) => {
  project.value.resources.splice(index, 1)
}

const closeResource = () => {
  showResourceDetails.value = false
  resourceName.value = ""
  resourceSrc.value = ""
}

const onSubmit = async () => {
  try {
    // fetch members data
    project.value.members = await fetchMembers([userId.value])

    // send project to api endpoint -- depending on whether a new project is created or an existing project is edited
    if (props.updateOnSave) {
      await $fetch('/api/updateProject', {
        method: 'POST',
        body: {
          id: props.id,
          data: project.value
        }
      })

      // update userData > update project in data
      await fetchUserData(userId.value)
      const projectIndex = userData.value.projects.findIndex(p => p.id === project.value.id)

      if (projectIndex !== -1) {
        userData.value.projects[projectIndex] = { ...project.value }
      }
      await updateUserData(userId.value, userData.value)
    } else {
      project.value.owner = userId.value
      const response = await $fetch('/api/createProject', {
        method: 'POST',
        body: {
          id: props.id,
          data: project.value
        }
      })
      project.value.id = response.id

      // update userData > add new project to data
      await fetchUserData(userId.value)
      userData.value.projects.push(project.value)
      await updateUserData(userId.value, userData.value)

      // clear & close modal
      clearProject()
    }

    // add project's requiredSkills to skills table
    setSkills(project.value.requiredSkills)

    // turn off edit mode
    editMode.value = false
  } catch (error) {
    console.error(error)
  }
}

const clearProject = () => {
  project.value = {
    id: 0,
    owner: 0,
    title: "",
    requiredSkills: [],
    description: "",
    goal: "",
    winCondition: "",
    whyAchieveable: "",
    whyRelevant: "",
    deadline: "",
    members: [],
    resources: [],
    isLookingForMembers: false,
    isVisible: false,
    isDone: false
  }
  toggleModal()
}

onMounted(async () => {
  getSkills()
  if (props.id) {
    const request = await fetchProjectData(props.id)
    if (request) {
      project.value = request.project
    }
  }
})
</script>

<template>
  <div class="form-project">
    <form @submit.prevent="onSubmit">
      <div class="field field-title">
        <input v-model="project.title" name="title" placeholder="" />
        <label for="title">Titel</label>
        <p class="hint">Ein sprechender Titel, der dein Projekt beschreibt.</p>
      </div>

      <div class="field field-goal">
        <textarea v-model="project.goal" name="goal" placeholder="" rows="4"></textarea>
        <label for="goal">Was ist dein konkretes Ziel?</label>
        <p class="hint">Beschreibe präzise, welchen Zweck dein Projekt erfüllen soll.</p>
      </div>

      <div class="field field-description">
        <textarea v-model="project.description" name="description" placeholder="" rows="4"></textarea>
        <label for="description">Beschreib dein Projekt</label>
        <p class="hint">Beschreib deine Idee: Was möchtest du Umsetzen? Welche Sprachen, Software, Frameworks oder Tools
          willst du einsetzen? Was möchtest du dabei lernen?</p>
      </div>

      <div class="field field-tags">
        <ul class="tags" v-if="project.requiredSkills.length > 0">
          <li v-for="(skill, index) in project.requiredSkills" :key="index" @click="removeSkill(index)">{{ skill }}
            <Trash />
          </li>
        </ul>
        <Autocomplete :label="'Erforderliche Fertigkeiten'" :suggestions="allSkills.sort()"
          @submit-input="addRequiredSkill" />
        <p class="hint">Welche Fertigkeiten werden benötigt, um dein Projekt zu bearbeiten? Diese Eingaben erscheinen als Tags in der Liste der aller Projekte.</p>
      </div>

      <div class="field field-winCondition">
        <textarea v-model="project.winCondition" name="winCondition" placeholder="" rows="4"></textarea>
        <label for="winCondition">Wann ist dein Ziel erreicht?</label>
        <p class="hint">Definiere die Akzeptanzkriterien für dein Projekt.</p>
      </div>

      <div class="field field-whyAchieveable">
        <textarea v-model="project.whyAchieveable" name="whyAchieveable" placeholder="" rows="4"></textarea>
        <label for="whyAchieveable">Dein Ziel ist erreichbar, weil...</label>
        <p class="hint">Beschriebe, auf welchem Wege du dein Ziel erreichen willst.</p>
      </div>

      <div class="field field-whyRelevant">
        <textarea v-model="project.whyRelevant" name="whyRelevant" placeholder="" rows="4"></textarea>
        <label for="whyRelevant">Dein Ziel ist relevant, weil...</label>
        <p class="hint">Beschreibe, wieso du dieses Ziel erreichen willst.</p>
      </div>

      <div class="field field-deadline">
        <input v-model="project.deadline" name="deadline" placeholder="" />
        <label for="deadline">Realistische Deadline</label>
        <p class="hint">Setze dir selbst eine Deadline als Orientierungspunkt.</p>
      </div>

      <div class="field field-resources">
        <div class="resources-list">
          <ul>
            <li v-for="(resource, index) in project.resources" :key="index" class="flex gap-2 items-start mb-8">
              <div class="resource-input">
                <div class="field">
                  <input type="text" v-model="resource.name" name="resourceName" placeholder="" />
                  <label for="resourceName">Name</label>
                </div>
                <div class="field">
                  <input type="text" v-model="resource.src" name="resourceSrc" placeholder="" />
                  <label for="resourceSrc">Datenquelle</label>
                </div>
              </div>
              <Trash @click="removeResource(index)" class="w-6 fill-red mt-6" />
            </li>
          </ul>
        </div>
        <div class="add-resource flex gap-2 cursor-pointer w-max" @click="toggleNewResource">
          <AddCircle class="w-5" :is-open="showResourceDetails" />
          <p>Ressource hinzufügen</p>
        </div>
        <p class="hint ml-3">Nutze dies, um Links zu allen relevanten Ressourcen deines Projektes an einem Ort zu
          speichern - z.B. Git-Repositories, Discord-Server, Miroboards, Cloudspeicher, ...</p>
        <div class="resource-details ml-8" v-if="showResourceDetails">
          <div class="field">
            <input type="text" v-model="resourceName" name="resourceName" placeholder="">
            <label for="resourceName">Name</label>
          </div>
          <div class="field">
            <input type="text" v-model="resourceSrc" name="resourceSrc" placeholder="">
            <label for="resourceSrc">Quelle</label>
          </div>
          <div class="field flex gap-2">
            <p class="btn" @click="addResource">Hinzufügen</p>
            <p class="btn btn-muted mt-0" @click="closeResource">Abbrechen</p>
          </div>
        </div>
      </div>

      <div class="field field-members" v-if="project.members.length > 0">
        <ul>
          <li v-for="(member, index) in project.members" :key="index" class="card card-user">
            <NuxtLink :to="{ path: 'profil', query: { wizard: member.id } }" class="flex gap-4 flex-wrap items-center">
              <NuxtImg :src="member.avatar" :alt="member.name" :height="64" />
              <p class="h4">{{ member.name }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="field checkbox field-isLookingForMembers">

        <label>
          <input v-model="project.isLookingForMembers" type="checkbox" name="isLookingForMembers">
          Suchst du nach Partnern für dein Projekt?
        </label>
      </div>

      <div class="field checkbox field-isVisible">
        <label>
          <input v-model="project.isVisible" type="checkbox" name="isVisible">
          Projekt soll für alle sichtbar sein
        </label>
      </div>

      <div class="field checkbox field-isDone">
        <label>
          <input v-model="project.isDone" type="checkbox" name="isDone">
          Projekt ist abgeschlossen
        </label>
      </div>

      <div class="field field-submit">
        <button class="btn btn-submit" type="submit">
          <span v-if="!props.updateOnSave">Projekt erstellen</span>
          <span v-else>Änderungen speichern</span>
        </button>
      </div>
    </form>

  </div>
</template>