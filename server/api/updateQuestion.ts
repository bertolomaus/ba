import { updateQuestion } from '../utils/db'

export default defineEventHandler(async (event) => {
  // get the data from the request body
  let body = await readBody(event)

  try {
    // prepared statements -> utils/db.ts
    updateQuestion.run({
      id: body.id,
      owner: body.data.owner,
      title: body.data.title,
      requiredSkills: JSON.stringify(body.data.requiredSkills),
      description: body.data.description,
      attemptedSolutions: body.data.attemptedSolutions,
      isVisible: body.data.isVisible ? 1 : 0,
      isSolved: body.data.isSolved ? 1 : 0,
    })
    return { success: true }
  } catch (error) {
    console.error(error);
    return { success: false }
  }
})