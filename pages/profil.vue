<script lang="ts" setup>
import Autocomplete from '../components/Autocomplete.vue'
import Star from '../components/Star.vue'

const route = useRoute()
const { userId } = useAuth()
const profileId = route.query.id?.toString()
const { userData, fetchData, listSkills, listHobbies, allSkills, allHobbies, updateUserData } = useData()
const isOwner = ref<boolean>(false)

const addNewSkill = (eventPayload: { payload: string }) => {
  userData.value.skills.push({name: eventPayload.payload, level: 0})
}

const addNewHobby = (eventPayload: { payload: string }) => {
  userData.value.hobbies.push(eventPayload.payload)
}

const save = () => {
  if(profileId){
      updateUserData(parseInt(profileId), userData.value)
    } else{
      updateUserData(undefined, userData.value)
    }
}

onMounted(async () => {
  try{
    if(profileId){
      fetchData(parseInt(profileId.toString()))
    } else{
      fetchData()
    }
    profileId == userId.value.toString() ? isOwner.value = true : isOwner.value = false
    listSkills()
    listHobbies()
  } catch (error){
    console.error(error)
  }
})
</script>

<template>
  <div class="profil">
    <div class="container">
      <h1 class="">At your service, {{ userData.name }}</h1>
      <ul class="p-8 list-disc">
        <li>switcher: editable</li>
        <li>JWT auth für persistenten login</li>
      </ul>
      <div class="grid grid-cols-2 gap-16">
        <div>
          <div class="avatar">
            <img src="~/assets/img/profile-male-red.png" alt="">
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
      <div class="skills">
        <h3>Prepared Spells</h3>
        <ul class="list-skills">
          <li class="item-skills grid grid-cols-2 gap-8" v-for="skill in userData.skills" :key="skill.name">
            <div class="w-max">{{ skill.name }}, {{ skill.level }}</div>
            <div class="grid grid-cols-5 gap-2">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </li>
        </ul>
        <Autocomplete :suggestions="allSkills.sort()" @submit-input="addNewSkill" />
      </div>
      <div class="personal">
        <h3>Hobbies</h3>
        <ul class="list-skills">
          <li class="item-skills" v-for="hobby in userData.hobbies" :key="hobby">
            <div class="w-max">{{ hobby }}</div>
          </li>
        </ul>
        <Autocomplete :suggestions="allHobbies.sort()" @submit-input="addNewHobby" />
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