import styles from '@styles/components/LoadingPage.module.css'
import { CircularProgress } from '@mui/material'

export default function LoadingPage() {
  return (
    <div className={styles.container}>
      <h1>FIAP MBA</h1>
      <h2>ReactJS Development</h2><br/>
      <CircularProgress color='inherit' /><br/>
      <span>Carregando...</span>
      <span className={styles.footer}>Feito com amor ❤️</span>
    </div>
  )
}