import { NextSeo } from 'next-seo'

const addBrandToTitle = (title, addSuffix = true) => (addSuffix ? `${title} | DeezNutz NFTs` : title)

const Main = ({ title, children, titleSuffix = true }) => {
  return (
    <main className='px-8 pb-16 bg-gradient bg-cover text-white'>
      <NextSeo title={addBrandToTitle(title, titleSuffix)} />
      {children}
    </main>
  )
}

export default Main
