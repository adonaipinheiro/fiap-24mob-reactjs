/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Header from '@components/header'
import LoadingPage from '@components/loadingPage'
import { useRouter } from 'next/router'
import { useRedirect } from 'src/hooks/useRedirect'
import { useEffect, useState } from 'react'
import useServices from '@services/useServices'
import { fullProductDetail } from '@services/types'
import { toast } from 'react-toastify'
import styles from '@styles/Products.module.css'
import { CircularProgress } from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'

export default function Products() {
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

  if (isLoading) return <LoadingPage />

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <div>
        <Header />
        {loading ? (
          <div className={styles.productLoading}>
            <CircularProgress size={24} />
            <br/>
            Carregando...
          </div>
        ) : (
          product ? (
            <>
              <div className={styles.productItemContainer}>
                <div className={styles.productNameArea}>
                  <div className={styles.productName}><strong>{product.name}</strong></div>
                  <div className={styles.productPrice}>{formatter.format(parseInt(product.price, 10))}</div>
                </div>
                {product.favorite ? (
                  <button onClick={handleMakeFavorite} className={styles.favButton}>
                    <Star htmlColor="#fecc32" />
                  </button>
                ) : (
                  <button onClick={handleMakeFavorite} className={styles.favButton}>
                    <StarBorder />
                  </button>
                )}
              </div>
              <div>Mapa</div>
            </>
          ) : (
            <div>Impossível buscar o produto</div>
          )
        )}
      </div>
    </>
  )
}
