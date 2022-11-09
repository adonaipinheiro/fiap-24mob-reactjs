import Link from "next/link"
import LoadingPage from '@components/loadingPage'
import { useRouter } from "next/router"
import { FormEvent, useEffect, } from "react"
import { useRedirect } from "src/hooks/useRedirect"

export default function SignUp() {
  const router = useRouter()
  const {isLoading, handleAuthRedirect} = useRedirect()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.replace('/')
  }

  useEffect(()=>{
    handleAuthRedirect()
  }, [handleAuthRedirect])

  if (isLoading) return <LoadingPage />

  return (
    <div>
      SignIn
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" />
        <input type="tel" name="tel" id="tel" />
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="pass" />
        <input type="password-confirm" name="password-confirm" id="pass-confirm" />
        <button type="submit">Cadastrar</button>
        <Link href="/signin">Entrar com e-mail</Link>
      </form>
    </div>
  )
}