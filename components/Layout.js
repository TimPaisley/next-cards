import Head from 'next/head'

export default function Layout({ children }) {
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

      <div className="flex h-screen flex-col max-w-sm m-auto">{children}</div>
    </>
  )
}
