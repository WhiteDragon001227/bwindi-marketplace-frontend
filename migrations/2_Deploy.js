const NFTCollection = artifacts.require("NFTCollection");
const BwindiSale = artifacts.require("BwindiSale");
const BwindiAuction = artifacts.require("BwindiAuction");
const NFTMarketplace = artifacts.require("NFTMarketplace");

module.exports = async function (deployer) {
  // await deployer.deploy(NFTCollection);

  // const deployedNFT = await NFTCollection.deployed();
  // const NFTAddress = deployedNFT.address;
  // await deployer.deploy(BwindiSale/* , NFTAddress */);
  await deployer.deploy(BwindiAuction/* , NFTAddress */);
};