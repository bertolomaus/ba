import { getAllUserData } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // get the data attribute from every registered user
  // prepared statements -> ~/server/utils/db.ts
  const result = getAllUserData.all().map(obj => ({id: obj.id, ...JSON.parse(obj.data)}))
  return { result, success: true }
});
