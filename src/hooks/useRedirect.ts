import { setUser } from "@store/user/actions"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"

const useRedirect = () => {
  const router = useRouter()
  const dispatch = useDispatch()
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
      const user = localStorage.getItem('userInfo')
      if (user) {
        const userParsed = JSON.parse(user)
        dispatch(setUser(userParsed))
      }
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
  }, [dispatch, router])

  return {
    isLoading,
    handleAuthRedirect,
    handleLogout
  }
}

export {useRedirect}