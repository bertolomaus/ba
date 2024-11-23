export const useAuth = () => {
  const isLoggedIn = useState<boolean>('isLoggedIn', () => false)
  const userId = useState<number>('userId', () => 0)

  const { showLogin } = useToggleContent()
  const route = useRouter()

  const login = (id: number) => {
    isLoggedIn.value = true
    userId.value = id
  }

  const logout = () => {
    isLoggedIn.value = false
    userId.value = 0
    showLogin.value = true
    route.push({path: '/'})
  }

  return { isLoggedIn, userId, login, logout }
}