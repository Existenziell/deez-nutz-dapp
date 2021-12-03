// import { useEffect, useState } from 'react'
// import getContractInfo from '../lib/getContractInfo'
// import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
// import axios from 'axios'
import Image from 'next/image'
import Main from '../components/Main'

const Collection = () => {
  // const [loading, setLoading] = useState(true)
  // const [contractInfo, setContractInfo] = useState({})
  // const [mintedNfts, setMintedNfts] = useState([])

  // useEffect(() => {
  //   async function fetchInfo() {
  //     const info = await getContractInfo()
  //     setContractInfo(info)
  //     console.log(info)
  //     const meta = await getMetadata()
  //     console.log(meta)
  //     setMintedNfts(meta)
  //     setLoading(false)
  //   }
  //   fetchInfo()
  // }, [])

  // async function getMetadata() {
  //   // console.log('getMetadata', contractInfo)
  //   let mintedNfts = []
  //   for (let i = 1; i <= contractInfo.totalSupply.toNumber(); i++) {
  //     const meta = await axios.get(`${contractInfo.baseUri}${i}`)
  //     // console.log(meta)
  //     mintedNfts.push(meta)
  //   }
  //   return mintedNfts
  // }

  // if (loading || !mintedNfts)
  //   return (
  //     <div className='flex flex-col items-center justify-center h-screen'>
  //       <ClimbingBoxLoader color={'var(--color-brand)'} size={40} />
  //       <p className='font-mono relative top-24 left-6 dark:text-white'>Connecting to the blockchain...</p>
  //     </div>
  //   )

  // if (loading === false && mintedNfts) {

  return (
    <Main title='Collection' titleSuffix={true}>
      <h2 className='text-center'>Minted NFTs:</h2>
      <ul className='flex flex-wrap justify-center items-center p-8 w-full'>
        {[].map(n => {
          // console.log(n.data);
          const { edition, name, description, image, dna } = n.data

          return (
            <li key={edition} className='mb-16 mr-6 text-center'>
              {image !== undefined &&
                <Image src={image.toString()} width={200} height={200} alt={description} />
              }
              <div className='mt-2 dark:text-white'>
                <h2 className='text-2xl'>{name}</h2>
                {/* <p className='text-xs'>Created: {convertTimestamp(date)}</p> */}
                <p className='text-xs'>DNA: {dna}</p>
                {/* <p>{nft.description}</p> */}
              </div>
            </li>
          )
        })}
      </ul>
    </Main>
  )
  // }
}

export default Collection
