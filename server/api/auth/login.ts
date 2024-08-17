import { prepLogin } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // prepared statements -> ~/server/utils/db.ts
  const result = prepLogin.get({ username: body.username });

  // check if user exists and password is correct
  if (result && result?.password == body.password) {
    const cookieData = {
      id: result.id,
      data: result.data,
    };

    setCookie(event, "auth", JSON.stringify(cookieData), {
      // cookie is only accessible by the server
      httpOnly: true,
      // CSRF protection
      sameSite: "lax",
      // Use HTTPS in production
      secure: process.env.NODE_ENV === "production",
      // cookie is accessible on all routes
      path: "/",
      // cookie expires in 7 days
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } else {
    // Invalid credentials
    throw createError({
      statusCode: 401,
      statusMessage: "Cursed Email or Password",
    });
  }
});
