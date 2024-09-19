export const useModal = () => {
  const showModal = useState<boolean>('showModal', () => false)
  const modalNewQuestion = useState<boolean>('modalNewQuestion', () => false)
  const modalNewProject = useState<boolean>('modalNewProject', () => false)
  const { showSidebar } = useToggleContent()

  const toggleModal = () => {
    showModal.value = !showModal.value
    showSidebar.value = false
  }

  const modalShowNewQuestion = () => {
    showModal.value = true
    modalNewQuestion.value = true
    showSidebar.value = false
  }

  const modalShowNewProject = () => {
    showModal.value = true
    modalNewProject.value = true
    showSidebar.value = false
  }

  return {
    toggleModal, showModal,
    modalShowNewQuestion, modalNewQuestion,
    modalShowNewProject, modalNewProject
  }
};