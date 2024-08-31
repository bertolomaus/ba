<script lang="ts" setup>
import Autocomplete from '../components/Autocomplete.vue'

const route = useRoute()
const { userId } = useAuth()
const profileId = route.query.wizard
const { userData, fetchData, listSkills, listHobbies, allSkills, allHobbies } = useData()
const isOwner = ref<boolean>(false)
const addHobby = ref<string>('')

const addNewSkill = (eventPayload: { payload: string }) => {
  userData.value.skills.push({name: eventPayload.payload, level: 0})
  console.log(userData.value)
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
        <li>speichern-button: speichere data-json, update in datenbank</li>
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
            <div class="w-max">{{ skill.name }}</div>
            <div>Skilllevel: {{  skill.level }}</div>
          </li>
        </ul>
        <Autocomplete :suggestions="allSkills.sort()" @submit-input="addNewSkill" />

        <ul class="p-8 list-disc">
          <li>on mounted: load all skills in an array</li>
          <li>on key up: if length >= 2: check if input value is contained in any skill array value</li>
          <li>div mit allen vorschlägen unterhalb vom input field</li>
          <li>vielleicht input > select, und searchable? https://stackoverflow.com/questions/18796221/creating-a-select-box-with-a-search-option</li>
          <li>durchtabben / on enter: add skill zu skills json; erzeuge neues element mit name & level; clear input</li>
        </ul>
        <div class="btn w-max my-4" @click="listSkills">Get Data</div>
      </div>
      <div class="personal">
        <h3>Hobbies</h3>
        <input placeholder="Add Hobby" name="addHobby" v-model="addHobby" />
        <ul class="p-8 list-disc">
          <li>on mounted: load all hobbies in an array</li>
          <li>on key up: if length >= 2: check if input value is contained in any hobby array value</li>
          <li>div mit allen vorschlägen unterhalb vom input field</li>
          <li>vielleicht input > select, und searchable?</li>
          <li>durchtabben / on enter: add hobby zu hobbies json; erzeuge neues tag; clear input</li>
        </ul>
      </div>
      <div class="bio">
        <h3>Bio</h3>
        <textarea placeholder="Bio" name="bio" v-model="userData.bio"></textarea>
      </div>
      <pre class="mt-16">{{ userData }}</pre>
      <pre>{{ allSkills }}</pre>
    </div>
  </div>
</template>