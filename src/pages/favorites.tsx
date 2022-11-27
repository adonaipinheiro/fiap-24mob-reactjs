import Head from 'next/head'
import Header from '@components/header'
import LoadingPage from '@components/loadingPage'
import { CircularProgress } from '@mui/material'
import styles from '@styles/Products.module.css'
import ProductItem from '@components/productItem'
import useFavorites from 'src/hooks/useFavorites'

export default function Favorites() {
  const {
    isLoading, 
    loading, 
    products
  } = useFavorites()

  if (isLoading) return <LoadingPage />

  return (
    <>
      <Head>
        <title>Favoritos | FIAP MBA</title>
      </Head>
      <div className={styles.productsContainer}>
        <Header />
        <div>
          {loading ? (
            <div className={styles.productLoading}>
              <CircularProgress size={24} />
              <br/>
              Carregando...
            </div>
          ) : (
            products.length === 0 ? (
              <div className={styles.productLoading}>
                Não há produtos
              </div>
            ) : (
              products.map(product => (
                <ProductItem key={product._id} product={product} />
              ))
            )
          )}
        </div>
      </div>
    </>
  )
}