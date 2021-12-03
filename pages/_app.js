import '../styles/globals.css'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Image from 'next/image'
import Footer from '../components/Footer'
import NextNprogress from 'nextjs-progressbar'
// import { MoralisProvider } from "react-moralis"

const DeezNutz = ({ Component, pageProps }) => {
  return (
    // <MoralisProvider appId="CyDwbVDgE1b9Y9eNQCWmbhwTsnpYAQh5Hdz8xwg1" serverUrl="https://eh2neiekfbww.moralishost.com:2053/server">
    <>
      <Head />
      <NextNprogress
        color="var(--color-brand)"
        startPosition={0.3}
        stopDelayMs={100}
        height={3}
        showOnShallow={true}
      />
      <Nav />
      <Image src="/header.png" width={1920} height={1080} layout={"responsive"} alt={"DeezNutz Banner"} />
      <div className="absolute top-0 left-12 w-1/3">
        <Image src={'/animated.gif'} width={425} height={515} alt={"Animated DeezNutz"} />
      </div>
      <Component {...pageProps} />
      <Footer />
    </>
    // </MoralisProvider>
  )
}

export default DeezNutz
