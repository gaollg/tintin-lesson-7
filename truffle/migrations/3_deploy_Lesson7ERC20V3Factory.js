const Lesson7ERC20V3Factory = artifacts.require('Lesson7ERC20V3Factory');

module.exports = function (deployer) {
  deployer.deploy(Lesson7ERC20V3Factory);
};
