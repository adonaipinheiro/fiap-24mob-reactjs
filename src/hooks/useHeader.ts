import { logOut } from "@store/auth/actions";
import { removeUser } from "@store/user/actions";
import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRedirect } from "src/hooks/useRedirect";
import { RootState } from "@store";

export default function useHeader() {
  const dispatch = useDispatch()
  const {name} = useSelector((state: RootState) => state.user)
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

  return {
    name,
    logout
  }
}