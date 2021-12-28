import { ethers } from 'ethers'
import { deeznutzAddress } from '../config'
import DeezNutzContract from '../artifacts/contracts/DeezNutzNFT.sol/DeezNutzNFT.json'

async function getContractInfo() {
  // local:
  // const provider = new ethers.providers.JsonRpcProvider()

  // const moralisId = process.env.NEXT_PUBLIC_MORALIS_ID
  // const nodeUrl = `https://speedy-nodes-nyc.moralis.io/661d2cac001d8e6c33d63f3a/polygon/mumbai`
  // const nodeUrl = `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/ropsten`
  const nodeUrl = `https://speedy-nodes-nyc.moralis.io/661d2cac001d8e6c33d63f3a/eth/rinkeby`
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl)

  // If the third argument is provider, the contract is read-only
  const contract = new ethers.Contract(deeznutzAddress, DeezNutzContract.abi, provider)

  const [totalSupply, baseURI, cost, maxSupply, maxMintAmount] =
    await Promise.all([
      contract.totalSupply(),
      contract.baseURI(),
      contract.cost(),
      contract.maxSupply(),
      contract.maxMintAmount(),
    ])

  const info = {
    address: contract.address,
    totalSupply,
    baseUri: baseURI,
    cost,
    maxSupply,
    maxMintAmount,
  }

  return info
}

export default getContractInfo
