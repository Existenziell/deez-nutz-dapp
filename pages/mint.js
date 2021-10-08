import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Web3Modal from "web3modal" //Used to connect to a users ehtereum wallet
import axios from 'axios'
import Image from 'next/image'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
import Main from '../components/Main'
import detectEthereumProvider from '@metamask/detect-provider'

// Will be populated once the smart contract is deployed.
import { deeznutzAddress } from '../config'

// Import ABIs - JSON representation of our smart contracts - allows to interaction from a frontend application
// Have been compiled by hardhat
import DeezNutz from '../artifacts/contracts/DeezNutzNFT.sol/DeezNutzNFT.json'


const Mint = () => {

  const [loading, setLoading] = useState(true)
  const [contractInfo, setContractInfo] = useState({})
  const [mintAmount, setMintAmount] = useState(1)
  const [mintedNfts, setMintedNfts] = useState([])
  const [revealing, setRevealing] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [minting, setMinting] = useState(false);
  const [nftsClaimed, setNftsClaimed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [networkInfo, setNetworkInfo] = useState("");

  useEffect(() => {
    getContractInfo()
  }, [])

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
    const eth = await detectEthereumProvider()
    if (eth) {
      const nodeUrl = `https://speedy-nodes-nyc.moralis.io/661d2cac001d8e6c33d63f3a/polygon/mumbai`
      const provider = new ethers.providers.JsonRpcProvider(nodeUrl)
      // console.log(provider);
      const network = await provider.getNetwork()

      if (network.chainId == 80001) {
        // console.log("here");
        const signer = provider.getSigner()
        // Since the third argument is signer, the contract data can be manipulated
        const contract = new ethers.Contract(deeznutzAddress, DeezNutz.abi, signer)
        console.log(signer, contract);
        const address = await signer.getAddress()
        const accounts = await provider.request({ method: 'eth_requestAccounts' });

        console.log(address);
        const transaction = await contract.mint(address, mintAmount)
        await transaction.wait()
          .then((receipt) => {
            setFeedback("Congratulations, you are now the owner of your very own DeezNutz NFT!")
            setMinting(false)
            setNftsClaimed(true)
          })
      } else {
        // console.log("Please change network to Polygon in Metamask.")
        setNetworkInfo("Please change network to Polygon in Metamask.")
      }
    } else {
      // console.log('Please install MetaMask!')
      setNetworkInfo("Please install Metamask to proceed.")
    }
  }

  const checkMintAmount = (amount) => {
    if (amount >= 1 && amount <= 20) {
      setMintAmount(amount)
    }
  }

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
      <Main title='Mint' titleSuffix={true}>
        <div className="flex flex-col md:flex-row items-center justify-center mt-16 mb-4">
          <div className="image-wrapper text-center min-w-max mx-auto border-4 shadow-xl md:mr-16">
            <Image src={'/gamify.png'} width={350} height={350} alt={"NFT mint template"} />
          </div>
          <div>
            <h1 className="mb-8 mt-16 md:mt-0 w-4/5 mx-auto text-4xl text-center">A total of <span className="text-brand">{maxSupply.toNumber()}</span> unique DeezNutz Tokens are ready to be minted!</h1>

            {nftsClaimed ?
              <p className="mt-12 text-white bg-brand text-2xl text-center shadow p-8">{feedback}</p>
              :
              <div className="bg-gray-100 shadow p-4 text-left dark:bg-gray-800 dark:text-white">

                <section className="bg-gray-50 p-4 w-screen rounded md:w-full dark:bg-gray-800 dark:text-white">
                  <h2>Specs</h2>
                  <p>Each DeezNutz is unique and programmatically generated from over 120 possible traits. All Nutz are cute, but some have legendary rare traits! The Nutz are stored as ERC-721 tokens on the Polygon blockchain (cheaper gas fees!) and hosted on IPFS. Minting a Nut costs {ethers.utils.formatEther(cost)} ETH.</p>
                  <h2>Fair Distribution</h2>
                  <p>No bonding curves, no secret presale, just unbiased fairness. Buying a DeezNutz costs {ethers.utils.formatEther(cost)} ETH. There are no price tiers – same chances for everyone!</p>
                  <h2>Verified Smart Contract Address:</h2>
                  <p><a href={`https://mumbai.polygonscan.com/address/${address}#code`} target="_blank" rel="noopener noreferrer">{address}</a></p>
                  <h2>Tokens minted so far: </h2>
                  <p>{totalSupply.toNumber()}</p>
                </section>

                {/* <span onClick={revealMintedNfts} className="block text-brand cursor-pointer">
                  {revealed ? `[Hide minted Tokens]` : `[Reveal minted Tokens]`}
                </span>

                {revealing &&
                  <span className="block mt-8 h-8">
                    <ClimbingBoxLoader color={"var(--color-brand)"} loading={revealing} size={10} />
                  </span>
                } */}
              </div>
            }
          </div>
        </div>

        {
          (revealed && !nftsClaimed) ?
            <div>
              <h2 className="text-center">Minted NFTs:</h2>
              <ul className='flex flex-wrap justify-center items-center p-8 w-screen'>
                {mintedNfts.map(n => {
                  const { edition, name, description, image, date, dna } = n.data
                  return (
                    <li key={edition} className="mb-16 mr-6 text-center">
                      <Image src={image.toString()} width={200} height={200} alt={description} />
                      <div className='mt-2 dark:text-white'>
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

        {
          !nftsClaimed && !minting &&
          <section className="flex flex-col md:flex-row items-center justify-center text-xl mb-8 p-8 border-2 border-dotted dark:border-black dark:bg-gray-800 dark:text-white">
            <p className="md:mr-8">Mint{' '}</p>
            <div className="inline-flex flex-col items-center justify-center w-6">
              <svg onClick={() => checkMintAmount(mintAmount + 1)} xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 cursor-pointer text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <input type="number" min="1" max={maxMintAmount} value={mintAmount} readOnly onChange={() => { }} className="pl-4 text-4xl text-center text-brand dark:bg-gray-800" />
              <svg onClick={() => checkMintAmount(mintAmount - 1)} xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 cursor-pointer text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <span className="text-center md:text-left md:ml-8 w-48">DeezNutz NFT{mintAmount > 1 ? `s` : null}</span>

            <button className="mt-4 md:mt-0 button" onClick={mint}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <span>Get Lucky</span>
            </button>

            <p className="text-sm md:ml-8 mt-4 md:mt-0">
              <span className="font-bold block">Cost:</span>
              {mintAmount * ethers.utils.formatEther(cost)} ETH<br />+ gas fee.
            </p>
          </section>
        }

        {
          minting &&
          <div className="h-max flex flex-col items-center mb-8">
            <ClimbingBoxLoader color={"var(--color-brand)"} loading={minting} size={20} />
            <p className="mt-4 font-mono">Minting in progress, waiting for Network...</p>
            <p className="font-mono">{networkInfo}</p>
          </div>
        }

      </Main>
    )
  }

}

export default Mint
