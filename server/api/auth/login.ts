import { users } from "~/schema";
import { db, prepLogin } from "../../utils/db";
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = prepLogin.get({username: body.username, password: body.username})

  return result
});


