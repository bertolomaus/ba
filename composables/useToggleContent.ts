export const useToggleContent = () => {
  // toggle between login / register form. true: login; false: register
  const showLogin = useState<boolean>('showLogin', () => true)
  const showSidebar = useState<boolean>('showSidebar', () => false)
  const showSidebarNav = useState<boolean>('showSidebar', () => true)

  const toggleAuthForm = () => {
    showLogin.value = !showLogin.value
  }

  const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value
  }

  const showNavigation = () => {
    showSidebarNav.value = true
  }

  const showInteraction = () => {
    showSidebarNav.value = false
  }

  return { 
    showLogin, toggleAuthForm, 
    showSidebar, toggleSidebar,
    showSidebarNav, showNavigation, showInteraction
  }
};