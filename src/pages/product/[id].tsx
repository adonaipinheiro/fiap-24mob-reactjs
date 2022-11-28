/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import styles from '@styles/Products.module.css'
import { CircularProgress } from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'
import { Wrapper } from "@googlemaps/react-wrapper";

import Header from '@components/header'
import LoadingPage from '@components/loadingPage'
import Map from '@components/Map/map'
import Marker from '@components/Map/marker'
import useProductDetail from 'src/hooks/useProductDetail';

export default function Products() {
  const {
    isLoading,
    loading,
    userCoords,
    product,
    formatter,
    handleMakeFavorite,
    handleStoresLocations
  } = useProductDetail()

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
              <div className={styles.mapArea}>
                <Wrapper apiKey={"AIzaSyBQ2puBxF1OrvMTY-yQ-RUtaLVwNZ19A7A"}>
                  <Map storesCoords={handleStoresLocations}>
                    <Marker
                      store={{
                        name: 'Você',
                        address: 'Sua localização atual'
                      }}
                      position={userCoords} 
                    />
                    {product.stores.map((store, index) => (
                      <Marker
                        key={index}
                        store={{
                          name: store.name,
                          address: store.address
                        }}
                        position={{lat: store.latitude, lng: store.longitude}} 
                      />
                    ))}
                  </Map>
                </Wrapper>
              </div>
            </>
          ) : (
            <div>Impossível buscar o produto</div>
          )
        )}
      </div>
    </>
  )
}