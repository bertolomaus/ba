<script lang="ts" setup>
import Autocomplete from '../components/Autocomplete.vue'
import Star from '../components/Star.vue'
import Trash from '../components/Trash.vue'

const route = useRoute()
const { userId } = useAuth()
const profileId = route.query.wizard?.toString()
const { userData, fetchData, updateUserData, getHobbies, allHobbies } = useUserData()
const { showSidebar } = useToggleContent()
const { showModal } = useModal()
const isOwner = ref<boolean>(false)
const allSkills = ref<string[]>([])

const getAllSkills = async () => {
  const skillsRequest = await $fetch('/api/data/getSkills')
  allSkills.value = skillsRequest.result
}

// add skill to userData array (not yet to database)
const addNewSkill = (eventPayload: { payload: string }) => {
  userData.value.skills.push({name: eventPayload.payload, level: 0})
}

// add hobby to userData array (not yet to database)
const addNewHobby = (eventPayload: { payload: string }) => {
  userData.value.hobbies.push(eventPayload.payload)
}

// remove skill from userData array (not yet from database)
const removeSkill = (index: number) => {
  userData.value.skills.splice(index, 1)
}

// update database entry
const save = async () => {
  if(profileId != '0' && profileId == userId.value.toString()){
    updateUserData(parseInt(profileId), userData.value)

    let skills: string[] = []
    userData.value.skills.forEach((skill) => {
      skills.push(skill.name)
    })
    await $fetch('/api/data/setSkills', {
      method: 'POST',
      body: {
        skills: skills
      }
    })
  }
}

// fetch profile info, skills, hobbies, set isOwner and hide modal & sidebar
const prepareContent = async () => {
  showSidebar.value = false
  showModal.value = false
  try{
    if(profileId){
      fetchData(parseInt(profileId.toString()))
    } else{
      fetchData()
    }
    profileId == userId.value.toString() ? isOwner.value = true : isOwner.value = false
    getAllSkills()
    getHobbies()
  } catch (error){
    console.error(error)
  }
}

// prepare displayed content on page load
onMounted(async () => {
  prepareContent()
})

// change displayed content whenever wizard id in url changes
watch(async () => route.query.wizard, (newWizard, oldWizard) => {   //looks like watch gets value from first param and puts new/old values into 2nd
  if (newWizard !== oldWizard) {
    prepareContent()
  }
})
</script>

<template>
  <div class="profil">
    <div class="container">
      <h1 class="">At your service, {{ userData.name }}</h1>
      <ul class="p-8 list-disc">
        <li>JWT auth für persistenten login</li>
      </ul>
      <div class="grid grid-cols-2 gap-16">
        <div>
          <div class="avatar">
            <img src="assets/img/profile-mr-light.png" alt="">
            <ul class="p-8 list-disc">
              <li>avatar editable machen</li>
              <li>wählen zwischen 4 avataren</li>
              <li>onclick: öffne auswhl für avatare</li>
              <li>wenn avatar gewählt: ändere url von avatar</li>
            </ul>
          </div>
        </div>
        <div>
          <div class="name">
            <h3>Anzeigename</h3>
            <input placeholder="Name" name="name" v-model="userData.name" />
          </div>
          <div class="status">
            <h3>Status</h3>
            <textarea placeholder="Status" name="status" v-model="userData.status"></textarea>
          </div>
        </div>
      </div>
      <div class="contact">
        <h3>Contact</h3>
        <p>Abgesehen von Eulen und Gedankenlesen, wie möchtest du kontaktiert werden?</p>
        <input placeholder="Whatsapp" name="whatsapp" v-model="userData.contact[0]" />
        <input placeholder="Discord" name="discord" v-model="userData.contact[1]" />
        <input placeholder="Signal" name="signal" v-model="userData.contact[2]" />
        <input placeholder="Webex" name="webex" v-model="userData.contact[3]" />
        <input placeholder="Email" name="email" v-model="userData.contact[4]" />
      </div>
      <div class="skills">
        <h3>Prepared Spells</h3>
        <ul class="list-skills">
          <li class="item-skills flex" v-for="(skill, index) in userData.skills.sort((a, b) => {if(b.level != a.level){return b.level - a.level} return a.name.localeCompare(b.name)})" :key="skill.name">
            <div class="skill-name">{{ skill.name }}</div>
            <div class="flex skill-level">
              <Star
                @click="skill.level = index + 1"
                class="pr-2 cursor-pointer"
                v-for="(item, index) in 5"
                :key="index" :data-skill="index + 1"
                :class="index + 1 <= skill.level ? 'fill-primary' : 'fill-none'"
              />
            </div>
            <Trash @click="removeSkill(index)" class="ml-4" />
          </li>
        </ul>
        <Autocomplete :label="'Fertigkeit hinzufügen'" :suggestions="allSkills.sort()" @submit-input="addNewSkill" />
      </div>
      <div class="personal">
        <h3>Hobbies</h3>
        <ul class="list-skills">
          <li class="item-skills" v-for="hobby in userData.hobbies.sort()" :key="hobby">
            <div class="w-max">{{ hobby }}</div>
          </li>
        </ul>
        <Autocomplete :label="'Hobby hinzufügen'" :suggestions="allHobbies.sort()" @submit-input="addNewHobby" />
      </div>
      <div class="bio">
        <h3>Bio</h3>
        <textarea placeholder="Bio" name="bio" v-model="userData.bio"></textarea>
      </div>
      <div class="save">
        <p class="btn w-max mt-8" @click="save">Speichern</p>
      </div>
    </div>
  </div>
</template>