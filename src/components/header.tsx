/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from "@store";
import { logIn, logOut } from "@store/auth/actions";
import { removeUser, setUser } from "@store/user/actions";
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
    dispatch(removeUser())
  }

  useEffect(()=>{
    const localIsLogged = !!localStorage.getItem("isLogged")
    if (!isLogged && !localIsLogged) {
      toast.success("Você foi deslogado!", {
        icon: "😞",
        autoClose: 2500
      });
      router.replace("/signin")
    } else {
      const localUserInfo = localStorage.getItem("userInfo")
      dispatch(logIn())
      localUserInfo && dispatch(setUser(JSON.parse(localUserInfo)))
    }
  }, [isLogged])

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