import Link from "next/link"
import { useRouter } from "next/router"
import { FormEvent } from "react"

export default function SignUp() {
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.replace('/')
  }

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
        <Link href="/">Entrar com e-mail</Link>
      </form>
    </div>
  )
}