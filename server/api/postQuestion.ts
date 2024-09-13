import { promises as fs } from 'fs'
import { join } from 'path'
import { getAllQuestionIds, postQuestion } from '../utils/db'

export default defineEventHandler(async (event) => {
  // get the data from the request body
  let body = await readBody(event)

  // set new id for the question: last used id + 1 or start at id 1
  let takenIds = getAllQuestionIds.all().map(q => q.id).length == 0 ? [0] : getAllQuestionIds.all().map(q => q.id)
  body.id = ++takenIds[takenIds.length - 1]

  // construct file path for the new question json
  const filePath = join(process.cwd(), 'content/frage', `${body.id}.json`)

  // stringify json data
  const jsonString = JSON.stringify(body, null, 2)

  // write the json data to the file
  try {
    await fs.writeFile(filePath, jsonString, 'utf-8')
    postQuestion.run({ id: body.id, owner: body.owner, data: JSON.stringify(body.data)})
    return { success: true, message: 'New wisdom lurks to be conceived.' }
  } catch (error) {
    console.error('Error writing file:', error);
    return { success: false, message: 'This nonsense was deemed unworthy of this sacred archives!' }
  }
})