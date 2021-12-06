import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import detectEthereumProvider from '@metamask/detect-provider'
import getContractInfo from '../lib/getContractInfo'
import DeezNutz from '../artifacts/contracts/DeezNutzNFT.sol/DeezNutzNFT.json'
import { deeznutzAddress } from '../config'
import Main from '../components/Main'
import Specs from '../components/Specs'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

const Mint = () => {
  const [loading, setLoading] = useState(true)
  const [contractInfo, setContractInfo] = useState({})
  const [mintAmount, setMintAmount] = useState(1)
  const [walletConnected, setWalletConnected] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [provider, setProvider] = useState()
  const [minting, setMinting] = useState(false)
  const [mintingSuccess, setMintingSuccess] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [feedback, setFeedback] = useState('')
  const [networkInfo, setNetworkInfo] = useState('')

  const chainId = 1337 // Local (Mumbai: 80001)  
  const router = useRouter()

  useEffect(() => {
    async function init() {
      const info = await getContractInfo()
      setContractInfo(info)
      await connectToWallet()
      setLoading(false)
    }
    init()

    if (window.ethereum) {
      window.ethereum.on('connect', function (account) {
        // console.log('Connected', accounts)
        router.reload(window.location.pathname)
      })

      window.ethereum.on('accountsChanged', function (accounts) {
        // console.log('accountsChanged', accounts)
        router.reload(window.location.pathname)
      })

      window.ethereum.on('chainChanged', function (chainId) {
        // console.log('chainChanged', chainId)
        router.reload(window.location.pathname)
      })
    }
  }, [])

  // Prompt user for account connections
  async function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])
  }

  async function connectToWallet() {
    // console.log("Connecting to wallet...")
    // Check MetaMask
    const metamask = await detectEthereumProvider()
    if (metamask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      // Prompt user for account connections
      try {
        await provider.send('eth_requestAccounts', [])
      } catch (error) {
        setLoading(false)
        setNetworkInfo("Please connect your account in Metamask.")
        return
      }

      const network = await provider.getNetwork()
      if (network.chainId === chainId) {
        const signer = provider.getSigner()
        let address = await signer.getAddress()
        setUserAddress(address)
        setWalletConnected(true)
        setProvider(provider)
        setWalletConnected(true)
        // console.log("Wallet connected!")
      } else {
        setNetworkInfo('Please change network to Polygon Testnet in Metamask.')
      }
    } else {
      setNetworkInfo('Please install Metamask to proceed.')
    }
  }

  async function mint() {
    setMinting(true)
    // Check Network again
    const network = await provider.getNetwork()
    if (network.chainId === chainId) {
      const signer = provider.getSigner()
      const contract = new ethers.Contract(deeznutzAddress, DeezNutz.abi, signer)
      const address = await signer.getAddress()
      const transaction = await contract.mint(address, mintAmount)

      await transaction.wait()
        .then((receipt) => {
          setMintingSuccess(true)
          setMinting(false)
          setFeedback('Congratulations, you are now the owner of your very own DeezNutz NFT!')
          setTxHash(receipt.transactionHash)
        })
    } else {
      // console.log('Please change network to Polygon in Metamask.')
      setNetworkInfo('Please change network to Polygon in Metamask.')
    }
  }

  const checkMintAmount = (amount) => {
    if (amount >= 1 && amount <= 20) {
      setMintAmount(amount)
    }
  }

  if (loading)
    return (
      <div className='flex flex-col items-center mt-24'>
        <ClimbingBoxLoader color={'var(--color-brand)'} size={40} />
        <p className='font-mono relative top-24 left-6 dark:text-white'>Connecting to the blockchain...</p>
      </div>
    )

  if (loading === false && contractInfo) {
    const { address, baseUri, cost, totalSupply, maxSupply, maxMintAmount } = contractInfo

    return (
      <Main title='Mint' titleSuffix={true}>

        <div className='flex flex-col md:flex-row items-center justify-center pt-16 mb-4 w-full'>

          <button className='absolute top-4 right-4 button border' onClick={connectWallet}>Connect Wallet</button>
          {/* <video src='animated.webm' controls={false} loop={true} autoPlay={true} muted className='' /> */}

          {(!mintingSuccess && !minting) &&
            <div>
              <h1 className='mb-8 mt-16 md:mt-0 w-4/5 mx-auto text-4xl text-center'>A total of {maxSupply.toNumber()} unique DeezNutz Tokens are ready to be minted!</h1>

              {walletConnected ?
                <section className='flex flex-col md:flex-row items-center justify-center text-xl mb-8 p-8 border-2 border-dotted dark:border-black dark:bg-gray-800 dark:text-white relative'>

                  <p className='absolute top-2 left-2 text-sm'>Your wallet address: {userAddress || ""}</p>

                  <p className='md:mr-8'>Mint{' '}</p>
                  <div className='inline-flex flex-col items-center justify-center w-8'>
                    <svg onClick={() => checkMintAmount(mintAmount + 1)} xmlns='http://www.w3.org/2000/svg' className='h-12 w-12 cursor-pointer text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                    </svg>
                    <input type='number' min='1' max={maxMintAmount} value={mintAmount} readOnly onChange={() => { }} className='pl-4 text-4xl text-center text-brand dark:bg-gray-800' />
                    <svg onClick={() => checkMintAmount(mintAmount - 1)} xmlns='http://www.w3.org/2000/svg' className='h-12 w-12 cursor-pointer text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>

                  <span className='text-center md:text-left md:ml-8 w-48'>DeezNutz NFT{mintAmount > 1 ? `s` : null}</span>

                  <button className='mt-4 md:mt-0 button border' onClick={mint}>
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'></path>
                    </svg>
                    <span className='whitespace-nowrap'>Get Lucky</span>
                  </button>

                  <p className='text-sm md:ml-8 mt-4 md:mt-0'>
                    <span className='font-bold block'>Cost:</span>
                    {mintAmount * ethers.utils.formatEther(cost)} ETH<br />+ gas fee.
                  </p>
                </section>
                :
                <div className='flex items-center justify-center text-xl mb-12'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  <p className='font-mono'>{networkInfo}</p>
                </div>
              }
            </div>
          }

          {minting &&
            <div className='flex flex-col items-center justify-center mb-8 flex-grow'>
              <ClimbingBoxLoader color={'white'} loading={minting} size={40} />
              <p className='mt-16 font-mono'>Minting in progress...<br />Waiting for Network confirmation.</p>
              <p className='font-mono'>{networkInfo}</p>
            </div>
          }

          {mintingSuccess &&
            <div className='text-center'>
              <p className='text-white text-4xl leading-snug'>{feedback}</p>
              <p className='font-mono mt-8'>Transaction hash: (click to verify)<br /><a href={`https://mumbai.polygonscan.com/tx/${txHash}`} target='_blank' rel='noopener noreferrer'>{txHash}</a></p>
            </div>
          }
        </div>

        <Specs contractInfo={contractInfo} />

      </Main>
    )
  }
}

export default Mint
