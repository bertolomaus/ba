export const useModal = () => {
  const modalOpen = useState<boolean>('modalOpen', () => false)
  const modalAskQuestion = useState<boolean>('modalAskQuestion', () => false)

  const toggleModal = () => {
    modalOpen.value = !modalOpen.value
  }

  const modalShowAskQuestion = () => {
    modalOpen.value = true
    modalAskQuestion.value = true
  }

  return {
    toggleModal, modalOpen,
    modalShowAskQuestion, modalAskQuestion
  }
};