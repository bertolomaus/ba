import { getAllQuestionIds, postQuestion } from '../utils/db'

export default defineEventHandler(async (event) => {
  // get the data from the request body
  let body = await readBody(event)

  // set new id for the question: last used id + 1 or start at id 1
  let takenIds = getAllQuestionIds.all().map(q => q.id).length == 0 ? [0] : getAllQuestionIds.all().map(q => q.id)
  body.id = ++takenIds[takenIds.length - 1]

  try {
    postQuestion.run({ 
      id: body.id,
      owner: body.owner,
      title: body.title,
      requiredSkills: body.requiredSkills,
      description: body.description,
      attemptedSolutions: body.attemptedSolutions,
      isVisible: body.isVisible,
      isSolved: body.isSolved
    })
    return { success: true }
  } catch (error) {
    console.error(error);
    return { success: false }
  }
})