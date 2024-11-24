<script lang="ts" setup>
import Autocomplete from '../components/Autocomplete.vue'
import Star from '../components/Star.vue'
import Trash from '../components/Trash.vue'
import Edit from '../components/Edit.vue'

const route = useRoute()
const { userId, logout } = useAuth()
const profileId = route.query.wizard?.toString()
const { userData, fetchUserData, updateUserData, getHobbies, allHobbies } = useUserData()
const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const { getSkills, allSkills, setSkills } = useSkills()
const { editMode, editModeOn, editModeOff } = useEdit()
const isOwner = ref(false)
const listAvatars = ref([
  "profile-mr-dark.png",
  "profile-fr-dark.png"
])
const editAvatar = ref(false)
const { isScrolled } = useWindow()
const confirmPw = ref()
const confirmEmail = ref()
const openConfirmPassword = ref(false)
const openConfirmDelete = ref(false)
const changePwOld = ref()
const changePwNew = ref()
const pwChangedSuccesfully = ref(false)

// toggle the avatar edit mode
const toggleEditAvatar = () => {
  editAvatar.value = !editAvatar.value
}

// set new avatar (not yet to database)
const setAvatar = (newAvatar: string) => {
  userData.value.avatar = newAvatar
  editAvatar.value = false;
}

// add skill to userData array (not yet to database)
const addNewSkill = (eventPayload: { payload: string }) => {
  userData.value.skills.push({ name: eventPayload.payload, level: 0 })
}

// add hobby to userData array (not yet to database)
const addNewHobby = (eventPayload: { payload: string }) => {
  userData.value.hobbies.push(eventPayload.payload)
}

// remove skill from userData array (not yet from database)
const removeSkill = (index: number) => {
  userData.value.skills.splice(index, 1)
}

// remove hobby from userData array (not yet from database)
const removeHobby = (index: number) => {
  userData.value.hobbies.splice(index, 1)
}

// update database entry
const save = async () => {
  if (profileId != '0' && profileId == userId.value.toString()) {
    updateUserData(parseInt(profileId), userData.value)

    let skills: string[] = []
    userData.value.skills.forEach((skill) => {
      skills.push(skill.name)
    })

    setSkills(skills)
    editModeOff()

    openConfirmDelete.value = false
    openConfirmPassword.value = false
    pwChangedSuccesfully.value = false;
    changePwOld.value = '';
    changePwNew.value = '';
  }
  else {
    console.log(profileId, userId.value.toString())
  }
}

// abort edit
const discardChanges = async () => {
  prepareContent()
  editModeOff()
  openConfirmDelete.value = false
  openConfirmPassword.value = false
  pwChangedSuccesfully.value = false;
  changePwOld.value = '';
  changePwNew.value = '';
}

// trigger save() on ctrl+s
const handleKeydown = (event: KeyboardEvent) => {
  if (editMode.value && event.ctrlKey && event.key === 's') {
    event.preventDefault()
    save()
  }
}

// fetch profile info, skills, hobbies, set isOwner and hide modal & sidebar
const prepareContent = async () => {
  try {
    if (profileId) {
      fetchUserData(parseInt(profileId.toString()))
    } else {
      fetchUserData()
    }
    profileId == userId.value.toString() ? isOwner.value = true : isOwner.value = false
    getSkills()
    getHobbies()
  } catch (error) {
    console.error(error)
  }
}

//delete profile
const deleteProfile = async () => {
  try {
    const response = await $fetch('/api/auth/delete', {
      method: 'POST',
      body: {
        email: confirmEmail.value,
        password: confirmPw.value
      }
    })
    console.log(response);
    if (response.success) {
      logout()
    }
  } catch (e) {
    console.error(e)
  }
}

//change password
const changePassword = async () => {
  try {
    const response = await $fetch('/api/auth/changePassword', {
      method: 'POST',
      body: {
        id: userId.value,
        pwOld: changePwOld.value,
        pwNew: changePwNew.value
      }
    })
    if (response.success) {
      showPwChangeSuccessMessage()
    }
  } catch (e) {
    console.error(e)
  }
}

// show success message when changing pw
const showPwChangeSuccessMessage = () => {
  pwChangedSuccesfully.value = true;
  openConfirmPassword.value = false;
  changePwOld.value = '';
  changePwNew.value = '';
}

onMounted(async () => {
  // prepare displayed content on page load
  prepareContent()
  showSidebar.value = false
  showModal.value = false

  // add ctrl+s saving
  window.addEventListener('keydown', handleKeydown)
})

// change displayed content whenever wizard id in url changes
watch(async () => route.query.wizard, (newWizard, oldWizard) => {   //looks like watch gets value from first param and puts new/old values into 2nd
  if (newWizard !== oldWizard) {
    prepareContent()
  }
})

onUnmounted(() => {
  // remove ctrl+s key locking
  window.removeEventListener('keydown', handleKeydown)

  // make sure to deactivate edit mode when leaving the page
  editModeOff()
})
</script>

