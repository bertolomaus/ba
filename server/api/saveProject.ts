import { getAllProjectIds, createProject } from '../utils/db'

export default defineEventHandler(async (event) => {
  // get the data from the request body
  let body = await readBody(event)

  // set new id for the question: last used id + 1 or start at id 1
  let takenIds = getAllProjectIds.all().map(q => q.id).length == 0 ? [0] : getAllProjectIds.all().map(q => q.id)
  body.id = ++takenIds[takenIds.length - 1]

  try {
    createProject.run({
      id: body.id,
      owner: body.owner,
      title: body.title,
      goal: body.goal,
      description: body.description,
      requiredSkills: body.requiredSkills,
      winCondition: body.winCondition,
      whyAchieveable: body.whyAchieveable,
      whyRelevant: body.whyRelevant,
      deadline: body.deadline,
      members: body.members,
      resources: body.resources,
      isLookingForMembers: body.isLookingForMembers,
      isVisible: body.isVisible,
      isDone: body.isDone,
    })
    return { success: true }
  } catch (error) {
    console.error(error);
    return { success: false }
  }
})