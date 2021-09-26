import '../styles/globals.css'
import Nav from '../components/Nav'
import NextNprogress from 'nextjs-progressbar';

const DeezNutz = ({ Component, pageProps }) => {
  return (
    <div>
      <NextNprogress
        color="#8c00ff"
        startPosition={0.3}
        stopDelayMs={100}
        height={3}
        showOnShallow={true}
      />
      <Nav />
      <Component {...pageProps} />
    </div>
  )
}

export default DeezNutz
