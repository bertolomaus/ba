import { users } from "~/schema";
import { db } from "../utils/db"

export default defineEventHandler(async (event) => {
    
    db.insert(users).values({
        email: 'email',
        password: 'pw',
    })
    .execute();
})