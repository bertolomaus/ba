import { useState } from "nuxt/app"

export const useQuestion = () => {
  const allTags = useState<string[]>('allTags', () => [])
  return {}
}