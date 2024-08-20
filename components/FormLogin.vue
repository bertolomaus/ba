<script lang="ts" setup>
import { ref } from 'vue'
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
  }),
)

const { login, isLoggedIn } = useAuth()
const { toggleAuthForm } = useToggleContent()
const { values, errors, defineField, meta } = useForm({
  validationSchema: registerSchema,
});

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

// login with credentials
const handleLogin = async () => {
  try {
    // send credentials to api/auth
    const loginRequest = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: values.email,
        password: values.password
      }
    })
  }
  catch (error) {
    // console.error(error.statusMessage);
  }
}
</script>

<template>
  <div class="form-login">
    <p class="h3">Login</p>
    <form @submit.prevent="handleLogin">
      <div class="field field-email" :class="[{'has-text': email}, {'has-error': errors.email}, {'is-acceptable': email && !errors.email}]">
        <input v-model="email" v-bind="emailAttrs" name="email" />
        <label for="email">E-Mail</label>
        <div class="errors">
          {{ errors.email }}
          <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.email">
            this is a dummy text to keep the stupid divs size.
          </div>
        </div>
      </div>
      <div class="field field-password" :class="[{'has-text': password}, {'has-error': errors.password}, {'is-acceptable': password && !errors.password}]">
        <input v-model="password" v-bind="passwordAttrs"  name="password" />
        <label for="password">Passwort</label>
        <div class="errors">
          {{ errors.password }}
          <div class="error-placeholder opacity-0 pointer-events-none" v-if="!errors.password">
            this is a dummy text to keep the stupid divs size.
          </div>
        </div>
      </div>
      <div class="field field-submit">
        <button class="btn btn-submit" type="submit" :disabled="!meta.valid">Login</button>
      </div>
    </form>
    <p>
      Du hast noch keinen Account? <a href="#" @click.prevent="toggleAuthForm" title="Registrieren">🡒 <span class="btn-text">Registrieren</span></a>
    </p>
    <button v-if="!isLoggedIn" class="btn mt-4" @click="login(1)">Login as Dev</button>
  </div>
</template>