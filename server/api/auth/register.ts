import { register, getAllUserIds } from "../../utils/db"
import { generateNumber } from '~/composables/generateRandomNumber'

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event)
  // const { login } = useAuth()

  // get all currently used IDs, randomly generate a new ID and check if newId is available. if not, re-generate newId until one is free
  const takenIds = getAllUserIds.all().map(user => user.id)
  let newId = generateNumber(8)
  
  while(takenIds.includes(newId)){
    newId = generateNumber(8)
  }

  // prepared statements -> ~/server/utils/db.ts
  register.run({ id: newId, email: body.email, password: body.password, data: '{"name":"","avatar":"profile-mr-dark.png","contact":[],"status":"","skills":[],"hobbies":[],"bio":"","projects":[],"questions":[],"projectsVisited":[],"questionsVisited":[]}'})
  return {success: true, id: newId}
});
