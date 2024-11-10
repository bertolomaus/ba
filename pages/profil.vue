<script lang="ts" setup>
import Autocomplete from '../components/Autocomplete.vue'
import Star from '../components/Star.vue'
import Trash from '../components/Trash.vue'
import Edit from '../components/Edit.vue'

const route = useRoute()
const { userId } = useAuth()
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

// toggle the avatar edit mode
const toggleEditAvatar = () => {
  editAvatar.value = !editAvatar.value
}

// set new avatar (not yet to database)
const setAvatar = (newAvatar: string) => {
  userData.value.avatar = newAvatar
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
  }
  else {
    console.log(profileId, userId.value.toString())
  }
}

// trigger save() on ctrl+s
const handleKeydown = (event: KeyboardEvent) => {
  if(editMode.value && event.ctrlKey && event.key === 's'){
    event.preventDefault()
    save()
  }
}

// fetch profile info, skills, hobbies, set isOwner and hide modal & sidebar
const prepareContent = async () => {
  showSidebar.value = false
  showModal.value = false
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
  console.log('ohnoo');
}

onMounted(async () => {
  // prepare displayed content on page load
  prepareContent()

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
      <div class="grid grid-cols-2 gap-16">
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
        <div>
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
            </div>
            <div v-else>
              <p>{{ userData.status }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="contact">
        <h3>Kontakt</h3>
        <div v-if="editMode">
          <p>Abgesehen von Eulen und Gedankenlesen, wie möchtest du kontaktiert werden?</p>
          <input placeholder="Whatsapp" name="whatsapp" v-model="userData.contact[0]" />
          <input placeholder="Discord" name="discord" v-model="userData.contact[1]" />
          <input placeholder="Signal" name="signal" v-model="userData.contact[2]" />
          <input placeholder="Webex" name="webex" v-model="userData.contact[3]" />
          <input placeholder="Email" name="email" v-model="userData.contact[4]" />
        </div>
        <div v-else>
          <ul class="list-contact">
            <li v-if="userData.contact[0]">
              <a :href="userData.contact[0]" class="flex gap-2 items-center">
                <NuxtImg src="wa.png" alt="Icon Whatsapp" height="24" />
                Whatsapp
              </a>
            </li>
            <li v-if="userData.contact[1]">
              <a :href="userData.contact[2]" class="flex gap-2 items-center">
                <NuxtImg src="discord.png" alt="Icon Discord" height="24" />
                Discprd
              </a>
            </li>
            <li v-if="userData.contact[2]">
              <a :href="userData.contact[2]" class="flex gap-2 items-center">
                <NuxtImg src="signal.png" alt="Icon Signal" height="24" />
                Signal
              </a>
            </li>
            <li v-if="userData.contact[3]">
              <a :href="userData.contact[3]" class="flex gap-2 items-center">
                <NuxtImg src="webex.png" alt="Icon Webex" height="24" />
                Webex
              </a>
            </li>
            <li v-if="userData.contact[4]">
              <a :href="userData.contact[4]" class="flex gap-2 items-center">
                <NuxtImg src="mail.png" alt="Icon Email" height="24" />
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="skills">
        <h3>Fertigkeiten & Zaubertricks</h3>
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
        <ul class="list-hobbies flex">
          <li class="item-hobbies flex items-center" v-for="(hobby, index) in userData.hobbies.sort()" :key="index">
            <div class="w-max">{{ hobby }}</div>
            <Trash @click="removeHobby(index)" v-if="editMode" />
          </li>
        </ul>
        <Autocomplete v-if="editMode" :label="'Hobby hinzufügen'" :suggestions="allHobbies.sort()"
          @submit-input="addNewHobby" />
      </div>
      <div class="bio">
        <h3>Über {{ userData.name }}</h3>
        <div v-if="editMode">
          <textarea placeholder="Bio" name="bio" v-model="userData.bio"></textarea>
        </div>
        <div v-else>{{ userData.bio }}</div>
      </div>
      <div class="deleteProfile mt-16">
        <button class="btn btn-red" @click="deleteProfile">Profil löschen</button>
      </div>
      <div class="save" v-if="editMode">
        <button class="btn btn-green w-max" @click="save">Änderungen Speichern</button>
      </div>
    </div>
  </div>
</template>