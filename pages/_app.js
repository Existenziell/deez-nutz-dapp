import '../styles/globals.css'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import NextNprogress from 'nextjs-progressbar';

const DeezNutz = ({ Component, pageProps }) => {
  return (
    <div>
      <Head />
      <NextNprogress
        color="#8c00ff"
        startPosition={0.3}
        stopDelayMs={100}
        height={3}
        showOnShallow={true}
      />
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default DeezNutz
