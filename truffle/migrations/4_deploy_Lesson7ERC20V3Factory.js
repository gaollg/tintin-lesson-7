const Lesson7ERC20V3Factory = artifacts.require('Lesson7ERC20V3Factory');

module.exports = function (deployer) {
  // 仅传递 cloneFactoryAddress 和费率，具体复制合约地址，由方法内传递。
  deployer.deploy(Lesson7ERC20V3Factory, '0x7522c532b511446a2387748b81eb5e73e2231c80', 0);
};
