import Link from "next/link";
import styles from '@styles/components/Header.module.css'
import useHeader from "src/hooks/useHeader";

export default function Header() {
  const {name, logout} = useHeader()

  return (
    <div className={styles.headerContainer}>
      <div>
        <Link className={styles.headerMenuButton} href="/">Home</Link>
        <Link className={styles.headerMenuButton} href="/favorites">Favoritos</Link>
      </div>
      <div>
        <span className={styles.headerMenuButton}>Bem-vindo(a), {name}</span>
        <button className={styles.headerButton} onClick={logout}>Logout</button>
      </div>
    </div>
  )
}