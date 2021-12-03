const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contract with account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  const DeezNutz = await ethers.getContractFactory('DeezNutzNFT')
  const nutz = await DeezNutz.deploy('DeezNutz NFT', 'DNN', 'https://deez-nutz.vercel.app/api/')
  await nutz.deployed()
  console.log('DeezNutz deployed to:', nutz.address)

  const config = `export const deeznutzAddress = '${nutz.address}'`

  const data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
  console.log('Config written.')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
