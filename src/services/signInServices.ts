import { setCookie } from "cookies-next"
import { serviceInstance } from "./servicesConfig"
import { IResponse, URLS } from "./types.d"

type SignInType = {
  name: string,
  phone: string,
  token: string,
  userId: string
}

const signInServices = {
  signIn: async (email:string, password:string) => {
    try {
      const { data, status }: IResponse<SignInType> = await serviceInstance.post(
        URLS.signIn,
        {
          email,
          password
        }
      )

      setCookie('token', data.token)

      if (status !== 200) throw Error

      return data
    } catch (error) {
      throw 'Usuário ou senha não encontrados'
    }
  }
}

export {signInServices as signIn}