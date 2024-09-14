import { getLoginData } from "../../utils/db"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // prepared statements -> ~/server/utils/db.ts
  const result = getLoginData.get({ email: body.email })

  // check if user exists and password is correct
  if (result && result?.password == body.password) {
    const userId = result.id
    return { userId, success: true };
  } else {
    // Invalid credentials
    throw createError({
      statusCode: 401,
      statusMessage: "Cursed Email or Password",
    });
  }
});
