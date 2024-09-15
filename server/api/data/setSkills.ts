import { setSkill } from "../../utils/db";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event)
  body.skills.forEach((skill: string) => {
    console.log(skill)
    try{
      setSkill.run({name: skill})
    } catch (error){
      console.error(error)
    }
  })
})