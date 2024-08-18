import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { sql } from "drizzle-orm"
import { users } from "~/schema"

const sqlite = new Database("sqlite.db")
export const db = drizzle(sqlite)

// prepared statements
export const register = db
.insert(users)
.values({
  id: sql.placeholder('id'),
  email: sql.placeholder('email'),
  password: sql.placeholder('password'),
  data: sql.placeholder('data'),
})

export const login = db
.select({
  id: users.id,
  password: users.password,
  data: users.data,
})
.from(users)
.where(sql`${users.email} = ${sql.placeholder("username")}`)

export const getUserDataById = db
  .select({
    data: users.data,
  })
  .from(users)
  .where(sql`${users.id} = ${sql.placeholder("id")}`)

export const getUniqueKeys = db
  .select({
    id: users.id,
    email: users.email,
  })
  .from(users)
  .where(sql`${users.email} = ${sql.placeholder("email")} OR ${users.id} = ${sql.placeholder("id")}`)

export const updateUserData = db
  .update(users)
  .set({
    data: sql`${sql.placeholder("data")}`
  })
  .where(sql`${users.id} = ${sql.placeholder("id")}`)
