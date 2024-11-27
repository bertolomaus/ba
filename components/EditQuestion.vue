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
const { question, fetchQuestionData } = useQuestionData()
const { userData, fetchUserData, updateUserData } = useUserData()
const { toggleModal } = useModal()
const { editMode } = useEdit()
const possibleHelpers = ref<UserDataShort[]>([])

const getHelpers = async () => {
  try {
    // send credentials to api/data
    const matchesRequest = await $fetch('/api/getUserIdsBySkills', {
      method: 'POST',
      body: {
        skills: question.value.requiredSkills
      }
    })
    possibleHelpers.value = computed(() => matchesRequest.matches.sort((a, b) => b.skills.length - a.skills.length)).value
  }
  catch (error) {
    console.error(error)
  }
}

const addRequiredSkill = (eventPayload: { payload: string }) => {
  question.value.requiredSkills.push(eventPayload.payload)
  getHelpers()
}

const removeSkill = (index: number) => {
  question.value.requiredSkills.splice(index, 1)
  getHelpers()
}

const onSubmit = async () => {
  try {
    // send project to api endpoint -- depending on whether a new question is posted or an existing question is edited
    if (props.updateOnSave) {
      await $fetch('/api/updateQuestion', {
        method: 'POST',
        body: {
          id: props.id,
          data: question.value
        }
      })

      // update userData > update project in data
      await fetchUserData(userId.value)
      const projectIndex = userData.value.questions.findIndex(q => q.id === question.value.id)
      if (projectIndex !== -1) {
        userData.value.questions[projectIndex] = { ...question.value }
      }
      await updateUserData(userId.value, userData.value)
    } else {
      question.value.owner = userId.value
      const response = await $fetch('/api/postQuestion', {
        method: 'POST',
        body: {
          id: props.id,
          data: question.value
        }
      })
      question.value.id = response.id

      // update userData > add new project to data
      await fetchUserData(userId.value)
      userData.value.questions.push(question.value)
      await updateUserData(userId.value, userData.value)

      // clear & close modal window
      clearQuestion()
    }

    // add project's requiredSkills to skills table
    setSkills(question.value.requiredSkills)

    // turn off edit mode
    editMode.value = false
  } catch (error) {
    console.error(error)
  }
}

const clearQuestion = () => {
  question.value = {
    id: 0,
    owner: 0,
    title: "",
    requiredSkills: [],
    description: "",
    attemptedSolutions: "",
    isVisible: false,
    isSolved: false,
  }
  toggleModal()
}

onMounted(async () => {
  getSkills()
  if (props.id) {
    const request = await fetchQuestionData(props.id)
    if (request) {
      question.value = request.question
    }
  }
})
</script>

<template>
  <div class="form-question">
    <form @submit.prevent="onSubmit">
      <div class="field field-title">
        <input v-model="question.title" name="title" placeholder="" />
        <label for="title">Titel</label>
        <p class="hint">Ein sprechender Titel, der deine Frage beschreibt.</p>
      </div>

      <div class="field field-description">
        <textarea v-model="question.description" name="description" placeholder="" rows="4"></textarea>
        <label for="description">Beschreib dein Problem</label>
        <div class="hint">
          <p>
            Mach es deinen Kommilitonen möglichst einfach, nachzuvollziehen, was du tun möchtest und wobei du Unterstützung benötigst. Beschreib den Kontext, in dem du auf das Problem gestoßen bist:
          </p>
          <ul class="mt-2 list-disc pl-6">
            <li>Woran arbeitest du?</li>
            <li>Benötigst du Hilfe oder hättest du gerne Feedback?</li>
            <li>Was soll die Funktion bewirken, bei dessen Umsetzung du ein Problem hast?</li>
            <li>Welche Programme und Programmiersprachen verwendest du?</li>
          </ul>
        </div>
      </div>

      <div class="field field-attemptedSolutions">
        <textarea v-model="question.attemptedSolutions" name="attemptedSolutions" placeholder="" rows="4"></textarea>
        <label for="attemptedSolutions">Welche Lösungsansätze hast du schon versucht?</label>
        <p class="hint">Welche Ideen hast du schon versucht, welche Ansätze hast du zur Lösung? Oder brauchst du Hilfe dabei, den Anfang überhaupt zu finden?</p>
      </div>

      <div class="field field-tags">
        <ul class="tags" v-if="question.requiredSkills.length > 0">
          <li v-for="(skill, index) in question.requiredSkills" :key="index" @click="removeSkill(index)">{{ skill }}
            <Trash />
          </li>
        </ul>
        <Autocomplete :label="'Erforderliche Fertigkeiten'" :suggestions="allSkills.sort()"
          @submit-input="addRequiredSkill" />
        <p class="hint">Diese Eingaben erscheinen als Tags in der Liste der offenen Fragen. Basierend auf diesen Tags wird dein Problem Leuten vorgeschlagen, die über die erforderlichen Fertigkeiten verfügen, dir bei deiner Frage zu helfen.</p>
      </div>

      <div class="field checkbox field-isVisible">
        <label>
          <input v-model="question.isVisible" type="checkbox" name="isVisible" id="isVisible">
          Frage soll für alle sichtbar sein
        </label>
      </div>

      <div class="field checkbox field-isSolved">
        <label>
          <input v-model="question.isSolved" type="checkbox" name="isSolved" id="isSolved">
          Problem ist gelöst
        </label>
      </div>

      <div class="field field-submit">
        <button class="btn btn-submit" type="submit">
          <span v-if="!props.updateOnSave">Frage posten</span>
          <span v-else>Änderungen speichern</span>
        </button>
      </div>
    </form>
    <div class="helpers grid grid-cols-4 gap-4">
      <div
        v-for="(helper, index) in possibleHelpers.filter(helper => helper.skills.length >= question.requiredSkills.length / 2)"
        :key="index">
        <p>id: {{ helper.id }}</p>
        <p>name: {{ helper.name }}</p>
        <p>common: {{ helper.skills }}</p>
        <img src="../assets/img/profile-mr-light.png" :alt="helper.name">
        <NuxtLink :to="{ path: 'profil', query: { wizard: helper.id } }">Mehr erfahren</NuxtLink>
      </div>
    </div>
  </div>
</template>