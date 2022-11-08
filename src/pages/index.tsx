import { API } from '@services/api'
import { RootState } from '@store'
import { deleteCookie, setCookie } from 'cookies-next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)

  async function login() {
    try {
      const data = await API.signIn('adonaijpinheiro@gmail.com', 'Aj081209')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    login()
    console.log(isLogged)
  }, [isLogged])

  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>
      <div>
        SignIn
        <button onClick={()=>{deleteCookie('token')}}>Deleta cookie</button>
      </div>
    </>
  )
}
