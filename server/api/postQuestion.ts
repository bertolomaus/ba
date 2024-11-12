import { getAllQuestionIds, postQuestion } from '../utils/db'

export default defineEventHandler(async (event) => {
  // get the data from the request body
  let body = await readBody(event)

  // set new id for the question: last used id + 1 or start at id 1
  let takenIds = getAllQuestionIds.all().map(q => q.id).length == 0 ? [0] : getAllQuestionIds.all().map(q => q.id)
  const newId = ++takenIds[takenIds.length - 1]

  try {
    postQuestion.run({ 
      id: newId,
      owner: body.data.owner,
      title: body.data.title,
      requiredSkills: JSON.stringify(body.data.requiredSkills),
      description: body.data.description,
      attemptedSolutions: body.data.attemptedSolutions,
      isVisible: body.data.isVisible ? 1 : 0,
      isSolved: body.data.isSolved ? 1 : 0
    })
    return { success: true, id: newId }
  } catch (error) {
    console.error(error);
    return { success: false }
  }
})