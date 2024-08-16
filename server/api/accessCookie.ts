import { useCookie } from "nuxt/app";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = useCookie(body.name);
  return result
});


