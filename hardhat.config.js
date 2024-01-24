require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: "https://optimism-mainnet.infura.io/v3/d586f648ae834bc3998785e95c3eef8c",
      },
      chainId: 10,
    },
  },
};
