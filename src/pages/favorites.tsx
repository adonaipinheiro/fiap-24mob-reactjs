import Head from 'next/head'
import Header from '@components/header'
import Link from 'next/link'

export default function Favorites() {
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
