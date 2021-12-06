import { ethers } from 'ethers'

const Specs = ({ contractInfo }) => {
  const { address, cost, totalSupply } = contractInfo

  return (
    <div className='bg-gray-100 shadow rounded p-2 text-left dark:bg-gray-800 dark:text-white'>
      <section className='bg-brand p-4 rounded md:w-full dark:bg-gray-800 dark:text-white'>
        <h2>Specs</h2>
        <p>Each DeezNutz is unique and programmatically generated from over 120 possible traits. All Nutz are cute, but some have legendary rare traits! The Nutz are stored as ERC-721 tokens on the Polygon blockchain (cheaper gas fees!) and hosted on IPFS. Minting a Nut costs {ethers.utils.formatEther(cost)} ETH.</p>
        <h2>Fair Distribution</h2>
        <p>No bonding curves, no secret presale, just unbiased fairness. Buying a DeezNutz costs {ethers.utils.formatEther(cost)} ETH. There are no price tiers – same chances for everyone!</p>
        <h2>Verified Smart Contract Address:</h2>
        <p><a href={`https://mumbai.polygonscan.com/address/${address}#code`} target='_blank' rel='noopener noreferrer'>{address}</a></p>
        <h2>Tokens minted so far: </h2>
        <p>{totalSupply.toNumber()}</p>
      </section>
    </div>
  )
}

export default Specs
