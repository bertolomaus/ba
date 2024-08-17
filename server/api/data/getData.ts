import { getUserData } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // check if valid id is requesten. 0 is not valid.
  if(body.id != 0){
    // prepared statements -> ~/server/utils/db.ts
    const result = getUserData.get({ id: body.id });
    return { result, success: true };    
  } else {
    // Invalid user id
    throw createError({
      statusCode: 403,
      statusMessage: 'We do not share secrets with strangers.'
    });
  }
});
