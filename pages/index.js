import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Web3Modal from "web3modal" //Used to connect to a users ehtereum wallet
import axios from 'axios'
import Image from 'next/image'
import convertTimestamp from '../lib/convertTimestamp'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"

// Will be populated once the smart contract is deployed.
import {
  deeznutzAddress
} from '../config'

// Import ABIs - JSON representation of our smart contracts - allows to interaction from a frontend application
// Have been compiled by hardhat
import DeezNutz from '../artifacts/contracts/DeezNutzNFT.sol/DeezNutzNFT.json'
// import Moralis from 'moralis'

export default function Home() {

  // Local state
  const [contractInfo, setContractInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [mintAmount, setMintAmount] = useState(1)
  const [mintedNfts, setMintedNfts] = useState([])
  const [revealing, setRevealing] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [minting, setMinting] = useState(false);
  const [nftsClaimed, setNftsClaimed] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Moralis.initialize('CyDwbVDgE1b9Y9eNQCWmbhwTsnpYAQh5Hdz8xwg1')
    getContractInfo()
  }, [nftsClaimed])

  async function getContractInfo() {
    // const provider = new ethers.providers.JsonRpcProvider()
    let provider = ethers.getDefaultProvider('ropsten');

    const contract = new ethers.Contract(deeznutzAddress, DeezNutz.abi, provider)
    // console.log(contract);
    const info = {
      address: contract.address,
      totalSupply: await contract.totalSupply(),
      baseUri: await contract.baseURI(),
      cost: await contract.cost(),
      maxSupply: await contract.maxSupply(),
      maxMintAmount: await contract.maxMintAmount(),
    }

    await setContractInfo(info)
    setLoading(false)
  }

  async function revealMintedNfts() {
    // Hide if already revealed
    if (revealed) {
      setRevealed(false)
      return
    }
    setRevealing(true)
    const mintedNfts = []
    for (let i = 1; i <= contractInfo.totalSupply; i++) {
      const meta = await axios.get(`${contractInfo.baseUri}${i}`)
      mintedNfts.push(meta)
    }

    await setMintedNfts(mintedNfts)
    setRevealing(false)
    setRevealed(true)
  }

  async function mint() {
    setMinting(true)
    // Check MetaMask
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(deeznutzAddress, DeezNutz.abi, signer)
    const address = await signer.getAddress()
    // console.log(address, mintAmount);

    const transaction = await contract.mint(address, mintAmount)
    await transaction.wait()
      .then((receipt) => {
        // console.log(receipt);
        setFeedback("Congratulations, you are now the owner of your very own DeezNutz NFT!")
        setMinting(false)
        setNftsClaimed(true)
      })
  }

  const checkMintAmount = (amount) => {
    if (amount >= 1 && amount <= 20) {
      setMintAmount(amount)
    }
  }

  if (loading)
    return (
      <div className="top-1/2 left-1/2 absolute">
        <ClimbingBoxLoader color={"#8c00ff"} size={40} />
      </div>
    )

  if (loading === false && contractInfo) {
    const { address, baseUri, cost, totalSupply, maxSupply, maxMintAmount } = contractInfo
    return (
      <>
        <div className="w-full px-8 flex flex-col items-center pb-32">
          <h1 className="text-6xl font-bold text-brand mt-4">Welcome to DeezNutz</h1>
          <p className="my-2 text-lg italic">"Algorithmically generated NFT ball sacks"</p>
          <div className="flex flex-col md:flex-row items-center justify-center mt-16 mb-4">
            <div className="min-w-max border-2 rounded-lg mr-16">
              <Image src={'/gamify.png'} width={350} height={350} />
            </div>
            <div>
              <h1 className="mb-8 mt-16 md:mt-0 text-2xl text-center">A total of <span className="text-brand">{maxSupply.toNumber()}</span> unique DeezNutz Tokens are ready to be minted!</h1>
              <p className="text-lg text-center">
                DeezNutz is a collection of {maxSupply.toNumber()} unique Digital Collectibles, living on the Polygon blockchain.
                Claim your very own today. Prices stay the same for all initial NFTs. <br />
              </p>
              {nftsClaimed ?
                <p className="mt-12 text-brand text-2xl text-center border-2 border-dotted p-8">{feedback}</p>
                :
                <p className="bg-gray-100 shadow px-6 py-4 mt-8 text-center">
                  Special Mint Price: <span className="font-bold text-brand">{ethers.utils.formatEther(cost)} ETH</span><br />
                  Tokens minted so far: <span className="font-bold text-brand">{totalSupply.toNumber()}</span>
                  <span onClick={revealMintedNfts} className="block text-brand cursor-pointer">
                    {revealed ? `[Hide minted Tokens]` : `[Reveal minted Tokens]`}
                  </span>

                  {revealing &&
                    <span className="block mt-8 h-8">
                      <ClimbingBoxLoader color={"#8c00ff"} loading={revealing} size={10} />
                    </span>
                  }
                </p>
              }
            </div>
          </div>

          {revealed && !nftsClaimed ?
            <div>
              <h2 className="text-center">Minted NFTs:</h2>
              <ul className='flex flex-wrap justify-center items-center p-8 w-screen'>
                {mintedNfts.map(n => {
                  const { edition, name, description, image, date, dna } = n.data
                  return (
                    <li key={edition} className="mb-16 mr-6 text-center">
                      <Image src={image.toString()} width={200} height={200} />
                      <div className='mt-2'>
                        <h2 className="text-2xl">{name}</h2>
                        {/* <p className="text-xs">Created: {convertTimestamp(date)}</p> */}
                        <p className="text-xs">DNA: {dna}</p>
                        {/* <p>{nft.description}</p> */}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            :
            <div className="h-8"></div>
          }

          {!nftsClaimed && !minting &&
            <section className="flex items-center justify-center text-xl mb-8 border-2 border-dotted p-8">
              <p className="mr-8">Mint{' '}</p>
              <div className="inline-flex flex-col items-center justify-center w-6">
                <svg onClick={() => checkMintAmount(mintAmount + 1)} xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 cursor-pointer text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <input type="number" min="1" max={maxMintAmount} value={mintAmount} readOnly onChange={() => { }} className="pl-4 text-4xl text-center text-brand" />
                <svg onClick={() => checkMintAmount(mintAmount - 1)} xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 cursor-pointer text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <span className="ml-8 w-48">DeezNutz NFT{mintAmount > 1 ? `s` : null}</span>

              <button className="button" onClick={mint}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                <span>Get Lucky</span>
              </button>

              <p className="text-sm ml-8">
                <span className="font-bold block">Cost:</span>
                {mintAmount * ethers.utils.formatEther(cost)} ETH<br />+ gas fee.
              </p>
            </section>
          }
          {minting &&
            <div className="h-max flex flex-col items-center mb-8">
              <ClimbingBoxLoader color={"#8c00ff"} loading={minting} size={20} />
              <p className="mt-4 font-mono">Minting in progress, waiting for Network...</p>
            </div>
          }

          <section className="bg-gray-50 shadow px-8 py-3">
            <h2>Fair Distribution</h2>
            <p>We don't like Ponzis and this is why there are no bonding curves here. Buying a DeezNutz costs {ethers.utils.formatEther(cost)} ETH. There are no price tiers – same chances for everyone!</p>
            <h2>Specs</h2>
            <p>Each DeezNutz is unique and programmatically generated from over 120 possible traits. All Nutz are cute, but some have legendary rare traits! The Nutz are stored as ERC-721 tokens on the Polygon blockchain (cheaper gas fees!) and hosted on IPFS. Minting a Nut costs {ethers.utils.formatEther(cost)} ETH.</p>
            <h2>Verified Smart Contract Address:</h2>
            <p><a href={`https://ropsten.etherscan.io/address/${address}`} target="_blank" rel="noopener noreferrer">{address}</a></p>
          </section>
        </div>

        <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
      </>
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
