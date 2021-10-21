const ZeNFT = artifacts.require("ZeNFT");

module.exports = async function (deployer, network, accounts) {
  // deployment steps
  await deployer.deploy(ZeNFT);
};