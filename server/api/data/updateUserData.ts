import { updateUserData, getUserDataById } from "../../utils/db";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);

  // check if valid id is requesten. 0 is not valid.
  if(body.id != 0 && body.data){

    // prepared statements -> ~/server/utils/db.ts
    // update user data and return updated data as a string
    updateUserData.run({ id: body.id, data: body.data });
    const result = getUserDataById.get({ id: body.id });

    return { result, success: true };
  } else {
    // Invalid user id or no data object
    throw createError({
      statusCode: 403,
      statusMessage: 'No such foolery shall enter our halls!'
    });
  }
});
