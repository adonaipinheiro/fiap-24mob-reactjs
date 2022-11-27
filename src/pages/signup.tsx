import styles from '@styles/SignUp.module.css'
import LoadingPage from '@components/loadingPage'
import Head from "next/head"
import { Button, CircularProgress, TextField } from "@mui/material"
import { Formik } from "formik"
import useSignUp from "src/hooks/useSignUp"

export default function SignUp() {
  const {
    isLoading, 
    handleSignIn, 
    handleSubmit, 
    SignUpSchema
  } = useSignUp()

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