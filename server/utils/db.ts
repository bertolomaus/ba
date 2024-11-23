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

export const deleteUser = db
.delete(users)
.where(sql`${users.id} = ${sql.placeholder("id")}`)


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

export const updateQuestion = db
.update(questions)
.set({
  id: sql.placeholder('id'),
  owner: sql.placeholder('owner'),
  title: sql.placeholder('title'),
  requiredSkills: sql.placeholder('requiredSkills'),
  description: sql.placeholder('description'),
  attemptedSolutions: sql.placeholder('attemptedSolutions'),
  isVisible: sql.placeholder('isVisible'),
  isSolved: sql.placeholder('isSolved'),
})
.where(sql`${questions.id} = ${sql.placeholder("id")}`)

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

export const deleteQuestions = db
.delete(questions)
.where(sql`${questions.owner} = ${sql.placeholder("id")}`)


// projects
export const createProject = db
.insert(projects)
.values({
  id: sql.placeholder('id'),
  owner: sql.placeholder('owner'),
  title: sql.placeholder('title'),
  goal: sql.placeholder('goal'),
  requiredSkills: sql.placeholder('requiredSkills'),
  description: sql.placeholder('description'),
  winCondition: sql.placeholder('winCondition'),
  whyAchieveable: sql.placeholder('whyAchieveable'),
  whyRelevant: sql.placeholder('whyRelevant'),
  deadline: sql.placeholder('deadline'),
  members: sql.placeholder('members'),
  resources: sql.placeholder('resources'),
  isLookingForMembers: sql.placeholder('isLookingForMembers'),
  isVisible: sql.placeholder('isVisible'),
  isDone: sql.placeholder('isDone'),
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
  goal: projects.goal,
  requiredSkills: projects.requiredSkills,
  description: projects.description,
  winCondition: projects.winCondition,
  whyAchieveable: projects.whyAchieveable,
  whyRelevant: projects.whyRelevant,
  deadline: projects.deadline,
  members: projects.members,
  resources: projects.resources,
  isLookingForMembers: projects.isLookingForMembers,
  isVisible: projects.isVisible,
  isDone: projects.isDone,
})
.from(projects)

export const getProjectData = db
.select({
  id: projects.id,
  owner: projects.owner,
  title: projects.title,
  requiredSkills: projects.requiredSkills,
  description: projects.description,
  goal: projects.goal,
  winCondition: projects.winCondition,
  whyAchieveable: projects.whyAchieveable,
  whyRelevant: projects.whyRelevant,
  deadline: projects.deadline,
  members: projects.members,
  resources: projects.resources,
  isLookingForMembers: projects.isVisible,
  isVisible: projects.isVisible,
  isDone: projects.isDone,
})
.from(projects)
.where(sql`${projects.id} = ${sql.placeholder("id")}`)

export const updateProject = db
.update(projects)
.set({
  owner: sql`${sql.placeholder("owner")}`,
  title: sql`${sql.placeholder("title")}`,
  requiredSkills: sql`${sql.placeholder("requiredSkills")}`,
  description: sql`${sql.placeholder("description")}`,
  goal: sql`${sql.placeholder("goal")}`,
  winCondition: sql`${sql.placeholder("winCondition")}`,
  whyAchieveable: sql`${sql.placeholder("whyAchieveable")}`,
  whyRelevant: sql`${sql.placeholder("whyRelevant")}`,
  deadline: sql`${sql.placeholder("deadline")}`,
  members: sql`${sql.placeholder("members")}`,
  resources: sql`${sql.placeholder("resources")}`,
  isVisible: sql`${sql.placeholder("isVisible")}`,
  isLookingForMembers: sql`${sql.placeholder("isLookingForMembers")}`,
  isDone: sql`${sql.placeholder("isDone")}`,
})
.where(sql`${projects.id} = ${sql.placeholder("id")}`)

export const deleteProjects = db
.delete(projects)
.where(sql`${projects.owner} = ${sql.placeholder("id")}`)

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