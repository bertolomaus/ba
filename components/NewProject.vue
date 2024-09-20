<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import Autocomplete from '../components/Autocomplete.vue'
import Trash from '../components/Trash.vue'

export interface Resource{
  name: string,
  src: string
}

const { getSkills, allSkills, setSkills } = useSkills()
const { userId } = useAuth()
const { fetchMembers } = useProjectsData()
const requiredSkills = ref<string[]>([])
const possibleHelpers = ref<UserDataShort[]>([])
const resources = ref<Resource[]>([])
const isLookingForMembers = ref<boolean>()
const isVisible = ref<boolean>()

const registerSchema = toTypedSchema(
  yup.object({
    title: yup
      .string()
      .required('Gib einen aussagekräftigen Titel an.'),
    goal: yup
      .string()
      .required('Beschreib dein konkretes Ziel.'),
    description: yup
      .string()
      .required('Beschreib deine Idee.'),
    winCondition: yup
      .string()
      .required('Beschreibe, wann dein Ziel erreicht ist.'),
    whyAchieveable: yup
      .string()
      .required('Beschreibe, wie oder warum du dein Ziel erreichen willst.'),
    whyRelevant: yup
      .string()
      .required('Beschreibe, warum dein Projekt relevant ist.'),
    deadline: yup
      .string()
      .required('Gib eine realistische Deadline an.')
  }),
)

const { values, errors, defineField, meta } = useForm({
  validationSchema: registerSchema,
});

const [title, titleAttrs] = defineField('title')
const [goal, goalAttrs] = defineField('goal')
const [description, descriptionAttrs] = defineField('description')
const [winCondition, winConditionAttrs] = defineField('winCondition')
const [whyAchieveable, whyAchieveableAttrs] = defineField('whyAchieveable')
const [whyRelevant, whyRelevantAttrs] = defineField('whyRelevant')
const [deadline, deadlineAttrs] = defineField('deadline')

const getHelpers = async () => {
  try {
    // send credentials to api/data
    const matchesRequest = await $fetch('/api/data/getUserIdsBySkills', {
      method: 'POST',
      body: {
        skills: requiredSkills.value
      }
    })
    possibleHelpers.value = computed(() => matchesRequest.matches.sort((a, b) => b.skills.length - a.skills.length)).value
  }
  catch (error) {
    console.error(error)
  }
}

const addRequiredSkill = async (eventPayload: { payload: string }) => {
  requiredSkills.value.push(eventPayload.payload)
  await getHelpers()
}

const removeSkill = async (index: number) => {
  requiredSkills.value.splice(index, 1)
  await getHelpers()
}

