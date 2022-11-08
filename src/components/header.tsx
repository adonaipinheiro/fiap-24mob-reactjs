import { RootState } from "@store";
import { logOut } from "@store/auth/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)

  const handleLogout = (e: FormEvent) => {
    e.preventDefault()
    dispatch(logOut())
  }

  useEffect(()=>{
    if (!isLogged) {
      toast.success("Até breve!", {
        icon: "😞",
        autoClose: 2500
      });
      router.replace("/signin")
    }
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