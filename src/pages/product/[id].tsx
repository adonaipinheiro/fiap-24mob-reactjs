import Head from 'next/head'
import Header from '@components/header'
import { useRouter } from 'next/router'
import { useRedirect } from 'src/hooks/useRedirect'
import { useEffect } from 'react'

export default function Products() {
  const router = useRouter()
  const { isLoading, handleAuthRedirect } = useRedirect()
  const {id} = router.query;

  useEffect(()=>{
    handleAuthRedirect()
  }, [handleAuthRedirect])

  if (isLoading) return <div>Loading</div>
  
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <div>
        <Header />
        <span>Product: {id}</span>
      </div>
    </>
  )
}
