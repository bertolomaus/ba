import { getUserData } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // prepared statements -> ~/server/utils/db.ts
  const result = getUserData.get({ id: body.id });

  // check if user exists and password is correct
  if (result) {
    return { result, success: true };
  } else {
    // Invalid credentials
    throw createError({
      statusCode: 404,
    });
  }
});
