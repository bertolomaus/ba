export const useAskQuestion = () => {
  const aqWhatever = useState<boolean>('aqWhatever', () => false)

  const toggleAQ = () => {
    aqWhatever.value = !aqWhatever.value
  }

  return {
    aqWhatever
  }
};