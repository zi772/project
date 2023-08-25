const warranties = artifacts.require("WarrantyContract");

module.exports = function (deployer) {
  deployer.deploy(warranties);
};
