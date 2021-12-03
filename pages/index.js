// import { ethers } from 'ethers'
// import { useEffect, useState } from 'react'
// import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import Link from 'next/link'
import Image from 'next/image'
import Main from '../components/Main'
// import Specs from '../components/Specs'
// import getContractInfo from '../lib/getContractInfo'

const DeezNutz = () => {
  // const [contractInfo, setContractInfo] = useState({})
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   async function fetchInfo() {
  //     const info = await getContractInfo()
  //     setContractInfo(info)
  //     setLoading(false)
  //   }
  //   fetchInfo()
  // }, [])

  // if (loading)
  //   return (
  //     <div className='flex flex-col items-center mt-24'>
  //       <ClimbingBoxLoader color={'var(--color-brand)'} size={40} />
  //       <p className='font-mono relative top-24 left-6 dark:text-white'>Connecting to the blockchain...</p>
  //     </div>
  //   )

  // if (loading === false && contractInfo) {
  // const { address, baseUri, cost, totalSupply, maxSupply, maxMintAmount } = contractInfo

  return (
    <Main title='DeezNutz NFTs' titleSuffix={false}>
      <>
        <div className='text-center mb-6'>
          <h1>DeezNutz NFT collection</h1>
          <p className='text-lg italic'>&ldquo;Algorithmically generated NFT ball sacks&rdquo;</p>
        </div>

        <section className='text-center flex items-center justify-center'>
          <video src='animated.webm' controls={false} loop={true} autoPlay={true} muted className='w-1/3' />

          <p className='my-8 text-xl leading-normal'>
            DeezNutz is a collection of 10.000 unique Digital Collectibles, living on the Polygon blockchain.
            Minting will start very soon.{' '}
            <Link href='/presale'><a className='underline'>Register your email</a></Link> to get notified before we drop the Nutz!
          </p>

          {/* <div className='text-lg text-center mt-16 bg-gray-50 rounded shadow p-8 md:w-1/2 dark:bg-gray-800 dark:text-white'>
          <p>
            DeezNutz is a collection of {maxSupply.toNumber()} unique Digital Collectibles, living on the Polygon blockchain.
            Claim your very own today. Prices stay the same for all initial NFTs.
          </p>
          <p className='my-4'>
            Special Mint Price: <span className='font-bold text-brand'>{ethers.utils.formatEther(cost)} ETH</span><br />
          </p>
          <Link href='/mint'>
            <a>
              <button className='mt-4 md:mt-0 button'>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'></path>
                </svg>
                <span>Mint Now!</span>
              </button>
            </a>
          </Link>
        </div> */}

        </section>
        <div className='my-8 text-center'>
          <Image src={'/pattern.png'} width={600} height={600} alt={'Nuts Pattern'} />
        </div>

        {/* <Specs contractInfo={contractInfo} /> */}
      </>
    </Main>
  )
  // }
}

export default DeezNutz
