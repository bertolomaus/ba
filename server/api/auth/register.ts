import { register } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // prepared statements -> ~/server/utils/db.ts
  const result = register.run({ id: body.id, username: body.username, password: body.password, data: '{name: "", projekte: []}' });
});
