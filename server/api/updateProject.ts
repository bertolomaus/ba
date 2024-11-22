import { updateProject } from '../utils/db'

export default defineEventHandler(async (event) => {
  // get the data from the request body
  let body = await readBody(event)

  try {
    // prepared statements -> utils/db.ts
    updateProject.run({
      id: body.id,
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
      isVisible: body.data.isVisible ? 1 : 0,
      isLookingForMembers: body.data.isLookingForMembers ? 1 : 0,
      isDone: body.data.isDone ? 1 : 0,
    })
    return { success: true }
  } catch (error) {
    console.error(error);
    return { success: false }
  }
})