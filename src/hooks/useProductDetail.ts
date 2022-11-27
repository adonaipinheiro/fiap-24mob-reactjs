/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useRedirect } from 'src/hooks/useRedirect'
import { useEffect, useState } from 'react'
import useServices from '@services/useServices'
import { fullProductDetail } from '@services/types'
import { toast } from 'react-toastify'

export default function useProductDetail() {
  const router = useRouter()
  const [product, setProduct] = useState<fullProductDetail>()
  const { isLoading, handleAuthRedirect, handleLogout } = useRedirect()
  const {id} = router.query as {id: string};
  const { getProductById, loading, makeFavorite } = useServices()

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleProductDetail = () =>{
    getProductById(id)
    .then(r=> {
      console.log(r)
      setProduct(r.product)
    })
    .catch(e=>{
      handleLogout()
      console.log(e)
    })
  }

  const handleMakeFavorite = () => {
    if (product) {
      makeFavorite(product._id)
        .then(()=>{
          toast.success("Produto atualizado com sucesso!", {
            icon: "🚀",
            autoClose: 2500
          });
          handleProductDetail()
        })
        .catch(()=>{
          toast.error('Não foi possível atualizar o produto', {
            icon: "😞",
            autoClose: 2500
          });
        })
    }
  }

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
      }, () => {
        toast.warning('Precisamos da sua permissão para buscar a sua localização', {
          icon: "🗺️",
          autoClose: 2500
        });
      });
    }
  }

  useEffect(()=>{
    handleLocation()
    handleProductDetail()
    handleAuthRedirect()
    toast.info("Para marcar ou desmarcar um produto como favorito, basta clicar na estrela!", {
      icon: "🤓",
      autoClose: 5000
    });
  }, [])

  const handleStoresLocations = () => {
    if (product) {
      let auxArray: any[] = []
      product.stores.map(store => {
        auxArray.push({
          lat: store.latitude,
          lng: store.longitude
        })
      })
      return auxArray
    }

    return []
  }

  return {
    isLoading,
    product,
    loading,
    formatter,
    handleMakeFavorite,
    handleStoresLocations
  }
}