import Head from 'next/head'

import Game from '../components/Game'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Cards" />
        <meta name="keywords" content="cards" />
        <title>Cards</title>
        <link href="/favicon.ico" rel="icon" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/152.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>

      <Layout>
        <Game />
      </Layout>
    </>
  )
}
