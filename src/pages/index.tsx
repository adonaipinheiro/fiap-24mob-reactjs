import Head from 'next/head'
import Header from '@components/header'
import LoadingPage from '@components/loadingPage'
import { CircularProgress, Pagination } from '@mui/material'
import styles from '@styles/Products.module.css'
import ProductItem from '@components/productItem'
import useProducts from 'src/hooks/useProducts'

export default function Products() {
  const {
    isLoading, 
    loading, 
    products, 
    pages, 
    handleGetProducts
  } = useProducts()

  if (isLoading) return <LoadingPage />

  return (
    <>
      <Head>
        <title>Produtos | FIAP MBA</title>
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
          <div className={styles.pagination}>
            <Pagination 
              count={pages} 
              onChange={(_, page)=>handleGetProducts(page)} 
              color='primary'
            />
          </div>
        </div>
      </div>
    </>
  )
}