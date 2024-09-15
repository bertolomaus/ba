export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  // get the data attribute from every registered user
  // prepared statements -> ~/server/utils/db.ts
  const result = getAllQuestionListData.all()
  console.log(result)
  return { result, success: true }
});
