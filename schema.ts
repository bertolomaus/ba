import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  data: text("data"),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey(),
  owner: integer("owner").notNull(),
  data: text("data"),
});

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey(),
  owner: integer("owner").notNull(),
  data: text("data"),
});
