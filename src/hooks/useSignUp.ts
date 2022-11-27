import * as Yup from 'yup'
import { useRouter } from "next/router"
import { FormEvent, useEffect, } from "react"
import { useRedirect } from "src/hooks/useRedirect"
import useServices from "@services/useServices"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { setUser } from "@store/user/actions"
import { logIn } from "@store/auth/actions"

export default function useSignUp() {
  const {signIn, signUp} = useServices()
  const router = useRouter()
  const dispatch = useDispatch()
  const {isLoading, handleAuthRedirect} = useRedirect()

  const phoneRegex = /^(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})$/

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório").trim(),
    tel: Yup.string().required("Campo obrigatório").min(11, "Número de telefone inválido").max(11, "Número de telefone inválido").matches(phoneRegex, "Número de telefone inválido").trim(),
    email: Yup.string().email("Digite um e-mail válido").required("Campo obrigatório").trim(),
    pass: Yup.string().min(8, "A senha não atende os requisitos").required("Campo obrigatório").trim(),
    confirmPass: Yup.string().oneOf([Yup.ref('pass'), null], 'As senhas não estão iguais').required("Campo obrigatório").trim()
  });

  const handleSubmit = (
    name: string,
    tel: string,
    email: string,
    pass: string,
    setSubmitting: (a:boolean)=>void
  ) => {
    signUp(name, tel, email, pass).then(()=>{
      toast.success("Cadastro realizado com sucesso!", {
        icon: "🚀",
        autoClose: 2500
      });
      signIn(email, pass).then((resp) => {
        dispatch(setUser(resp))
        dispatch(logIn())
        toast.success("Aproveite a nossa plataforma", {
          icon: "😁",
          autoClose: 2500
        });
        router.replace("/")
      }).catch((_) => {
        toast.error('Não foi entrar automaticamente, por favor tente novamente ', {
          icon: "😞",
          autoClose: 2500
        });
        router.replace("/signin")
      })
    }).catch((error)=>{
      setSubmitting(false)
      toast.error(error, {
        icon: "😞",
        autoClose: 2500
      });
    })
  }

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault()
    router.replace('/signin')
  }

  useEffect(()=>{
    handleAuthRedirect()
  }, [handleAuthRedirect])

  return {
    isLoading,
    handleSubmit,
    handleSignIn,
    SignUpSchema
  }
}