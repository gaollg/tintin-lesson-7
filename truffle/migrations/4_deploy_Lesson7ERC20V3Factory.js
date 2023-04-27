const Lesson7ERC20V3Factory = artifacts.require('Lesson7ERC20V3Factory');

module.exports = function (deployer) {
  deployer.deploy(Lesson7ERC20V3Factory, '0x7522c532b511446a2387748b81eb5e73e2231c80', 0);
};