<template>
  <div class="profil">
    <Edit :class="{ 'scrolled': isScrolled }" />
    <div class="container">
      <h1 class=""><span v-if="userData.name">{{ userData.name }}<span
            v-if="userData.name.charAt(userData.name.length - 1) === 's' || userData.name.charAt(userData.name.length - 1) === 'x' || userData.name.charAt(userData.name.length - 1) === 'z'">'
          </span><span v-else>s </span></span>Profil</h1>
      <div class="flex gap-16">
        <div>
          <div class="avatar">
            <NuxtImg :src="userData.avatar" :alt="`Avatar ${userData.name}`" width="256" />
            <div class="edit-avatar" v-if="editMode">
              <div class="iconEditAvatar" @click="toggleEditAvatar" :class="editAvatar ? 'active' : ''">
                <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path
                    d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              </div>
              <ul class="list-avatars" v-if="editAvatar">
                <li class="item-skills" v-for="avatar in listAvatars" :key="avatar">
                  <NuxtImg :src="avatar" :alt="`Alternative Avatare ${userData.name}`" width="96"
                    @click="setAvatar(avatar)" class="cursor-pointer" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex-grow">
          <div class="name">
            <div v-if="editMode">
              <h3>Anzeigename</h3>
              <input placeholder="Name" name="name" v-model="userData.name" />
            </div>
            <div v-else>
              <h3>{{ userData.name }}</h3>
            </div>
          </div>
          <div class="status">
            <div v-if="editMode">
              <h3>Status</h3>
              <textarea placeholder="Status" name="status" v-model="userData.status"></textarea>
              <p class="hint">Was treibt dich gerade um?</p>
            </div>
            <div v-else>
              <p>{{ userData.status }}</p>
            </div>
          </div>
          <div class="changePassword mt-8" v-if="editMode">
            <div v-if="!pwChangedSuccesfully">
              <button class="btn" @click="openConfirmPassword = true">Passwort ändern</button>
              <div v-if="openConfirmPassword" class="mt-8 max-w-lg p-8 bg-slate-750 border border-slate-500">
                <p>Gib dein altes Passwort ein:</p>
                <input placeholder="Altes Passwort" name="changePwOld" v-model="changePwOld" class="mt-0"
                  type="password" />
                <p class="mt-2">Gib dein neues Passwort ein:</p>
                <input placeholder="Neues Passwort" name="changePwNew" v-model="changePwNew" class="mt-0"
                  type="password" />
                <div class="flex gap-4 mt-4">
                  <button class="btn" @click="changePassword">Passwort ändern</button>
                  <button class="btn btn-muted" @click="discardChanges">Abbrechen</button>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="h4"><span class="text-green">Password wurde geändert.</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="contact">
        <h3 v-if="userData.contact || editMode">Kontakt</h3>
        <div v-if="editMode">
          <p>Abgesehen von Eulen und Gedankenlesen, wie möchtest du kontaktiert werden?</p>
          <input placeholder="Whatsapp" name="whatsapp" v-model="userData.contact[0]" />
          <p class="hint">Deine Whatsapp-Telefonnummer</p>
          <input placeholder="Discord" name="discord" v-model="userData.contact[1]" />
          <p class="hint">Dein Discord-Benutzername</p>
          <input placeholder="Signal" name="signal" v-model="userData.contact[2]" />
          <p class="hint">Deine Signal-Telefonnummer</p>
          <input placeholder="Webex" name="webex" v-model="userData.contact[3]" />
          <p class="hint">Deine Webex-Emailadresse</p>
          <input placeholder="Email" name="email" v-model="userData.contact[4]" />
          <p class="hint">Deine Emailadresse</p>
        </div>
        <div v-else>
          <ul class="list-contact">
            <li v-if="userData.contact[0]">
              <a :href="`https://wa.me/${userData.contact[0]}`" class="flex gap-2 items-center" target="_blank">
                <NuxtImg :src="'wa.png'" alt="Icon Whatsapp" height="24" />
                Whatsapp
              </a>
            </li>
            <li v-if="userData.contact[1]">
              <p class="flex gap-2 items-center">
                <NuxtImg :src="'discord.png'" alt="Icon Discord" height="24" />
                Discord: {{ userData.contact[1] }}
              </p>
            </li>
            <li v-if="userData.contact[2]">
              <a :href="`signal://send?phone=${userData.contact[2]}`" class="flex gap-2 items-center" target="_blank">
                <NuxtImg :src="'signal.png'" alt="Icon Signal" height="24" />
                Signal
              </a>
            </li>
            <li v-if="userData.contact[3]">
              <a :href="`https://web.webex.com/meet/${userData.contact[3]}`" class="flex gap-2 items-center"
                target="_blank">
                <NuxtImg :src="'webex.png'" alt="Icon Webex" height="24" />
                Webex
              </a>
            </li>
            <li v-if="userData.contact[4]">
              <a :href="`mailto:${userData.contact[4]}`" class="flex gap-2 items-center" target="_blank">
                <NuxtImg :src="'mail.png'" alt="Icon Email" height="24" />
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="skills">
        <h3>Fertigkeiten</h3>
        <ul class="list-skills">
          <li class="item-skills flex"
            v-for="(skill, index) in userData.skills.sort((a, b) => { if (b.level != a.level) { return b.level - a.level } return a.name.localeCompare(b.name) })"
            :key="skill.name">
            <div class="skill-name">{{ skill.name }}</div>
            <div class="flex skill-level" v-if="editMode">
              <Star @click="skill.level = index + 1" class="pr-2 cursor-pointer" v-for="(item, index) in 5" :key="index"
                :data-skill="index + 1" :class="index + 1 <= skill.level ? 'fill-highlight' : 'fill-none'" />
            </div>
            <div class="flex skill-level pointer-events-none" v-else>
              <Star class="pr-2" v-for="(item, index) in 5" :key="index" :data-skill="index + 1"
                :class="index + 1 <= skill.level ? 'fill-highlight' : 'fill-none'" />
            </div>
            <Trash @click="removeSkill(index)" class="ml-4" v-if="editMode" />
          </li>
        </ul>
        <Autocomplete v-if="editMode" :label="'Fertigkeit hinzufügen'" :suggestions="allSkills.sort()"
          @submit-input="addNewSkill" />
      </div>
      <div class="personal">
        <h3>Hobbies</h3>
        <p v-if="editMode">Erzähl ein bisschen was über dich! Gib deinen Kommilitonen die Möglichkeit, dich
          kennenzulernen.</p>
        <ul class="tags mt-4">
          <li v-for="(hobby, index) in userData.hobbies.sort()" :key="index">
            <div class="w-max">{{ hobby }}</div>
            <Trash @click="removeHobby(index)" v-if="editMode" />
          </li>
        </ul>
        <Autocomplete v-if="editMode" :label="'Hobby hinzufügen'" :suggestions="allHobbies.sort()"
          @submit-input="addNewHobby" />
      </div>
      <div class="bio">
        <h3 v-if="userData.bio || editMode">Über {{ userData.name }}</h3>
        <div v-if="editMode">
          <textarea placeholder="Bio" name="bio" v-model="userData.bio"></textarea>
        </div>
        <div v-else>{{ userData.bio }}</div>
      </div>
      <div class="projects" v-if="userData.projects">
        <h3>
          <span v-if="userData.name">{{ userData.name }}<span
              v-if="userData.name.charAt(userData.name.length - 1) === 's' || userData.name.charAt(userData.name.length - 1) === 'x' || userData.name.charAt(userData.name.length - 1) === 'z'">'
            </span><span v-else>s </span></span>Projekte
        </h3>
        <div class="list-projects cards">
          <NuxtLink class="card" v-for="(project, index) in userData.projects.filter(p => !p.isDone)" :key="index"
            :to="{ path: 'projekt', query: { id: project.id } }">
            <h4 class="h3">{{ project.title }}</h4>
            <ul class="tags tags-small">
              <li v-for="(skill, index) in project.requiredSkills" :key="index">{{ skill }}</li>
            </ul>
          </NuxtLink>
          <NuxtLink class="card isDone" v-for="(project, index) in userData.projects.filter(p => p.isDone)" :key="index"
            :to="{ path: 'projekt', query: { id: project.id } }">
            <h4 class="h3">
              <IconCheck />{{ project.title }}
            </h4>
            <ul class="tags tags-small">
              <li v-for="(skill, index) in project.requiredSkills" :key="index">{{ skill }}</li>
            </ul>
          </NuxtLink>
        </div>
      </div>
      <div class="deleteProfile mt-16 relative" v-if="editMode">
        <button class="btn btn-red" @click="openConfirmDelete = true">Profil löschen</button>
        <div v-if="openConfirmDelete" class="mt-8 max-w-lg p-8 bg-slate-750 border border-slate-500">
          <p class="h6"><span class="text-red">Diese Aktion kann nicht rückgängig gemacht werden.</span></p>
          <p>Wenn du dein Profil löschst, werden ebenfalls alle deine Projekte und Fragen gelöscht.</p>
          <p>Um fortzufahren, gib dein Passwort ein:</p>
          <input placeholder="Email" name="confirmEmail" v-model="confirmEmail" class="mt-4" />
          <input placeholder="Passwort" name="confirmPw" v-model="confirmPw" type="password" class="mt-2" />
          <div class="flex gap-4 mt-4">
            <button class="btn" @click="deleteProfile">Endgültig löschen</button>
            <button class="btn btn-muted" @click="discardChanges">Abbrechen</button>
          </div>
        </div>
      </div>
      <div class="endEditModeButtons" v-if="editMode">
        <button class="btn btn-green w-max" @click="save">Änderungen Speichern</button>
        <button class="btn btn-muted" @click="discardChanges">Abbrechen</button>
      </div>
    </div>
  </div>
</template>