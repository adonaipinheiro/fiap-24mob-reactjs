import Head from 'next/head'
import Header from '@components/header'
import LoadingPage from '@components/loadingPage'
import Link from 'next/link'
import { useRedirect } from 'src/hooks/useRedirect'
import { useEffect } from 'react'

export default function Favorites() {
  const { isLoading, handleAuthRedirect } = useRedirect()

  useEffect(()=>{
    handleAuthRedirect()
  }, [handleAuthRedirect])

  if (isLoading) return <LoadingPage />

  return (
    <>
      <Head>
        <title>Favorites</title>
      </Head>
      <div>
        <Header />
        <Link href={"/product/123"}>Produto</Link>
      </div>
    </>
  )
}
