export default defineEventHandler(async (event: any) => {
  // prepared statements -> ~/server/utils/db.ts
  const result = getAllQuestionListData.all()
  return { result, success: true }
});
