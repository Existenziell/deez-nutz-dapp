import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
import getContractInfo from '../lib/getContractInfo'
import Image from 'next/image'
import Main from '../components/Main'
import Specs from '../components/Specs'
// import { useMoralis } from "react-moralis"
// import Moralis from 'moralis'

import { deeznutzAddress } from '../config'
import DeezNutz from '../artifacts/contracts/DeezNutzNFT.sol/DeezNutzNFT.json'

const Mint = () => {

  const [loading, setLoading] = useState(true)
  const [contractInfo, setContractInfo] = useState({})
  const [mintAmount, setMintAmount] = useState(1)

  const [minting, setMinting] = useState(false)
  const [mintingSuccess, setMintingSuccess] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [feedback, setFeedback] = useState("")
  const [networkInfo, setNetworkInfo] = useState("")


  useEffect(() => {
    async function fetchInfo() {
      const info = await getContractInfo()
      setContractInfo(info)
      setLoading(false)
    }
    fetchInfo()

    window.ethereum.on('accountsChanged', function (accounts) {
      // console.log("accountsChanged", accounts)
      setMinting(false)
    })

    window.ethereum.on('chainChanged', function (chainId) {
      // console.log('chainChanged', chainId)
      setMinting(false)
    })

  }, [])

  // const { authenticate, isAuthenticated, user } = useMoralis()
  // if (!isAuthenticated) {
  //   return (
  //     <div>
  //       <button onClick={() => authenticate()}>Authenticate with Metamask</button>
  //     </div>
  //   )
  // }
  // const getUserTokens = async () => {
  //   const options = { chain: 'mumbai', address: '0x9153Fb4f3e74795b1250D9bd8f4db9A79fab29f9' }
  //   const balances = await Moralis.Web3.getAllERC20(options)
  //   const b = await balances
  //   return balances
  // }
  // console.log(getUserTokens())

  async function mint() {
    setMinting(true)
    // Check MetaMask
    const eth = await detectEthereumProvider()
    if (eth) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", [])

      // const nodeUrl = `https://speedy-nodes-nyc.moralis.io/661d2cac001d8e6c33d63f3a/polygon/mumbai`
      // const provider = new ethers.providers.JsonRpcProvider(nodeUrl)
      // console.log(provider)

      const network = await provider.getNetwork()
      if (network.chainId == 80001) {
        const signer = provider.getSigner()
        // Since the third argument is signer, the contract data can be manipulated
        const contract = new ethers.Contract(deeznutzAddress, DeezNutz.abi, signer)
        const address = await signer.getAddress()
        // const accounts = await provider.request({ method: 'eth_requestAccounts' })
        const transaction = await contract.mint(address, mintAmount)
        await transaction.wait()
          .then((receipt) => {
            setMintingSuccess(true)
            setMinting(false)
            setFeedback("Congratulations, you are now the owner of your very own DeezNutz NFT!")
            setTxHash(receipt.transactionHash)
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

  if (loading)
    return (
      <div className="flex flex-col items-center mt-24">
        <ClimbingBoxLoader color={"var(--color-brand)"} size={40} />
        <p className="font-mono relative top-24 left-6 dark:text-white">Connecting to the blockchain...</p>
      </div>
    )

  if (loading === false && contractInfo) {
    const { address, baseUri, cost, totalSupply, maxSupply, maxMintAmount } = contractInfo

    return (
      <Main title='Mint' titleSuffix={true}>

        <div className="flex flex-col md:flex-row items-center justify-center mt-16 mb-4 w-full">

          <div className="image-wrapper text-center min-w-max mx-auto md:mr-16">
            <Image src={'/animated.gif'} width={425} height={515} alt={"Animated DeezNutz "} />
          </div>

          {(!mintingSuccess && !minting) &&
            <div>
              <h1 className="mb-8 mt-16 md:mt-0 w-4/5 mx-auto text-4xl text-center">A total of <span className="text-brand">{maxSupply.toNumber()}</span> unique DeezNutz Tokens are ready to be minted!</h1>
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
                  <span className="whitespace-nowrap">Get Lucky</span>
                </button>

                <p className="text-sm md:ml-8 mt-4 md:mt-0">
                  <span className="font-bold block">Cost:</span>
                  {mintAmount * ethers.utils.formatEther(cost)} ETH<br />+ gas fee.
                </p>
              </section>
            </div>
          }

          {minting &&
            <div className="flex flex-col items-center justify-center mb-8 flex-grow">
              <ClimbingBoxLoader color={"var(--color-brand)"} loading={minting} size={40} />
              <p className="mt-16 font-mono">Minting in progress...<br />Waiting for Network confirmation.</p>
              <p className="font-mono">{networkInfo}</p>
            </div>
          }

          {mintingSuccess &&
            <div className="text-center">
              <p className="text-brand text-4xl">{feedback}</p>
              <p className="font-mono mt-8">Transaction hash: (click to verify)<br /><a href={`https://mumbai.polygonscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a></p>
            </div>
          }
        </div>

        <Specs contractInfo={contractInfo} />

      </Main>
    )
  }

}

export default Mint
