import { getAllProjectIds, createProject } from '../utils/db'

export default defineEventHandler(async (event) => {
  // get the data from the request body
  let body = await readBody(event)

  // set new id for the question: last used id + 1 or start at id 1
  let takenIds = getAllProjectIds.all().map(q => q.id).length == 0 ? [0] : getAllProjectIds.all().map(q => q.id)
  const newId = ++takenIds[takenIds.length - 1]

  try {
    createProject.run({
      id: newId,
      owner: body.data.owner,
      title: body.data.title,
      goal: body.data.goal,
      description: body.data.description,
      requiredSkills: JSON.stringify(body.data.requiredSkills),
      winCondition: body.data.winCondition,
      whyAchieveable: body.data.whyAchieveable,
      whyRelevant: body.data.whyRelevant,
      deadline: body.data.deadline,
      members: JSON.stringify(body.data.members),
      resources: JSON.stringify(body.data.resources),
      isLookingForMembers: body.data.isLookingForMembers ? 1 : 0,
      isVisible: body.data.isVisible ? 1 : 0,
      isDone: body.data.isDone ? 1 : 0,
    })
    return { success: true }
  } catch (error) {
    console.error(error);
    return { success: false }
  }
})