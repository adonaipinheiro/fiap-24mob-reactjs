import Head from 'next/head'
import Header from '@components/header'
import LoadingPage from '@components/loadingPage'
import { useRedirect } from 'src/hooks/useRedirect'
import { useEffect } from 'react'

export default function Products() {
  const { isLoading, handleAuthRedirect } = useRedirect()

  useEffect(()=>{
    handleAuthRedirect()
  }, [handleAuthRedirect])

  if (isLoading) return <LoadingPage />

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <div>
        <Header />
      </div>
    </>
  )
}
