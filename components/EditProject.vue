<script lang="ts" setup>
import Autocomplete from '../components/Autocomplete.vue'
import Trash from '../components/Trash.vue'
import type { Project } from '~/composables/useProjectsData'

interface Props {
  id?: number,
  updateOnSave: boolean
}

const props = defineProps<Props>()
const { getSkills, allSkills, setSkills } = useSkills()
const { userId } = useAuth()
const { fetchMembers, fetchProjectData, project } = useProjectsData()
const { userData, fetchUserData, updateUserData } = useUserData()
const possibleHelpers = ref<UserDataShort[]>([])
const resourceName = ref<string>('')
const resourceSrc = ref<string>('')
const showResourceDetails = ref<boolean>(false)

const getHelpers = async () => {
  try {
    // send credentials to api/data
    const matchesRequest = await $fetch('/api/data/getUserIdsBySkills', {
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
  project.value.resources.push({name: resourceName.value, src: resourceSrc.value})
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
    if(props.updateOnSave){
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
      await $fetch('/api/createProject', {
        method: 'POST',
        body: {
          id: props.id,
          data: project.value
        }
      })

      // update userData > add new project to data
      await fetchUserData(userId.value)
      userData.value.projects.push(project.value)
      await updateUserData(userId.value, userData.value)
    }

    // add project's requiredSkills to skills table
    setSkills(project.value.requiredSkills)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  getSkills()
  if(props.id){
    const request = await fetchProjectData(props.id)
    if(request){
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
      </div>

      <div class="field field-goal">
        <textarea v-model="project.goal" name="goal" placeholder=""></textarea>
        <label for="goal">Was ist ein konkretes Ziel?</label>
      </div>

      <div class="field field-description">
        <textarea v-model="project.description" name="description" placeholder=""></textarea>
        <label for="description">Beschreib dein Projekt</label>
      </div>

      <div class="field field-tags">
        <ul class="tags" v-if="project.requiredSkills.length > 0">
          <li v-for="(skill, index) in project.requiredSkills" :key="index" @click="removeSkill(index)">{{ skill }}<Trash /></li>
        </ul>
        <Autocomplete :label="'Erforderliche Fertigkeiten'" :suggestions="allSkills.sort()" @submit-input="addRequiredSkill" />
      </div>

      <div class="field field-winCondition">
        <textarea v-model="project.winCondition" name="winCondition" placeholder=""></textarea>
        <label for="winCondition">Wann ist dein Ziel erreicht?</label>
      </div>

      <div class="field field-whyAchieveable">
        <textarea v-model="project.whyAchieveable" name="whyAchieveable" placeholder=""></textarea>
        <label for="whyAchieveable">Dein Ziel ist erreichbar, weil</label>
      </div>

      <div class="field field-whyRelevant">
        <textarea v-model="project.whyRelevant" name="whyRelevant" placeholder=""></textarea>
        <label for="whyRelevant">Dein Ziel ist relevant, weil</label>
      </div>

      <div class="field field-deadline">
        <input v-model="project.deadline" name="deadline" placeholder="" />
        <label for="deadline">Realistische Deadline</label>
      </div>

      <div class="field-resources">
        <div class="resources-list">
          <ul>
            <li v-for="(resource, index) in project.resources" :key="index" class="flex gap-2 items-start">
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
          <AddCircle class="w-5" :is-open="showResourceDetails"/>
          <p>Ressource hinzufügen</p>
        </div>
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

      <div class="field-members" v-if="project.members.length > 0">
        <ul>
          <li v-for="(member, index) in project.members" :key="index">
            <p>{{ member.name }}</p>
            <p>{{ member.id }}</p>
            <p>{{ member.avatar }}</p>
            <pre>{{ member }}</pre>
          </li>
        </ul>
      </div>

      <div class="field field-isLookingForMembers">
        <input v-model="project.isLookingForMembers" type="checkbox" name="isLookingForMembers" >
        <label for="isLookingForMembers">Suchst du nach Partnern für dein Projekt?</label>
      </div>

      <div class="field field-isVisible">
        <input v-model="project.isVisible" type="checkbox" name="isVisible" >
        <label for="isVisible">Projekt soll für alle sichtbar sein</label>
      </div>

      <div class="field field-isDone">
        <input v-model="project.isDone" type="checkbox" name="isDone" >
        <label for="isDone">Projekt ist abgeschlossen</label>
      </div>

      <div class="field field-submit">
        <button class="btn btn-submit" type="submit">
          <span v-if="!props.updateOnSave">Projekt erstellen</span>
          <span v-else>Änderungen speichern</span>
        </button>
      </div>
    </form>
    <div class="helpers grid grid-cols-4 gap-4">
      <div v-for="(helper, index) in possibleHelpers.filter(helper => helper.skills.length >= project.requiredSkills.length / 2)" :key="index">
        <p>id: {{ helper.id }}</p>
        <p>name: {{ helper.name }}</p>
        <p>common: {{ helper.skills }}</p>
        <img src="../assets/img/profile-mr-light.png" :alt="helper.name">
        <NuxtLink :to="{path: 'profil', query: {wizard: helper.id}}">Mehr erfahren</NuxtLink>
      </div>
    </div>
  </div>
</template>