export interface Question{
  id: number,
  owner: number,
  title: string,
  requiredSkills: string[],
  description: string,
  attemptedSolutions: string,
  isVisible: boolean,
  isSolved: boolean,
}

export const useQuestionData = () => {
  const questionsList = useState<Question[]>('questionsList', () => [])
  const question = useState<Question>('question', () => ({
    id: 0,
    owner: 0,
    title: "",
    requiredSkills: [],
    description: "",
    attemptedSolutions: "",
    isVisible: false,
    isSolved: false,
  }))

  const fetchQuestionData = async (id: number) => {
    try {
      const dataRequest: any = await $fetch('/api/data/getQuestionData', {
        method: 'POST',
        body: {
          id: id
        }
      })
      if(dataRequest.success && dataRequest.result){
        return { 
          question: ({
            id: dataRequest.result.id,
            owner: dataRequest.result.owner,
            title: dataRequest.result.title,
            requiredSkills: JSON.parse(dataRequest.result.requiredSkills),
            description: dataRequest.result.description,
            attemptedSolutions: dataRequest.result.attemptedSolutions,
            isVisible: !!dataRequest.result.isVisible,
            isSolved: !!dataRequest.result.isSolved
          })
        }
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

  const updateQuestionsList = async () => {
    try {
      const dataRequest: any = await $fetch('/api/data/getAllQuestionData', {
        method: 'POST',
        body: {}
      })
      if(dataRequest.success && dataRequest.result){
        questionsList.value = dataRequest.result.map((q: any) => ({
          id: q.id,
          owner: q.owner,
          title: q.title,
          requiredSkills: JSON.parse(q.requiredSkills),
          description: q.description,
          attemptedSolutions: q.attemptedSolutions,
          isVisible: !!q.isVisible,
          isSolved: !!q.isSolved
        }))
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
    question,
    questionsList, updateQuestionsList,
    fetchQuestionData
  }
};