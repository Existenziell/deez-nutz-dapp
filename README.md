# DeezNutz NFT dApp

Built with Solidity, Next.js, Hardhat, IPFS, Tailwind

1. Setup

```sh
npm install
```

2. Start the local Hardhat node

```sh
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the app

```
npm run dev
```

## Configuration

To deploy to Polygon test or main networks, update the configurations located in **hardhat.config.js** to use a private key and, optionally, deploy to a private RPC like Infura or Moralis.


## Contract Deployment

We deploy using hardhat.

```sh
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
npx hardhat verify <ADDRESS> --network mumbai "DeezNutz NFT" "DNN" "https://deez-nutz.vercel.app/api/"
```
