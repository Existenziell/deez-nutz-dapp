import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Web3Modal from "web3modal" //Used to connect to a users ehtereum wallet
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
import Main from '../components/Main'
import detectEthereumProvider from '@metamask/detect-provider'
// import { useMoralis } from "react-moralis";
// import Moralis from 'moralis'

// Will be populated once the smart contract is deployed.
import { deeznutzAddress } from '../config'

// Import ABIs - JSON representation of our smart contracts - allows to interaction from a frontend application
// Have been compiled by hardhat
import DeezNutz from '../artifacts/contracts/DeezNutzNFT.sol/DeezNutzNFT.json'

export default function Home() {

  // const { authenticate, isAuthenticated, user } = useMoralis();

  // if (!isAuthenticated) {
  //   return (
  //     <div>
  //       <button onClick={() => authenticate()}>Authenticate with Metamask</button>
  //     </div>
  //   );
  // }
  // const getUserTokens = async () => {
  //   const options = { chain: 'mumbai', address: '0x9153Fb4f3e74795b1250D9bd8f4db9A79fab29f9' };
  //   const balances = await Moralis.Web3.getAllERC20(options)
  //   const b = await balances
  //   return balances
  // }
  // console.log(getUserTokens());

  // Local state
  const [contractInfo, setContractInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContractInfo()
  }, [])

  async function getContractInfo() {
    // const moralisId = process.env.NEXT_MORALIS_ID
    const nodeUrl = `https://speedy-nodes-nyc.moralis.io/661d2cac001d8e6c33d63f3a/polygon/mumbai`;
    const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
    // provider is read-only, get a signer for on-chain transactions
    const signer = provider.getSigner();

    // local: 
    // const provider = new ethers.providers.JsonRpcProvider()

    // If the third argument is provider, the contract is read-only
    const contract = new ethers.Contract(deeznutzAddress, DeezNutz.abi, provider)
    const info = {
      address: contract.address,
      totalSupply: await contract.totalSupply(),
      baseUri: await contract.baseURI(),
      cost: await contract.cost(),
      maxSupply: await contract.maxSupply(),
      maxMintAmount: await contract.maxMintAmount(),
    }

    setContractInfo(info)
    setLoading(false)
  }


  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ClimbingBoxLoader color={"var(--color-brand)"} size={40} />
        <p className="font-mono relative top-24 left-6 dark:text-white">Connecting to the blockchain...</p>
      </div>
    )

  if (loading === false && contractInfo) {
    const { address, baseUri, cost, totalSupply, maxSupply, maxMintAmount } = contractInfo

    return (
      <Main title='DeezNutz NFTs' titleSuffix={false}>
        <h1 className="text-center">DeezNutz NFT collection</h1>
        <p className="text-lg italic text-center">&ldquo;Algorithmically generated NFT ball sacks&rdquo;</p>

        <div className="text-lg text-center mt-16 bg-gray-50 rounded shadow p-8 md:w-1/2 dark:bg-gray-800 dark:text-white">
          <p>
            DeezNutz is a collection of {maxSupply.toNumber()} unique Digital Collectibles, living on the Polygon blockchain.
            Claim your very own today. Prices stay the same for all initial NFTs.
          </p>
          <p className="my-4">
            Special Mint Price: <span className="font-bold text-brand">{ethers.utils.formatEther(cost)} ETH</span><br />
          </p>
          <Link href="/mint">
            <a>
              <button className="mt-4 md:mt-0 button">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                <span>Mint Now!</span>
              </button>
            </a>
          </Link>
        </div>

        <div className="my-8">
          <Image src={"/pattern.png"} width={600} height={600} alt={"Nuts Pattern"} />
        </div>

      </Main>
    )
  }
}


// export async function getStaticProps(context) {
//   const res = await fetch(`https://deez-nutz.vercel.app/api/1`)
//   const nut = await res.json()

//   if (!nut) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { nut }, // will be passed to the page component as props
//   }
// }
