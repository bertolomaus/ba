<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import Autocomplete from '../components/Autocomplete.vue'
import Trash from '../components/Trash.vue'

interface MatchingHelper{
  id: number
  commonSkills: string[]
  name: string
  avatar: string
}

const { allSkills, listSkills, getName, getAvatar } = useData()
const requiredSkills = ref<string[]>([])
const possibleHelpers = ref<MatchingHelper[]>([])

const registerSchema = toTypedSchema(
  yup.object({
    title: yup
      .string()
      .required('Gib einen aussagekräftigen Titel an.'),
    description: yup
      .string()
      .required('Beschreib dein Problem.')
  }),
)

const { values, errors, defineField, meta } = useForm({
  validationSchema: registerSchema,
});

const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')

const getHelpers = async () => {
  try {
    // send credentials to api/data
    const matchesRequest = await $fetch('/api/data/getIdsBySkills', {
      method: 'POST',
      body: {
        skills: requiredSkills.value
      }
    })

    matchesRequest.matches.forEach((match) => {
      if (possibleHelpers.value.some(helper => helper.id == match.id)){
        possibleHelpers.value[(possibleHelpers.value.findIndex(helper => helper.id == match.id))].commonSkills = match.commonSkills
      } else {
        possibleHelpers.value.push(match)
      }
    })

    possibleHelpers.value = computed(() => possibleHelpers.value.sort((a, b) => b.commonSkills.length - a.commonSkills.length)).value
    console.log(possibleHelpers.value)

    for(let helper of possibleHelpers.value){
      helper.name = getName(helper.id)
      helper.avatar = getAvatar(helper.id)
      console.log(helper)
    }
  }
  catch (error) {
    console.error(error)
  }
}

const addRequiredSkill = async (eventPayload: { payload: string }) => {
  requiredSkills.value.push(eventPayload.payload)
  await getHelpers()
}

const postQuestion = () => {
  console.log('post question')
}

const removeSkill = (index: number) => {
  requiredSkills.value.splice(index, 1)
}

onMounted(() => {
  listSkills()
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
        <div class="field field-submit">
          <button class="btn btn-submit" type="submit" :disabled="!meta.valid">Frage posten</button>
        </div>
      </form>
      <div class="mt-8 btn w-max" @click="getHelpers">test get</div>
    </div>
  </div>
</template>