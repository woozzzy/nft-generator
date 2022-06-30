/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    Ethereum: {
      url: 'https://eth-mainnet.public.blastapi.io',
      accounts: [PRIVATE_KEY]
    },
    Polygon: {
      url: 'https://eth-mainnet.public.blastapi.io',
      accounts: [PRIVATE_KEY]
    },
    PolygonMumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [PRIVATE_KEY]
    },
    KlaytnBaobab: {
      url: "https://api.baobab.klaytn.net:8651",
      accounts: [PRIVATE_KEY],
      gasPrice: 250000000000,
    },
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
}