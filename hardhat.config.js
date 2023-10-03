require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia/example"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
  //everytime we work with hardhat network , everytime we run a script, we run that script and hardhat network is deleted
  defaultNetwork:"hardhat",
  networks:{
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId:11155111,
    },
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    }
  },
  solidity: "0.8.19",
  etherscan:{
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter:{
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency:"USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  }

};
