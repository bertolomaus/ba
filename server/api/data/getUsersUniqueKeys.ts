import { getUniqueKeys } from "../../utils/db"

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);

  // prepared statements -> ~/server/utils/db.ts
  const result = getUniqueKeys.get({ email: body.email, id: body.id });
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
