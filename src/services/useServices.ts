/* eslint-disable react-hooks/rules-of-hooks */
import { getCookie, setCookie } from "cookies-next";
import { useState } from "react";
import { apiInstance } from "./apiConfig";
import { fullProductDetail, GetFavoritesProductsRespType, GetProductDetailRespType, GetProductsRespType, IResponse, SignInType, SignUpType, URLS } from "./types.d";

export default function useServices() {
  const [loading, setLoading] = useState<boolean>(false)

  const isLogged = async () => {
    try {
      setLoading(true)
      const isValid: IResponse<boolean> = await apiInstance.get(
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
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email:string, password:string) => {
    try {
      setLoading(true)
      const { data, status }: IResponse<SignInType> = await apiInstance.post(
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
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, phone: string, email:string, password:string) => {
    try {
      setLoading(true)
      const { data, status }: IResponse<SignUpType> = await apiInstance.put(
        URLS.signUp,
        {
          name,
          phone,
          email,
          password
        }
      )
      return data
    } catch (error) {
      throw 'Não foi possível cadastrar'
    } finally {
      setLoading(false)
    }
  }

  const getProducts = async (page?: number) => {
    try {
      setLoading(true)
      const {data}: IResponse<GetProductsRespType> = await apiInstance.get(
        URLS.productSearch,
        {
          headers: {
            'Authorization': 'Bearer ' + getCookie('token')
          },
          params: {
            page,
            perPage: 10,
          },
        }
      )
      return data
    } catch (error) {
      throw 'Não foi possível buscar os produtos'
    } finally {
      setLoading(false)
    }
  }

  const getFavProducts = async () => {
    try {
      setLoading(true)
      const {data, status}: IResponse<GetFavoritesProductsRespType> = await apiInstance.get(
        URLS.getFavProducts,
        {
          headers: {
            'Authorization': 'Bearer ' + getCookie('token')
          },
        }
      )

      if (status !== 200) throw Error

      return data
    } catch (error) {
      throw 'Não foi possível buscar os produtos'
    } finally {
      setLoading(false)
    }
  }

  const getProductById = async (id: string) => {
    try {
      setLoading(true)
      const {data, status}: IResponse<GetProductDetailRespType> = await apiInstance.get(
        URLS.productInfoById + id,
        {
          headers: {
            'Authorization': 'Bearer ' + getCookie('token')
          },
        }
      )

      if (status !== 200) throw Error

      return data
    } catch (error) {
      throw 'Não foi possível buscar o produto'
    } finally {
      setLoading(false)
    }
  }

  const makeFavorite = async (id: string) => {
    try {
      setLoading(true)
      const {data, status}: IResponse<any> = await apiInstance.post(
        URLS.manageFavoriteProduct,
        {
          productID: id,
        },
        {
          headers: {
            'Authorization': 'Bearer ' + getCookie('token')
          },
        }
      )

      console.log(data)

      if (status !== 200) throw Error

      return data
    } catch (error) {
      throw 'Não foi possível buscar o produto'
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    isLogged,
    signIn,
    signUp,
    getProducts,
    getFavProducts,
    getProductById,
    makeFavorite
  }
}