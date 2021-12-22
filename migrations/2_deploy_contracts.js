const ZeNFT = artifacts.require("ZeNFT");
const zNFT = artifacts.require("zNFT");
const zRoyalties = artifacts.require("zRoyalties");


module.exports = async function (deployer, network, accounts) {
  // deployment steps
  await deployer.deploy(ZeNFT);
  await deployer.deploy(zNFT);
  await deployer.deploy
};