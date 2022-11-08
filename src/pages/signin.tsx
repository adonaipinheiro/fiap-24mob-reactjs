import { API } from '@services/api'
import { logIn } from '@store/auth/actions'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useRef } from 'react'
import { useDispatch } from 'react-redux'

export default function SignIn() {
  const router = useRouter()
  const dispatch = useDispatch()
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputPass = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const email = inputEmail.current?.value
    const pass = inputPass.current?.value

    if (email && pass) {
      API.signIn(email, pass).then(()=>{
        dispatch(logIn())
        router.replace("/")
      }).catch((e)=>{
        alert(e)
      })
    }
  }

  return (
    <div>
      SignIn
      <form onSubmit={handleSubmit}>
        <input ref={inputEmail} type="email" name="email" id="email" />
        <input ref={inputPass} type="password" name="password" id="pass" />
        <button type="submit">Entrar</button>
        <Link href="signup">Cadastrar</Link>
      </form>
    </div>
  )
}