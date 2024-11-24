import { getLoginDataById, updateLoginData } from "../../utils/db"

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event)

  // prepared statements -> ~/server/utils/db.ts
  const result = getLoginDataById.get({ id: body.id })

  // check if user exists and password is correct
  if (result && result?.password == body.pwOld) {
    updateLoginData.run({ password: body.pwNew, id: body.id })
    return { success: true }
  } else {
    // Invalid credentials
    throw createError({
      statusCode: 401,
      statusMessage: "Cursed Password",
    });
  }
});
