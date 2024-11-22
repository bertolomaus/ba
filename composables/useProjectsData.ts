import type { UserDataShort } from '~/composables/useUserData'

export interface Project{
  id: number,
  owner: number,
  title: string,
  requiredSkills: string[],
  description: string,
  goal: string,
  winCondition: string,
  whyAchieveable: string,
  whyRelevant: string,
  deadline: string,
  members: UserDataShort[],
  resources: Resource[],
  isLookingForMembers: boolean,
  isVisible: boolean,
  isDone: boolean,
}

export interface ProjectShort{
  id: number,
  owner: number,
  title: string,
}

export interface Resource{
  name: string,
  src: string
}

export const useProjectsData = () => {
  const projectsList = useState<Project[]>('projectsList', () => [])
  const project = useState<Project>('project', () => ({
    id: 0,
    owner: 0,
    title: "",
    requiredSkills: [],
    description: "",
    goal: "",
    winCondition: "",
    whyAchieveable: "",
    whyRelevant: "",
    deadline: "",
    members: [],
    resources: [],
    isLookingForMembers: false,
    isVisible: false,
    isDone: false
  }))
  const members = ref<UserDataShort[]>([])

  const fetchProjectData = async (id: number) => {
    try {
      const dataRequest: any = await $fetch('/api/data/getProjectData', {
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
            goal: dataRequest.result.goal,
            winCondition: dataRequest.result.winCondition,
            whyAchieveable: dataRequest.result.whyAchieveable,
            whyRelevant: dataRequest.result.whyRelevant,
            deadline: dataRequest.result.deadline,
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
      const dataRequest: any = await $fetch('/api/data/getAllProjectsData', {
        method: 'POST',
        body: {}
      })
      if(dataRequest.success && dataRequest.result){
        projectsList.value = dataRequest.result.map((p: any) => ({
          id: p.id,
          owner: p.owner,
          title: p.title,
          requiredSkills: JSON.parse(p.requiredSkills),
          description: p.description,
          goal: p.goal,
          winCondition: p.winCondition,
          whyAchieveable: p.whyAchieveable,
          whyRelevant: p.whyRelevant,
          deadline: p.deadline,
          members: JSON.parse(p.members),
          resources: JSON.parse(p.resources),
          isLookingForMembers: !!p.isLookingForMembers,
          isVisible: !!p.isVisible,
          isDone: !!p.isDone
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

  const fetchMembers = async (ids: number[] = []) => {
    for(let id of ids){
      try{
        let memberRequest: any = await $fetch('/api/data/getUserData', {
          method: 'POST',
          body: {
            id: id,
          }
        })
        memberRequest = JSON.parse(memberRequest.result.data)
        members.value.push({
          name: memberRequest.name,
          id: id,
          avatar: memberRequest.avatar,
          skills: memberRequest.skills,
        })
      } catch (error){
        console.error(error)
      }
    }
    return members.value
  }

  const clearCurrentProjectData = () => {
    project.value  = {
      id: 0,
      owner: 0,
      title: "",
      requiredSkills: [],
      description: "",
      goal: "",
      winCondition: "",
      whyAchieveable: "",
      whyRelevant: "",
      deadline: "",
      members: [],
      resources: [],
      isLookingForMembers: false,
      isVisible: false,
      isDone: false
    }
  }

  return {
    project,
    projectsList, updateProjectsList,
    fetchProjectData,
    fetchMembers,
    clearCurrentProjectData
  }
};