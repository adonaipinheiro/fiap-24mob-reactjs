/* eslint-disable react-hooks/exhaustive-deps */
import { useRedirect } from 'src/hooks/useRedirect'
import { useEffect, useState } from 'react'
import useServices from '@services/useServices'
import { toast } from 'react-toastify'
import { IProduct } from '@services/types'

export default function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pages, setPages] = useState<number>(1);
  const { getProducts, loading } = useServices()
  const { isLoading, handleAuthRedirect, handleLogout } = useRedirect()

  const handleGetProducts = (page = 1) => {
    getProducts(page)
      .then(r=> {
        setPages(Math.ceil(r.totalItems / r.perPage));
        setProducts(r.products);
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
    pages,
    handleGetProducts,
    loading
  }
}