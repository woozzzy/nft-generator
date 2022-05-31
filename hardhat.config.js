/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-web3");
require('@nomiclabs/hardhat-truffle5');
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "Ethereum",
  gasReporter: {
    currency: "ETH",
    // coinmarketcap: "4d39447b-3aa9-4d95-ae47-5c4b6490c1be",
  },
  networks: {
    hardhat: {
    },
    Ethereum : {
      url: 'https://eth-mainnet.public.blastapi.io',
    },
    Polygon : {
      url: 'https://eth-mainnet.public.blastapi.io',
    },
    PolygonMumbai : {
      url: "https://matic-mumbai.chainstacklabs.com", 
      accounts: [PRIVATE_KEY]
    },
    KlaytnBaobab : {
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