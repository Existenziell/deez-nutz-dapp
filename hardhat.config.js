require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const fs = require('fs');

// const privateKey = fs.readFileSync(".secret").toString().trim() || "";
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
// const moralisId = fs.readFileSync(".moralisid").toString().trim() || "";

const privateKey = process.env.NEXT_ACCOUNT_SECRET || "";
const infuraId = process.env.NEXT_INFURA_ID || "";
const moralisId = process.env.NEXT_MORALIS_ID || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {

    // LOCAL
    hardhat: {
      chainId: 1337
    },

    // TESTNET
    mumbai: {
      // Infura
      url: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
      // Moralis
      // url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/polygon/mumbai`,
      // url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    },
    ropsten: {
      // url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/ropsten`,
      url: `https://ropsten.infura.io/v3/${infuraId}`,
      accounts: [privateKey]
    },
    rinkeby: {
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/rinkeby`,
      accounts: [privateKey]
    },
    goerli: {
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/goerli`,
      accounts: [privateKey]
    },
    kovan: {
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/kovan`,
      accounts: [privateKey]
    },

    // MAINNET
    polygon: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      // Moralis
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/polygon/mainnet`,
      // url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    },
    eth: {
      // Infura
      // url: `https://mainnet.infura.io/v3/${infuraId}`,
      // Moralis
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/mainnet`,
      // url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    // apiKey: 'UTJD3EC6SMFYZDJ77E7TTFGCKD1TN7N4XW' // Polygon
    apiKey: 'I539C4GRATCCH8ERJ8HT3H4JUTU8514WAS' // Ethereum
  }
};
