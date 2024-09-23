import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  data: text("data").notNull(),
})

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey(),
  owner: integer("owner"),
  title: text("title"),
  goal: text("goal"),
  description: text("description"),
  requiredSkills: text("requiredSkills"),
  winCondition: text("winCondition"),
  whyAchieveable: text("whyAchieveable"),
  whyRelevant: text("whyRelevant"),
  deadline: text("deadline"),
  members: text("members"),
  resources: text("resources"),
  isLookingForMembers: integer("isLookingForMembers"),
  isVisible: integer("isVisible"),
  isDone: integer("isDone"),
})

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey(),
  owner: integer("owner"),
  title: text("title"),
  requiredSkills: text("requiredSkills"),
  description: text("description"),
  attemptedSolutions: text("attemptedSolutions"),
  isVisible: integer("isVisible"),
  isSolved: integer("isSolved"),
})

export const skills = sqliteTable("skills", {
  name: text("name").primaryKey(),
})
