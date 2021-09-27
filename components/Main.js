import { NextSeo } from 'next-seo'

const addBrandToTitle = (title, addSuffix = true) => (addSuffix ? `${title} | DeezNutz NFTs` : title)

const Main = ({ title, children, titleSuffix = true }) => {
  return (
    <main className='w-full flex flex-col items-center justify-center px-8 pb-16'>
      <NextSeo title={addBrandToTitle(title, titleSuffix)} />
      {children}
    </main>
  )
}

export default Main
