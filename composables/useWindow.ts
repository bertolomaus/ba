export const useWindow = () => {
  const isScrolled = useState<boolean>('isScrolled', () => false)
  
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 64
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {isScrolled}
}