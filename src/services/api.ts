import { auth } from "./authServices"
import { signIn } from "./signInServices"
import { signUp } from "./signUpServices"

const Services = {
  ...signIn,
  ...signUp,
  ...auth
}

export {Services as API}