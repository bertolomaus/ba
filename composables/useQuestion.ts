import { useState } from "nuxt/app"

export interface MatchingHelper{
  id: number
  commonSkills: string[]
}

export const useQuestion = () => {
  const allTags = useState<string[]>('allTags', () => [])
  return {}
}