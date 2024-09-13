import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  data: text("data").notNull(),
})

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey(),
  owner: integer("owner").notNull(),
  data: text("data").notNull(),
})

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey(),
  owner: integer("owner").notNull(),
  title: text("title").notNull(),
  requiredSkills: text("requiredSkills").notNull(),
  description: text("description").notNull(),
  attemptedSolutions: text("attemptedSolutions").notNull(),
  isVisible: integer("isVisible"),
  isSolved: integer("isSolved"),
})
