import { RootState } from "@store";
import { logOut } from "@store/auth/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)

  const handleLogout = (e: FormEvent) => {
    e.preventDefault()
    dispatch(logOut())
  }

  useEffect(()=>{
    if (!isLogged) router.replace("/signin")
  }, [isLogged, router])

  return (
    <div>
      <div>
        <Link href="/">Home</Link>
        <Link href="/favorites">Favoritos</Link>
      </div>
      <div>
        <span>Adonai</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}