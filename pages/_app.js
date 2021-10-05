import '../styles/globals.css'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import NextNprogress from 'nextjs-progressbar';
// import { MoralisProvider } from "react-moralis";
import Banner from '../components/Banner';

const DeezNutz = ({ Component, pageProps }) => {
  return (
    // <MoralisProvider appId="CyDwbVDgE1b9Y9eNQCWmbhwTsnpYAQh5Hdz8xwg1" serverUrl="https://eh2neiekfbww.moralishost.com:2053/server">
    <div>
      <Head />
      <NextNprogress
        color="#8c00ff"
        startPosition={0.3}
        stopDelayMs={100}
        height={3}
        showOnShallow={true}
      />
      <Banner />
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </div>
    // </MoralisProvider>
  )
}

export default DeezNutz
