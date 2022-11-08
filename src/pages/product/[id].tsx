import Head from 'next/head'
import Header from '@components/header'
import { useRouter } from 'next/router'

export default function Products() {
  const router = useRouter()

  const {id} = router.query;

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
