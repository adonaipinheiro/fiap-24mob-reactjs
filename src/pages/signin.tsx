import { Formik } from 'formik'
import Head from 'next/head'
import LoadingPage from '@components/loadingPage'
import { Button, CircularProgress, TextField } from '@mui/material'
import styles from '@styles/SignIn.module.css'
import useSignIn from 'src/hooks/useSignIn'


export default function SignIn() {
  const {
    isLoading, 
    LoginSchema, 
    handleSignUp, 
    handleSubmit
  } = useSignIn()

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