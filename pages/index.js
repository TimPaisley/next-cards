import Head from 'next/head'
import Layout from '../components/layout'
import Header from '../components/header'
import Deck from '../components/deck'
import Row from '../components/row'

export default function Home() {
  const cat = {
    "name": "cat",
    "number": 1,
  }

  const kiwi = {
    "name": "kiwi",
    "number": 1,
  }

  const deck = Array.from({ length: 20}, () => kiwi)
  const hand = Array.from({ length: 4}, () => cat)

  return (
    <Layout>
      <Head>
        <title>Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <section className="flex flex-col h-full py-4 overflow-hidden">
        <div className="flex flex-col justify-end flex-grow mx-4 overflow-hidden">
          <Deck deck={deck} />
        </div>

        <div className="mx-4 border-t border-gray-500 pt-4 mt-2">
          <Row cards={hand} />
        </div>
      </section>
    </Layout>
  )
}
