export const useModal = () => {
  const showModal = useState<boolean>('showModal', () => false)
  const modalAskQuestion = useState<boolean>('modalAskQuestion', () => false)
  const { showSidebar } = useToggleContent()

  const toggleModal = () => {
    showModal.value = !showModal.value
    showSidebar.value = false
  }

  const modalShowAskQuestion = () => {
    showModal.value = true
    modalAskQuestion.value = true
    showSidebar.value = false
  }

  return {
    toggleModal, showModal,
    modalShowAskQuestion, modalAskQuestion
  }
};