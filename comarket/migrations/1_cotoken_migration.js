const cotoken = artifacts.require("cotoken");

module.exports = function (deployer) {
    deployer.deploy(cotoken);
};