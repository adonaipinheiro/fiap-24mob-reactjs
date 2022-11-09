import { Formik } from 'formik'
import * as Yup from 'yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import LoadingPage from '@components/loadingPage'
import { toast } from 'react-toastify'

import { API } from '@services/api'
import styles from '@styles/SignIn.module.css'
import { logIn } from '@store/auth/actions'
import { setUser } from '@store/user/actions'
import { Button, CircularProgress, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useRedirect } from 'src/hooks/useRedirect'

export default function SignIn() {
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
    API.signIn(email, pass).then(resp=>{
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

  if (isLoading) return <LoadingPage />

  return (
   <>
      <Head>
        <title>Entrar | FIAP MBA</title>
      </Head>
     <div className={styles.container}>
        <Formik
          initialValues={{email: '', pass: ''}}
          validationSchema={LoginSchema}
          onSubmit={({email, pass}, {setSubmitting})=>handleSubmit(email, pass, setSubmitting)}
        >
          {({ errors, handleSubmit, handleBlur, handleChange, values, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.formContainer}>

            <h1>FIAP MBA</h1>
            <h2>ReactJS Development</h2><br/>

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

            <Button 
              className={styles.buttonSignIn} 
              variant="contained" 
              type='submit' 
              disabled={isSubmitting}>{isSubmitting ? (<CircularProgress size={'1.5rem'} />) : 'Entrar'}
            </Button><br/>

            <Button className={styles.buttonSignUp} variant="outlined" onClick={handleSignUp}>Cadastrar</Button>
          </form>
        )}
        </Formik>
        <span className={styles.footer}>Feito com amor ❤️</span>
      </div>
   </>
  )
}