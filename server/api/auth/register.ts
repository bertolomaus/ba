import { users } from "~/schema";
import { db } from "../../utils/db";
export default defineEventHandler(async (event) => {
  try {
    const dbResponse = db.insert(users).values({id: 12345, username: "test user 1", password: "password"}).run();

    return { result : dbResponse };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});