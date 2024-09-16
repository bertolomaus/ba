import { getQuestionData } from "../../utils/db";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);

  // check if valid id is requested. 0 is not valid.
  if(body.id != 0){
    // prepared statements -> ~/server/utils/db.ts
    const result = getQuestionData.get({ id: body.id });
    return { result, success: true };    
  } else {
    // Invalid question id
    throw createError({
      statusCode: 403,
      statusMessage: 'You are talking crazy gibberish. Noone has ever asked such nonsense!'
    });
  }
});
