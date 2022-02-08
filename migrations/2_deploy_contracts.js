const artifacts = require ("truffle");
const ZeNFT = artifacts.require("ZeNFT");
const zNFT = artifacts.require("zNFT");
const Market = artifacts.require("Market.sol");
const zRoyalties = artifacts.require("zRoyalties.sol");


module.exports = async function (deployer, network, accounts) {
  // deployment steps
  //await deployer.deploy(ZeNFT, {overwrite: false});
  await deployer.deploy(zNFT,{overwrite: false});
  //await deployeer.deploy(Market, {overwtite: false});
};