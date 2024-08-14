import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { sql } from "drizzle-orm";
import { users } from "~/schema";

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);

export const prepLogin = db
  .select({
    id: users.id,
    data: users.data,
  })
  .from(users)
  .where(sql`${users.username} = ${sql.placeholder('username')} and ${users.password} = ${sql.placeholder('password')}`)