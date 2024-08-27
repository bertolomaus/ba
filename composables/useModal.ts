export const useModal = () => {
  const showModal = useState<boolean>('showModal', () => false)
  const modalAskQuestion = useState<boolean>('modalAskQuestion', () => false)

  const toggleModal = () => {
    showModal.value = !showModal.value
  }

  const modalShowAskQuestion = () => {
    showModal.value = true
    modalAskQuestion.value = true
  }

  return {
    toggleModal, showModal,
    modalShowAskQuestion, modalAskQuestion
  }
};