export const useAuth = () => {
  const isLoggedIn = useState<boolean>('isLoggedIn', () => false)
  const userId = useState<number>('userId', () => 0)

  const login = (id: number) => {
    isLoggedIn.value = true
    userId.value = id
  };

  const logout = () => {
    isLoggedIn.value = false
    userId.value = 0
  };

  return { isLoggedIn, userId, login, logout }
};