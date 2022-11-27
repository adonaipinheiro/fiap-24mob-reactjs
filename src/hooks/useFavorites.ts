/* eslint-disable react-hooks/exhaustive-deps */
import { useRedirect } from 'src/hooks/useRedirect'
import { useEffect, useState } from 'react'
import useServices from '@services/useServices'
import { toast } from 'react-toastify'
import { IProduct } from '@services/types'

export default function useFavorites() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { getFavProducts, loading } = useServices()
  const { isLoading, handleAuthRedirect, handleLogout } = useRedirect()

  const handleGetProducts = () => {
    getFavProducts()
      .then(r=> {
        let auxArray: IProduct[] = []
        r.products.map(prod => {
          auxArray.push({
            _id: prod._id,
            name: prod.name,
            price: prod.price,
            favorite: true
          })
        })
        setProducts(auxArray);
      })
      .catch(error=>{
        handleLogout()
        toast.error(error, {
          icon: "😞",
          autoClose: 2500
        });
      })
  }
  
  useEffect(()=>{
    handleGetProducts()
    handleAuthRedirect()
  }, [])

  return {
    isLoading,
    products,
    loading
  }
}