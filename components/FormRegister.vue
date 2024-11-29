<script lang="ts" setup>
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
          const requestUniqueKeys = await $fetch('/api/getUsersUniqueKeys', {
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
const { values, errors, defineField, meta } = useForm({
  validationSchema: registerSchema,
})
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm')

const router = useRouter()
const { toggleAuthForm } = useToggleContent()
const { login, userId } = useAuth()
const { fetchUserData } = useUserData()
const { editModeOn } = useEdit()

const register = async () => {
  // insert a new user into table 'users'
  try{
    const registerRequest = await $fetch('/api/register', {
      method: 'POST',
      body: {
        id: 0,
        email: values.email,
        password: values.password
      }
    })
    if(registerRequest.success){
      login(registerRequest.id)
      fetchUserData(registerRequest.id)
      editModeOn()
      router.push({path: '/profil', query: {wizard: userId.value}})
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: "There's a fracture in the Weave. Roll Arcana to investigate.",
      });
    }
  } catch (error) {
    console.error('Error while creating a new user:', error)
  }
}
</script>

<template>
  <div class="form-register">
    <p class="h3">Registrieren</p>
    <form @submit.prevent="register">
      <div class="field field-email" :class="[{'has-text': email}, {'has-error': errors.email}, {'is-acceptable': email && !errors.email}]">
        <input v-model="email" v-bind="emailAttrs" name="email" placeholder="" />
        <label for="email">E-Mail</label>
        <div class="errors">
          {{ errors.email }}
          <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.email">
            this is a dummy text to keep the stupid divs size.
          </div>
        </div>
      </div>
      <div class="field field-password" :class="[{'has-text': password}, {'has-error': errors.password}, {'is-acceptable': password && !errors.password}]">
        <input v-model="password" v-bind="passwordAttrs" name="password" placeholder="" type="password" />
        <label for="password">Passwort</label>
        <div class="errors">
          {{ errors.password }}
          <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.password">
            this is a dummy text to keep the stupid divs size.
          </div>
        </div>
      </div>
      <div class="field field-password" :class="[{'has-text': passwordConfirm}, {'has-error': errors.passwordConfirm}, {'is-acceptable': passwordConfirm && !errors.passwordConfirm}]">
        <input  v-model="passwordConfirm" v-bind="passwordConfirmAttrs" name="passwordConfirm" placeholder="" type="password" />
        <label for="passwordConfirm">Passwort bestätigen</label>
        <div class="errors">
          {{ errors.passwordConfirm }}
          <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.passwordConfirm">
            this is a dummy text to keep the stupid divs size.
          </div>
        </div>
      </div>
      <div class="field field-submit">
        <button class="btn btn-submit" type="submit" :disabled="!meta.valid">Registrieren</button>
      </div>
    </form>
    <p>
      Du hast bereits einen Account? <a href="#" @click.prevent="toggleAuthForm" title="Registrieren">⭢ <span class="btn-text">Login</span></a>
    </p>
  </div>
</template>