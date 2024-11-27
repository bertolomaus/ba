export const useSkills = () => {
  const allSkills = useState<string[]>('allSkills', () => [])

  const getSkills = async () => {
    const skillsRequest = await $fetch('/api/getSkills')
    allSkills.value = skillsRequest.result
  }

  const setSkills = async (skills: string[]) => {
    await $fetch('/api/setSkills', {
      method: 'POST',
      body: {
        skills: skills
      }
    })
  }

  return { allSkills, getSkills, setSkills }
}