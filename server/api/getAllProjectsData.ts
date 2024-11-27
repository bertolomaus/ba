import { getAllProjectsListData } from "../utils/db"

export default defineEventHandler(async (event: any) => {
  // prepared statements -> ~/server/utils/db.ts
  const result = getAllProjectsListData.all()
  return { result, success: true }
})
