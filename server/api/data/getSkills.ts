import { getSkills } from "../../utils/db"

export default defineEventHandler(async () => {
  // get an array of all skills the system knows of so far
  // prepared statements -> ~/server/utils/db.ts
  const result = getSkills.all()
  return { result, success: true }
});
