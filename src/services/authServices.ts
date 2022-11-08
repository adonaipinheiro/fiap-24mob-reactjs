import { getCookie, setCookie } from "cookies-next"
import { serviceInstance } from "./servicesConfig"
import { IResponse, URLS } from "./types.d"

const authServices = {
  isLogged: async () => {
    try {
      const isValid: IResponse<boolean> = await serviceInstance.get(
        URLS.getFavProducts,
        {
          headers: {
            'Authorization': 'Bearer ' + getCookie('token')
          }
        }
      )
      if (isValid) return true
      return false
    } catch (error) {
      return false
    }
  }
}

export {authServices as auth}