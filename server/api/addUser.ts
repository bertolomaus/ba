import { users } from "~/schema";
import { db } from "../utils/db"
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    
    db.insert(users).values({
        email: body.email,
        password: body.password,
    })
    .execute();

    return {};
})