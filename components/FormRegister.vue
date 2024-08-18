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
      .email('Gib eine gültige E-Mail Adresse an.'),
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

const { login } = useAuth();
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
      email: email.value,
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
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        id: newId.value,
        email: values.email,
        password: values.password
      }
    })
  }
}
</script>

<template>
  <div class="form-register">
    <pre>
      values: {{ values }}
      errors: {{ errors }}
    </pre>
    <form @submit.prevent="register">
      <div class="field-username">
        <input class="border border-black mb-2" v-model="email" v-bind="emailAttrs" name="email" placeholder="E-Mail" />
        <label for="email">E-Mail</label>
        <div>{{ errors.email }}</div>
      </div>
      <div class="field-password">
        <input class="border border-black mb-2" v-model="password" v-bind="passwordAttrs" name="password" placeholder="Passwort" />
        <label for="password">Passwort</label>
        <div>{{ errors.password }}</div>
      </div>
      <div class="field-password">
        <input class="border border-black mb-2" v-model="passwordConfirm" v-bind="passwordConfirmAttrs" name="passwordConfirm" placeholder="Passwort bestätigen" />
        <label for="passwordConfirm">Passwort bestätigen</label>
        <div>{{ errors.passwordConfirm }}</div>
      </div>
      <div class="field-submit">
        <button type="submit">Registrieren</button>
      </div>
    </form>
  </div>
</template>