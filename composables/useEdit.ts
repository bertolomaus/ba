export const useEdit = () => {
  const editMode = useState<boolean>('editMode', () => false)
  
  const toggleEditMode = () => {
    editMode.value = !editMode.value
  }

  const editModeOn = () => {
    editMode.value = true
  }

  const editModeOff = () => {
    editMode.value = false
  }

  return {editMode, toggleEditMode, editModeOn, editModeOff}
}