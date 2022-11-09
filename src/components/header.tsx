import { logOut } from "@store/auth/actions";
import { removeUser } from "@store/user/actions";
import Link from "next/link";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
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