/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from "@store";
import { logIn, logOut } from "@store/auth/actions";
import { removeUser, setUser } from "@store/user/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRedirect } from "src/hooks/useRedirect";

export default function Header() {
  const dispatch = useDispatch()
  const { handleLogout } = useRedirect()

  const logout = (e: FormEvent) => {
    e.preventDefault()
    toast.success("Você foi deslogado!", {
      icon: "😞",
      autoClose: 2500
    });
    dispatch(logOut())
    dispatch(removeUser())
    handleLogout()
  }

  return (
    <div>
      <div>
        <Link href="/">Home</Link>
        <Link href="/favorites">Favoritos</Link>
      </div>
      <div>
        <span>Adonai</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}