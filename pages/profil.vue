<script lang="ts" setup>

const route = useRoute()
const { userId } = useAuth()
const urlQuery = route.query.wizard
const { userData, fetchData, fetchAllData, listSkills } = useData()
const isOwner = ref<boolean>(false)

onMounted(() => {
  fetchData()
  urlQuery == userId.value.toString() ? isOwner.value = true : isOwner.value = false
})
</script>

<template>
  <div class="profil">
    <div class="container">
      <h1 class="">At your service, {{ userData.name }}</h1>
      <div class="grid grid-cols-2 gap-16">
        <div>
          <div class="avatar">
            <img src="~/assets/img/profile-male-red.png" alt="">
          </div>
        </div>
        <div>
          <div class="name">
            <label for="name">Anzeigename</label>
            <input placeholder="Name" name="name" v-model="userData.name" />
          </div>
          <div class="status">
            <h3>Status</h3>
            <textarea placeholder="Status" name="status" v-model="userData.name"></textarea>
          </div>
        </div>
      </div>
      <div class="skills">
        <h3>Prepared Spells</h3>
        <input placeholder="Add Skill" name="addSkill" v-model="userData.name" />
        <div class="btn w-max" @click="listSkills">Get Data</div>
      </div>
      <div class="personal">
        <h3>Hobbies</h3>
        <input placeholder="Add Hobby" name="addHobby" v-model="userData.name" />
      </div>
      <div class="bio">
        <h3>Bio</h3>
        <textarea placeholder="Bio" name="bio" v-model="userData.name"></textarea>
      </div>
      <pre>{{ userData }}</pre>
    </div>
  </div>
</template>