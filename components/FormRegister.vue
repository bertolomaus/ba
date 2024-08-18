<script lang="ts" setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { generateNumber } from '~/composables/generateRandomNumber'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const registerSchema = toTypedSchema(
  yup.object({
    email: yup
      .string()
      .required('Gib eine gültige E-Mail Adresse an.')
      .email('Gib eine gültige E-Mail Adresse an.')
      .test('isEmailAvailable', 'E-Mail Adresse wird bereits verwendet.', 
        async (email = yup.ref('email').toString()) => {
          console.log(email)
          const requestUniqueKeys = await $fetch('/api/data/getUniqueKeys', {
            method: 'POST',
            body: {
              email: email,
              id: 0
            }
          })
          return !requestUniqueKeys.matchingEmailFound
        }),
    password: yup
      .string()
      .required('Gib ein Passwort ein.')
      .min(8, 'Dein Passwort muss mindestens 8 Zeichen lang sein.'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwörter stimmen nicht überein.')
      .required('Bestätige dein Passwort.'),
  }),
)

const router = useRouter()
const { login } = useAuth()
const { values, errors, defineField } = useForm({
  validationSchema: registerSchema,
});

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm')

const register = async () => {
  // generate a random 8-digit id
  const newId = ref<number>(generateNumber(8))

  let requestUniqueKeys = await $fetch('/api/data/getUniqueKeys', {
    method: 'POST',
    body: {
      email: values.email,
      id: newId.value
    }
  })

  // if newId is by change unavailable, keep generating new ones until one is free
  while(requestUniqueKeys.matchingIdFound){
    newId.value = generateNumber(8)
    requestUniqueKeys = await $fetch('/api/data/getUniqueKeys', {
      method: 'POST',
      body: {
        email: values.email,
        id: newId.value
      }
    })
  }

  // check if username is already taken
  if(requestUniqueKeys.matchingEmailFound){
    console.log('name already taken')
  }
  else{
    // insert a new user into table 'users'
    try{
      const loginRequest = await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
          id: newId.value,
          email: values.email,
          password: values.password
        }
      })
      if(loginRequest.success){
        // login new users and redirect them to the profile site
        login(newId.value)
        router.push('/profil')
      }
    } catch (error) {
      console.error('Error while creating a new user:', error)
    }

  }
}
</script>

<template>
  <div class="form-register">
    <form @submit.prevent="register">
      <div class="field field-email" :class="[{'has-text': email}, {'has-error': errors.email}, {'is-acceptable': email && !errors.email}]">
        <input v-model="email" v-bind="emailAttrs" name="email" />
        <label for="email">E-Mail</label>
        <div class="errors">
          {{ errors.email }}
        </div>
      </div>
      <div class="field field-password" :class="[{'has-text': password}, {'has-error': errors.password}, {'is-acceptable': password && !errors.password}]">
        <input v-model="password" v-bind="passwordAttrs"  name="password" />
        <label for="password">Passwort</label>
        <div class="errors">
          {{ errors.password }}
        </div>
      </div>
      <div class="field field-password" :class="[{'has-text': passwordConfirm}, {'has-error': errors.passwordConfirm}, {'is-acceptable': passwordConfirm && !errors.passwordConfirm}]">
        <input  v-model="passwordConfirm" v-bind="passwordConfirmAttrs" name="passwordConfirm" />
        <label for="passwordConfirm">Passwort bestätigen</label>
        <div class="errors">
          {{ errors.passwordConfirm }}
        </div>
      </div>
      <div class="field field-submit">
        <button class="btn btn-submit" type="submit">Registrieren</button>
      </div>
    </form>
  </div>
</template>