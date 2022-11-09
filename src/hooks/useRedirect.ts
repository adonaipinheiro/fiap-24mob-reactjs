import { useRouter } from "next/router"
import { useCallback, useState } from "react"

const useRedirect = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleAuthRedirect = () => {
    const isLogged = !!localStorage.getItem('isLogged')
    redirect(isLogged)
  }

  const handleLogout = () => {
    router.replace('/signin')
  }

  const redirect = useCallback((isLogged: boolean) => {
    if (isLogged) {
      switch (router.asPath) {
        case '/signin':
        case '/signup':
          router.replace('/')
          break;
        default:
          setIsLoading(false)
          break;
      }
    } else {
      switch (router.asPath) {
        case '/signin':
        case '/signup':
          setIsLoading(false)
          break;
        default:
          router.replace('/signin')
          break;
        }
    }
  }, [router])

  return {
    isLoading,
    handleAuthRedirect,
    handleLogout
  }
}

export {useRedirect}