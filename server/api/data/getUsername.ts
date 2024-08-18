import { getUsernameAndId } from "../../utils/db"
import { ref } from "vue"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // prepared statements -> ~/server/utils/db.ts
  const result = getUsernameAndId.get({ username: body.username, id: body.id });
  let matchingIdFound = false
  let matchingNameFound = false

  if(result){
    if(result.id == body.id){
      matchingIdFound = true
    }
    if(result.username == body.username){
      matchingNameFound = true
    }
    return { matchFound: true, matchingIdFound, matchingNameFound, result }
  }
  else{
    return { matchFound: false, matchingIdFound, matchingNameFound }
  }
});