const createProject = async () => {
  try {
    // fetch members data
    const members = await fetchMembers([userId.value != 0 ? userId.value : 1])
    
    // send data to api endpoint -- as the database schema requires it
    await $fetch('/api/createProject', {
      method: 'POST',
      body: {
        id: 0,
        owner: userId.value,
        title: values.title,
        goal: values.goal,
        description: values.description,
        requiredSkills: JSON.stringify(requiredSkills.value),
        winCondition: values.winCondition,
        whyAchieveable: values.whyAchieveable,
        whyRelevant: values.whyRelevant,
        deadline: values.deadline,
        members: JSON.stringify(members),
        resources: JSON.stringify([]),
        isLookingForMembers: isLookingForMembers.value ? 1 : 0,
        isVisible: isVisible.value ? 1: 0,
        isDone: 0,
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
    <h2 class="h2">Starte ein neues Projekt</h2>
    <div class="form-question">
      <form @submit.prevent="createProject">

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

        <div class="field field-goal" :class="[{'has-text': goal}, {'has-error': errors.goal}, {'is-acceptable': goal && !errors.goal}]">
          <textarea v-model="goal" v-bind="goalAttrs"  name="goal" ></textarea>
          <label for="goal">Was ist ein konkretes Ziel?</label>
          <div class="errors">
            {{ errors.goal }}
            <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.goal">
              this is a dummy text to keep the stupid divs size.
            </div>
          </div>
        </div>

        <div class="field field-description" :class="[{'has-text': description}, {'has-error': errors.description}, {'is-acceptable': description && !errors.description}]">
          <textarea v-model="description" v-bind="descriptionAttrs"  name="description" ></textarea>
          <label for="description">Beschreib dein Projekt</label>
          <div class="errors">
            {{ errors.description }}
            <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.description">
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

        <div class="field field-winCondition" :class="[{'has-text': winCondition}, {'has-error': errors.winCondition}, {'is-acceptable': winCondition && !errors.winCondition}]">
          <textarea v-model="winCondition" v-bind="winConditionAttrs"  name="description" ></textarea>
          <label for="winCondition">Wann ist dein Ziel erreicht?</label>
          <div class="errors">
            {{ errors.winCondition }}
            <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.winCondition">
              this is a dummy text to keep the stupid divs size.
            </div>
          </div>
        </div>

        <div class="field field-whyAchieveable" :class="[{'has-text': whyAchieveable}, {'has-error': errors.whyAchieveable}, {'is-acceptable': whyAchieveable && !errors.whyAchieveable}]">
          <textarea v-model="whyAchieveable" v-bind="whyAchieveableAttrs"  name="whyAchieveable" ></textarea>
          <label for="whyAchieveable">Dein Ziel ist erreichbar, weil:</label>
          <div class="errors">
            {{ errors.whyAchieveable }}
            <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.whyAchieveable">
              this is a dummy text to keep the stupid divs size.
            </div>
          </div>
        </div>

        <div class="field field-whyRelevant" :class="[{'has-text': whyRelevant}, {'has-error': errors.whyRelevant}, {'is-acceptable': whyRelevant && !errors.whyRelevant}]">
          <textarea v-model="whyRelevant" v-bind="whyRelevantAttrs"  name="whyRelevant" ></textarea>
          <label for="whyRelevant">Dein Ziel ist relevant, weil:</label>
          <div class="errors">
            {{ errors.whyRelevant }}
            <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.whyRelevant">
              this is a dummy text to keep the stupid divs size.
            </div>
          </div>
        </div>

        <div class="field field-deadline" :class="[{'has-text': deadline}, {'has-error': errors.deadline}, {'is-acceptable': deadline && !errors.deadline}]">
          <input v-model="deadline" v-bind="deadlineAttrs"  name="deadline" >
          <label for="deadline">Realistische Deadline</label>
          <div class="errors">
            {{ errors.deadline }}
            <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.deadline">
              this is a dummy text to keep the stupid divs size.
            </div>
          </div>
        </div>

        <div class="field field-isLookingForMembers">
          <input v-model="isLookingForMembers" type="checkbox" name="isLookingForMembers" >
          <label for="isLookingForMembers">Suchst du nach Partnern für dein Projekt?</label>
        </div>

        <div class="field field-isVisible">
          <input v-model="isVisible" type="checkbox" name="isVisible" >
          <label for="isVisible">Projekt soll für alle sichtbar sein</label>
        </div>

        <div class="field field-submit">
          <button class="btn btn-submit" type="submit" :disabled="!meta.valid">Projekt erstellen</button>
        </div>
      </form>
      <div class="helpers grid grid-cols-4 gap-4">
        <div v-for="(helper, index) in possibleHelpers.filter(helper => helper.skills.length >= requiredSkills.length / 2)" :key="index">
          <p>id: {{ helper.id }}</p>
          <p>name: {{ helper.name }}</p>
          <p>common: {{ helper.skills }}</p>
          <img src="../assets/img/profile-mr-light.png" :alt="helper.name">
          <NuxtLink :to="{path: 'profil', query: {wizard: helper.id}}">Mehr erfahren</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>