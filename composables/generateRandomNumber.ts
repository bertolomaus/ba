export const generateNumber = (length: number) => {
  const charPool = '0123456789'
  const newId = ref<string>('')

  for(let i = 0; i < length; i++){
    newId.value = newId.value + charPool.charAt(Math.floor(Math.random() * 10))
  }

  return parseInt(newId.value)
}