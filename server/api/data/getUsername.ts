import { getEmailAndId as getEmailAndId } from "../../utils/db"
import { ref } from "vue"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // prepared statements -> ~/server/utils/db.ts
  const result = getEmailAndId.get({ email: body.email, id: body.id });
  let matchingIdFound = false
  let matchingEmailFound = false

  if(result){
    if(result.id == body.id){
      matchingIdFound = true
    }
    if(result.email == body.email){
      matchingEmailFound = true
    }
    return { matchFound: true, matchingIdFound, matchingEmailFound, result }
  }
  else{
    return { matchFound: false, matchingIdFound, matchingEmailFound }
  }
});
