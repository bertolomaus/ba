export interface QuestionListItem{
  id: number,
  title: string,
  requiredSkills: string[],
  isVisible: boolean,
  isSolved: boolean,
}

export interface Question{
  id: number,
  owner: string,
  title: string,
  requiredSkills: string[],
  description: string,
  attemptedSolutions: string,
  isVisible: boolean,
  isSolved: boolean,
}

export const useQuestionData = () => {
  const questionsList = useState<QuestionListItem[]>('allQuestions', () => [])

  const updateQuestionsList = async () => {
    try {
      const dataRequest = await $fetch('/api/data/getAllQuestionListData', {
        method: 'POST',
        body: {}
      })
      if(dataRequest.success && dataRequest.result){
        console.log(dataRequest.result)
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "There's a fracture in the Weave. Roll Arcana to investigate.",
        })
      }
    }
    catch (error) {
      console.error('Error while fetching data:', error)
    }
  }

  return {
    questionsList, updateQuestionsList
  }
};