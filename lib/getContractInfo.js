
import { ethers } from 'ethers'
import { deeznutzAddress } from '../config'
import DeezNutzContract from '../artifacts/contracts/DeezNutzNFT.sol/DeezNutzNFT.json'

async function getContractInfo() {
  // const moralisId = process.env.NEXT_MORALIS_ID
  const nodeUrl = `https://speedy-nodes-nyc.moralis.io/661d2cac001d8e6c33d63f3a/polygon/mumbai`
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl)
  // provider is read-only, get a signer for on-chain transactions
  const signer = provider.getSigner()

  // local: 
  // const provider = new ethers.providers.JsonRpcProvider()

  // If the third argument is provider, the contract is read-only
  const contract = new ethers.Contract(deeznutzAddress, DeezNutzContract.abi, provider)
  const info = {
    address: contract.address,
    totalSupply: await contract.totalSupply(),
    baseUri: await contract.baseURI(),
    cost: await contract.cost(),
    maxSupply: await contract.maxSupply(),
    maxMintAmount: await contract.maxMintAmount(),
  }

  return info
}

export default getContractInfo
