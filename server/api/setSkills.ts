import { setSkill } from "../utils/db";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event)
  body.skills.forEach((skill: string) => {
    try{
      setSkill.run({name: skill})
    } catch (error){
    }
  })
})