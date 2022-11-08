import { auth } from "./authServices"
import { signIn } from "./signInServices"

const Services = {
  ...signIn,
  ...auth
}

export {Services as API}