import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { sql } from "drizzle-orm"
import { users, projects, questions, skills } from "~/schema"

const sqlite = new Database("sqlite.db")
export const db = drizzle(sqlite)

// +++ prepared statements +++
// users
export const register = db
.insert(users)
.values({
  id: sql.placeholder('id'),
  email: sql.placeholder('email'),
  password: sql.placeholder('password'),
  data: sql.placeholder('data'),
})

export const getLoginData = db
.select({
  id: users.id,
  password: users.password,
  data: users.data,
})
.from(users)
.where(sql`${users.email} = ${sql.placeholder("email")}`)

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

export const getAllUserIds = db
.select({
  id: users.id,
})
.from(users)

export const getAllUserData = db
.select({
  id: users.id,
  data: users.data,
})
.from(users)


// questions
export const postQuestion = db
.insert(questions)
.values({
  id: sql.placeholder('id'),
  owner: sql.placeholder('owner'),
  title: sql.placeholder('title'),
  requiredSkills: sql.placeholder('requiredSkills'),
  description: sql.placeholder('description'),
  attemptedSolutions: sql.placeholder('attemptedSolutions'),
  isVisible: sql.placeholder('isVisible'),
  isSolved: sql.placeholder('isSolved'),
})

export const getAllQuestionIds = db
.select({
  id: questions.id
})
.from(questions)

export const getAllQuestionListData = db
.select({
  id: questions.id,
  owner: questions.owner,
  title: questions.title,
  requiredSkills: questions.requiredSkills,
  description: questions.description,
  attemptedSolutions: questions.attemptedSolutions,
  isVisible: questions.isVisible,
  isSolved: questions.isSolved,
})
.from(questions)

export const getQuestionData = db
.select({
  id: questions.id,
  owner: questions.owner,
  title: questions.title,
  requiredSkills: questions.requiredSkills,
  description: questions.description,
  attemptedSolutions: questions.attemptedSolutions,
  isVisible: questions.isVisible,
  isSolved: questions.isSolved,
})
.from(questions)
.where(sql`${questions.id} = ${sql.placeholder("id")}`)


// projects
export const createProject = db
.insert(projects)
.values({
  id: sql.placeholder('id'),
  owner: sql.placeholder('owner'),
  title: sql.placeholder('title'),
  requiredSkills: sql.placeholder('requiredSkills'),
  description: sql.placeholder('description'),
  members: sql.placeholder('members'),
  resources: sql.placeholder('resources'),
  isLookingForMembers: sql.placeholder('isLookingForMembers'),
  isVisible: sql.placeholder('isVisible'),
  isDone: sql.placeholder('isSolved'),
})

export const getAllProjectIds = db
.select({
  id: projects.id
})
.from(projects)

export const getAllProjectsListData = db
.select({
  id: projects.id,
  owner: projects.owner,
  title: projects.title,
  requiredSkills: projects.requiredSkills,
  description: projects.description,
  members: projects.members,
  resources: projects.resources,
  isLookingForMembers: projects.isVisible,
  isVisible: projects.isVisible,
  isDone: projects.isDone,
})
.from(questions)

export const getProjectData = db
.select({
  id: projects.id,
  owner: projects.owner,
  title: projects.title,
  requiredSkills: projects.requiredSkills,
  description: projects.description,
  members: projects.members,
  resources: projects.resources,
  isLookingForMembers: projects.isVisible,
  isVisible: projects.isVisible,
  isDone: projects.isDone,
})
.from(projects)
.where(sql`${projects.id} = ${sql.placeholder("id")}`)

// skills

export const getSkills = db
.select({
  name: skills.name
})
.from(skills)


export const setSkill = db
.insert(skills)
.values({
  name: sql.placeholder('name'),
})