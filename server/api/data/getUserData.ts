import { getUserDataById } from "../../utils/db"

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);

  // check if valid id is requesten. 0 is not valid.
  if(body.id != 0){
    // prepared statements -> ~/server/utils/db.ts
    const result = getUserDataById.get({ id: body.id })
    return { result, success: true }
  } else {
    // Invalid user id
    throw createError({
      statusCode: 403,
      statusMessage: 'Ye be unbeknownst to us. Be gone, stranger!'
    })
  }
})
