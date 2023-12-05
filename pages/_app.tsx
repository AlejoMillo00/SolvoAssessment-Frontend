import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import createCache from '@emotion/cache'
import { NextPage } from 'next'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createCache({ key: 'css' })

const App = (props: ExtendedAppProps) => {
  const {
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Solvo Assessment: Alejo Millo</title>
        <meta name="description" content="Employee create and list app" />
        <link rel="icon" href="/solvo.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout> 
    </CacheProvider>
  )
}

export default App
