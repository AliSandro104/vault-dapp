require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Optional: only if you use environment variables

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", // or your chosen version
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};