import { ref } from "vue"
import { UserData, UserDataShort } from "~/composables/useUserData"

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  // get the id of all users that have at least 1 matching skill
  // prepared statements -> ~/server/utils/db.ts
  const results = getAllUserData.all()
  let matches: UserDataShort[] = []

  results.forEach((result) => {
    let data: UserData  = JSON.parse(result.data)
    let skills: string[] = data.skills.map((skill) => skill.name)
    let commonSkills = skills.filter(value => body.skills.includes(value))

    if(commonSkills.length > 0){
      matches.push({id: result.id, skills: commonSkills, name: data.name, avatar: data.avatar})
    }
  })


  return { matches, success: true }
});
