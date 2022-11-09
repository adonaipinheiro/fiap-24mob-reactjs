import { setCookie } from "cookies-next"
import { serviceInstance } from "./servicesConfig"
import { IResponse, URLS } from "./types.d"

type SignUpType = {
  name: string,
  phone: string,
  token: string,
  userId: string
}

const signUpServices = {
  signUp: async (name: string, phone: string, email:string, password:string) => {
    try {
      const { data, status }: IResponse<SignUpType> = await serviceInstance.put(
        URLS.signUp,
        {
          name,
          phone,
          email,
          password
        }
      )

      console.log(data, status)

      // return data
    } catch (error) {
      throw 'Não foi possível cadastrar'
    }
  }
}

export {signUpServices as signUp}