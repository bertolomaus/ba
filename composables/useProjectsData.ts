import type { UserDataShort } from '~/composables/useUserData'

export interface Project{
  id: number,
  owner: number,
  title: string,
  requiredSkills: string[],
  description: string,
  members: UserDataShort[],
  resources: object[]
  isLookingForMembers: boolean,
  isVisible: boolean,
  isDone: boolean,
}

export const useProjectsData = () => {
  const projectsList = useState<Project[]>('projectsList', () => [])

  const fetchProjectData = async (id: number) => {
    try {
      const dataRequest = await $fetch('/api/data/getProjectData', {
        method: 'POST',
        body: {
          id: id
        }
      })
      if(dataRequest.success && dataRequest.result){
        return { 
          project: ({
            id: dataRequest.result.id,
            owner: dataRequest.result.owner,
            title: dataRequest.result.title,
            requiredSkills: JSON.parse(dataRequest.result.requiredSkills),
            description: dataRequest.result.description,
            members: JSON.parse(dataRequest.result.members),
            resources: JSON.parse(dataRequest.result.resources),
            isLookingForMembers: !!dataRequest.result.isLookingForMembers,
            isVisible: !!dataRequest.result.isVisible,
            isDone: !!dataRequest.result.isDone
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

  const updateProjectsList = async () => {
    try {
      const dataRequest = await $fetch('/api/data/getAllQuestionData', {
        method: 'POST',
        body: {}
      })
      if(dataRequest.success && dataRequest.result){
        projectsList.value = dataRequest.result.map((p: any) => ({
          id: p.result.id,
          owner: p.result.owner,
          title: p.result.title,
          requiredSkills: JSON.parse(p.result.requiredSkills),
          description: p.result.description,
          members: JSON.parse(p.result.members),
          resources: JSON.parse(p.result.resources),
          isLookingForMembers: !!p.result.isLookingForMembers,
          isVisible: !!p.result.isVisible,
          isDone: !!p.result.isDone
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
    projectsList, updateProjectsList,
    fetchProjectData
  }
};