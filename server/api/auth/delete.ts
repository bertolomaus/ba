import { getLoginData, deleteProjects, deleteQuestions, deleteUser } from "../../utils/db"

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event)

  // prepared statements -> ~/server/utils/db.ts
  const result = getLoginData.get({ email: body.email })
  console.log(result?.id);

  // check if user exists and password is correct
  if (result && result?.password == body.password) {
    deleteUser.run({ id: result.id })
    deleteProjects.run({ id: result.id })
    deleteQuestions.run({ id: result.id })

    return {success: true}
    
  } else {
    // Invalid credentials
    throw createError({
      statusCode: 401,
      statusMessage: "Cursed Email or Password",
    });
  }
});
