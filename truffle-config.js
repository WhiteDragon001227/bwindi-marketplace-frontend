/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 18/12/2021 - 22:22:20
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('@truffle/hdwallet-provider');

const stringmen = 'raw ankle agent amount palm ginger brain angry hill mouse bounce system';
// const stringmen = 'aspect warrior abandon robust explain address six joy caution dial recipe moral';
const memonics = stringmen.trim()

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gasPrice: 100000000000,
      gas: 6721975 // gas limit
    },
    testnet: {
      provider: () => new HDWalletProvider(memonics, `https://speedy-nodes-nyc.moralis.io/aa1b4bcdff6d7647f78ad9db/bsc/testnet`),
      // `https://data-seed-prebsc-1-s1.binance.org:8545`
      // "https://speedy-nodes-nyc.moralis.io/aa1b4bcdff6d7647f78ad9db/bsc/testnet"
      network_id: 97,
      confirmations: 3,
      timeoutBlocks: 2000000,
      networkCheckTimeout: 10000000,
      skipDryRun: true,
    },
    bsc: {
      provider: () => new HDWalletProvider(memonics, 'https://bsc-dataseed1.binance.org'),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
