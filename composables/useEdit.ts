export const useEdit = () => {
  const editMode = useState<boolean>('editMode', () => false)
  
  const toggleEditMode = () => {
    editMode.value = !editMode.value
  }
  return {editMode, toggleEditMode}
}