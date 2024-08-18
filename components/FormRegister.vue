<script lang="ts" setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { generateNumber } from '~/composables/generateRandomNumber'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const registerSchema = toTypedSchema(
  yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
    passwordConfirm: yup.string().required(),
  }),
)

const { login } = useAuth();
const { values, errors, defineField } = useForm({
  validationSchema: registerSchema,
});

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [passwordConfirm, passwordConfirmAttrs] = defineField('password')

// const register = async () => {
//   // generate a random 8-digit id
//   const newId = ref<number>(generateNumber(8))

//   let requestUsername = await $fetch('/api/data/getUsername', {
//     method: 'POST',
//     body: {
//       username: username.value,
//       id: newId.value
//     }
//   })

//   // if newId is by change unavailable, keep generating new ones until one is free
//   while(requestUsername.matchingIdFound){
//     newId.value = generateNumber(8)
//     requestUsername = await $fetch('/api/data/getUsername', {
//       method: 'POST',
//       body: {
//         username: username.value,
//         id: newId.value
//       }
//     })
//   }

//   // check if username is already taken
//   if(requestUsername.matchingNameFound){
//     console.log('name already taken')
//   }
//   //check if pw was entered correctly
//   else if(password.value === passwordConfirm.value){
//     // insert a new user into table 'users'
//     await $fetch('/api/auth/register', {
//       method: 'POST',
//       body: {
//         id: newId.value,
//         username: username.value,
//         password: password.value
//       }
//     })
//   }
// }

const doSomething = () => {
  console.log(values)
}
</script>

<template>
  <div class="form-register">
    <pre>
      values: {{ values }}
      errors: {{ errors }}
    </pre>
    <form @submit.prevent="doSomething">
      <div class="field-username">
        <input class="border border-black mb-2" v-model="email" v-bind="emailAttrs" name="email" placeholder="E-Mail" />
        <label for="email">E-Mail</label>
      </div>
      <div class="field-password">
        <input class="border border-black mb-2" v-model="password" v-bind="passwordAttrs" name="password" placeholder="Passwort" />
        <label for="password">Passwort</label>
      </div>
      <div class="field-password">
        <input class="border border-black mb-2" v-model="password" v-bind="passwordAttrs" name="passwordConfirm" placeholder="Passwort bestätigen" />
        <label for="passwordConfirm">Passwort bestätigen</label>
      </div>
      <div class="field-submit">
        <button type="submit">Registrieren</button>
      </div>
    </form>
  </div>
</template>