import Head from 'next/head'

import Header from '../components/header'
import Layout from '../components/layout'
import Row from '../components/row'

export default function Home() {
  const cat = {
    name: 'cat',
    number: 1
  }

  const kiwi = {
    name: 'kiwi',
    number: 1
  }

  const dragon = {
    name: 'dragon',
    number: 3
  }

  const enemies = Array.from({ length: 2 }, () => dragon)
  const deck = Array.from({ length: 4 }, () => kiwi)
  const hand = Array.from({ length: 4 }, () => cat)

  return (
    <Layout>
      <Head>
        <title>Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <section className="flex flex-col h-full py-4 overflow-hidden">
        <div className="mx-4 flex-grow">
          <Row cards={enemies} />
        </div>

        <div className="p-4 flex space-x-4 justify-center items-center">
          <div className="w-3 h-3 bg-black rounded-full"></div>
          <div className="w-3 h-3 border border-black rounded-full"></div>
          <div className="w-3 h-3 border border-black rounded-full"></div>
          <div className="w-3 h-3 border border-red-500 rounded-full"></div>
        </div>

        <div className="">
          <Row cards={deck} />
        </div>

        <div className="mx-4 border-t border-gray-500 pt-4 mt-2">
          <Row cards={hand} />
        </div>
      </section>
    </Layout>
  )
}
