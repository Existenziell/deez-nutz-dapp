import '../styles/globals.css'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Image from 'next/image'
import Footer from '../components/Footer'
import NextNprogress from 'nextjs-progressbar'
// import { MoralisProvider } from 'react-moralis'

const DeezNutz = ({ Component, pageProps }) => {
  return (
    // <MoralisProvider appId='CyDwbVDgE1b9Y9eNQCWmbhwTsnpYAQh5Hdz8xwg1' serverUrl='https://eh2neiekfbww.moralishost.com:2053/server'>
    <>
      <Head />
      <NextNprogress
        color='var(--color-brand)'
        startPosition={0.3}
        stopDelayMs={100}
        height={3}
        showOnShallow={true}
      />
      <Nav />
      <Image src='/header.jpg' width={1920} height={1080} layout={'responsive'} alt={'DeezNutz Banner'} />
      <Component {...pageProps} />
      <Footer />
    </>
    // </MoralisProvider>
  )
}

export default DeezNutz
