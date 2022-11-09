import Link from "next/link"
import styles from '@styles/SignUp.module.css'
import * as Yup from 'yup'
import LoadingPage from '@components/loadingPage'
import { useRouter } from "next/router"
import { FormEvent, useEffect, } from "react"
import { useRedirect } from "src/hooks/useRedirect"
import Head from "next/head"
import { Button, CircularProgress, TextField } from "@mui/material"
import { Formik } from "formik"
import { API } from "@services/api"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { setUser } from "@store/user/actions"
import { logIn } from "@store/auth/actions"

export default function SignUp() {
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
    API.signUp(name, tel, email, pass).then(()=>{
      toast.success("Cadastro realizado com sucesso!", {
        icon: "🚀",
        autoClose: 2500
      });
      API.signIn(email, pass).then((resp) => {
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

  if (isLoading) return <LoadingPage />

  return (
    <>
      <Head>
        <title>Cadastrar | FIAP MBA</title>
      </Head>
      <div className={styles.container}>
      <Formik
          initialValues={{
            name: '',
            tel: '',
            email: '',
            pass: '',
            confirmPass: ''
          }}
          validationSchema={SignUpSchema}
          onSubmit={({name, tel, email, pass}, {setSubmitting})=>handleSubmit(name, tel, email, pass, setSubmitting)}
        >
          {({ errors, handleSubmit, handleBlur, handleChange, values, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.formContainer}>

            <h1>FIAP MBA</h1>
            <h2>ReactJS Development</h2><br/>

            <TextField
              className={styles.input}
              placeholder={'Digite seu nome'}
              name="name" 
              id="name" 
              error={!!errors.name}
              helperText={errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name} /><br/>

            <TextField
              className={styles.input}
              placeholder={'Digite seu telefone'}
              type="tel" 
              name="tel" 
              id="tel" 
              error={!!errors.tel}
              helperText={errors.tel}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.tel} /><br/>

            <TextField
              className={styles.input}
              placeholder={'Digite seu e-mail'}
              type="email" 
              name="email" 
              id="email" 
              error={!!errors.email}
              helperText={errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email} /><br/>

            <TextField
              className={styles.input}
              placeholder={'Digite sua senha'}
              type="password" 
              name="pass" 
              id="pass" 
              error={!!errors.pass}
              helperText={errors.pass}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.pass} /><br/>

            <TextField
              className={styles.input}
              placeholder={'Confirme sua senha'}
              type="password" 
              name="confirmPass" 
              id="confirmPass" 
              error={!!errors.confirmPass}
              helperText={errors.confirmPass}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPass} /><br/>

            <Button 
              className={styles.buttonSignIn} 
              variant="contained" 
              type='submit' 
              disabled={isSubmitting}>{isSubmitting ? (<CircularProgress size={'1.5rem'} />) : 'Cadastrar'}
            </Button><br/>

            <Button className={styles.buttonSignUp} variant="outlined" onClick={handleSignIn}>Entrar com e-mail</Button>
          </form>
        )}
        </Formik>
        <span className={styles.footer}>Feito com amor ❤️</span>
      </div>
    </>
  )
}