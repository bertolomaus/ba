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
  username: sql.placeholder('username'),
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
.where(sql`${users.username} = ${sql.placeholder("username")}`)

export const getUserDataById = db
  .select({
    data: users.data,
  })
  .from(users)
  .where(sql`${users.id} = ${sql.placeholder("id")}`)

export const getUsernameAndId = db
  .select({
    id: users.id,
    username: users.username,
  })
  .from(users)
  .where(sql`${users.username} = ${sql.placeholder("username")} OR ${users.id} = ${sql.placeholder("id")}`)

export const updateUserData = db
  .update(users)
  .set({
    data: sql`${sql.placeholder("data")}`
  })
  .where(sql`${users.id} = ${sql.placeholder("id")}`)
