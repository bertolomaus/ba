export const useModal = () => {
  const showModal = useState<boolean>("showModal", () => false);
  const modalNewQuestion = useState<boolean>("modalNewQuestion", () => false);
  const modalNewProject = useState<boolean>("modalNewProject", () => false);
  const { showSidebar } = useToggleContent();
  const { clearCurrentQuestionData } = useQuestionData();
  const { clearCurrentProjectData } = useProjectsData();

  const toggleModal = () => {
    showModal.value = !showModal.value;
    showSidebar.value = false;
  };

  const openBlank = () => {
    showModal.value = true;
    showSidebar.value = false;
    modalNewProject.value = false;
    modalNewQuestion.value = false;
  };

  const modalShowNewQuestion = () => {
    openBlank();
    clearCurrentQuestionData();
    modalNewQuestion.value = true;
  };

  const modalShowNewProject = () => {
    openBlank();
    clearCurrentProjectData();
    modalNewProject.value = true;
  };

  return {
    toggleModal,
    showModal,
    modalShowNewQuestion,
    modalNewQuestion,
    modalShowNewProject,
    modalNewProject,
  };
};
