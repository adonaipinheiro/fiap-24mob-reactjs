import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import useServices from '@services/useServices'
import { logIn } from '@store/auth/actions'
import { setUser } from '@store/user/actions'
import { useEffect } from 'react'
import { useRedirect } from 'src/hooks/useRedirect'

export default function useSignIn() {
  const { signIn } = useServices()
  const router = useRouter()
  const dispatch = useDispatch()
  const { isLoading, handleAuthRedirect } = useRedirect()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Digite um e-mail válido").required("Campo obrigatório").trim(),
    pass: Yup.string().min(8, "A senha não atende os requisitos").required("Campo obrigatório").trim()
  });

  const handleSubmit = (
    email: string, 
    pass: string, 
    setSubmitting: (a:boolean)=>void
  ) => {
    signIn(email, pass).then(resp=>{
      dispatch(setUser(resp))
      dispatch(logIn())
      toast.success("Login realizado com sucesso!", {
        icon: "🚀",
        autoClose: 2500
      });
      router.replace("/")
    }).catch((error)=>{
      setSubmitting(false)
      toast.error(error, {
        icon: "😞",
        autoClose: 2500
      });
    })
  }

  const handleSignUp = () => {
    router.push('/signup');
  }

  useEffect(()=>{
    handleAuthRedirect()
  }, [handleAuthRedirect])

  return {
    isLoading,
    LoginSchema,
    handleSubmit,
    handleSignUp
  }
}