import { NextSeo } from 'next-seo'

const addBrandToTitle = (title, addSuffix = true) => (addSuffix ? `${title} | DeezNutz NFTs` : title)

const Main = ({ title, children, titleSuffix = true }) => {
  return (
    <main className='flex flex-col items-center justify-center px-8 pb-16 bg-gradient bg-cover border-t-2 border-black text-white'>
      <NextSeo title={addBrandToTitle(title, titleSuffix)} />
      {children}
    </main>
  )
}

export default Main
