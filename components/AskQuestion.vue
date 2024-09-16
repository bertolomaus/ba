<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import Autocomplete from '../components/Autocomplete.vue'
import Trash from '../components/Trash.vue'

export interface MatchingHelper{
  id: number
  commonSkills: string[]
  name: string
  avatar: string
}

const { getSkills, allSkills, setSkills } = useSkills()
const { userId } = useAuth()
const requiredSkills = ref<string[]>([])
const possibleHelpers = ref<MatchingHelper[]>([])

const registerSchema = toTypedSchema(
  yup.object({
    title: yup
      .string()
      .required('Gib einen aussagekräftigen Titel an.'),
    description: yup
      .string()
      .required('Beschreib dein Problem.'),
    solutions: yup
      .string()
      .required('Bechreib deine Ansätze, die nicht funktioniert haben.')
  }),
)

const { values, errors, defineField, meta } = useForm({
  validationSchema: registerSchema,
});

const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')
const [solutions, solutionsAttrs] = defineField('solutions')

const getHelpers = async () => {
  try {
    // send credentials to api/data
    const matchesRequest = await $fetch('/api/data/getUserIdsBySkills', {
      method: 'POST',
      body: {
        skills: requiredSkills.value
      }
    })
    possibleHelpers.value = computed(() => matchesRequest.matches.sort((a, b) => b.commonSkills.length - a.commonSkills.length)).value
  }
  catch (error) {
    console.error(error)
  }
}

const addRequiredSkill = async (eventPayload: { payload: string }) => {
  requiredSkills.value.push(eventPayload.payload)
  await getHelpers()
}

const removeSkill = (index: number) => {
  requiredSkills.value.splice(index, 1)
  getHelpers()
}

const postQuestion = async () => {
  try {
    // send data to api endpoint -- as the database schema requires it
    const postQuestion = await $fetch('/api/postQuestion', {
      method: 'POST',
      body: {
        id: 0,
        owner: userId.value,
        title: values.title,
        requiredSkills: JSON.stringify(requiredSkills.value),
        description: values.description,
        attemptedSolutions: values.solutions,
        isVisible: 0,
        isSolved: 0,
      }
    })
    setSkills(requiredSkills.value)
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getSkills()
})
</script>

<template>
  <div class="ask-question">
    <h2 class="h2">What knowledge dost thou seek?</h2>
    <div class="form-question">
      <form @submit.prevent="postQuestion">
        <div class="field field-title" :class="[{'has-text': title}, {'has-error': errors.title}, {'is-acceptable': title && !errors.title}]">
          <input v-model="title" v-bind="titleAttrs" name="title" />
          <label for="title">Titel</label>
          <div class="errors">
            {{ errors.title }}
            <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.title">
              this is a dummy text to keep the stupid divs size.
            </div>
          </div>
        </div>
        <div class="field field-tags">
          <ul class="tags" v-if="requiredSkills.length > 0">
            <li v-for="(skill, index) in requiredSkills" :key="index" @click="removeSkill(index)">{{ skill }}<Trash /></li>
          </ul>
          <Autocomplete :label="'Erforderliche Fertigkeiten'" :suggestions="allSkills.sort()" @submit-input="addRequiredSkill" />
        </div>
        <div class="field field-description" :class="[{'has-text': description}, {'has-error': errors.description}, {'is-acceptable': description && !errors.description}]">
          <textarea v-model="description" v-bind="descriptionAttrs"  name="description" ></textarea>
          <label for="description">Beschreibung</label>
          <div class="errors">
            {{ errors.description }}
            <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.description">
              this is a dummy text to keep the stupid divs size.
            </div>
          </div>
        </div>
        <div class="field field-solutions" :class="[{'has-text': solutions}, {'has-error': errors.solutions}, {'is-acceptable': solutions && !errors.solutions}]">
          <textarea v-model="solutions" v-bind="solutionsAttrs"  name="solutions" ></textarea>
          <label for="description">Welche Lösungsansätze hast du schon versucht?</label>
          <div class="errors">
            {{ errors.solutions }}
            <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.solutions">
              this is a dummy text to keep the stupid divs size.
            </div>
          </div>
        </div>
        <div class="field field-submit">
          <button class="btn btn-submit" type="submit" :disabled="!meta.valid">Frage posten</button>
        </div>
      </form>
      <div class="helpers grid grid-cols-4 gap-4">
        <div v-for="(helper, index) in possibleHelpers.filter(helper => helper.commonSkills.length >= requiredSkills.length / 2)" :key="index">
          <p>id: {{ helper.id }}</p>
          <p>name: {{ helper.name }}</p>
          <p>common: {{ helper.commonSkills }}</p>
          <img src="../assets/img/profile-mr-light.png" :alt="helper.name">
          <NuxtLink :to="{path: 'profil', query: {wizard: helper.id}}">Mehr erfahren</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>