import Carousel from '@/components/Carousel'
import H1 from '@/components/H1'
import H2 from '@/components/H2'
import Products from '@/components/Products'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
          <title>Fantastic Fruits</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 bg-base-200`}>
        <div className='flex md:flex-row flex-col justify-between gap-4'>
          <div className='bg-red- flex flex-col gap-4 items-start'>
            <H1>Browse a wide array of fruits and vegetables</H1>
            <p>Browse a wide array of fruits and vegetables with Fantastic Fruits. We sell all sorts of stuff for just the right price :)</p>
            <Link href="/browse">
              <button className="btn btn-primary" name="Browse">Browse Here!</button>
            </Link>
          </div>
          <Carousel />
        </div>
        <H2 className="py-8">Products</H2>
        <Products />
      </main>
    </>
  )
}
