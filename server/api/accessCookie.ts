export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = getCookie(event, body.name);

  if(result){
    return { result }
  }
  else{
    throw createError({
      statusCode: 400,
      statusMessage: 'No cookies found. Wizard probably forgot to conjure refreshments.',
    })
  }
});


