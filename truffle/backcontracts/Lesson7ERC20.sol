// SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

pragma solidity 0.8.19;

contract Lesson6ERC20 is ERC20, Ownable {
  using SafeMath for uint256;

  address public ownerAccount;
  address public feeAccount;

  uint256 public txFeeRatio;
  uint256 public burnRatio;

  bool public initialized;

  // 代理只能使用无参构造函数
  constructor() ERC20('', '') {}

  function init(
    address _creator,
    uint256 _totalSupply,
    string memory _name,
    string memory _symbol,
    uint8 _decimals
  ) public {
    require(!initialized, 'TOKEN_INITIALIZED');
    initialized = true;

    ownerAccount = _creator;
    feeAccount = _creator;
    txFeeRatio = 1;
    burnRatio = 1;

    //不可访问私有成员，也无 set 方法，放弃 openzeppelin。

    _mint(_creator, _totalSupply);
  }

  function mint(address account, uint256 amount) external onlyOwner {
    _mint(account, amount);
  }

  function burn(address account, uint256 burnAmount) external onlyOwner {
    _burn(account, burnAmount);
  }

  function transferWithTax(address to, uint256 amount) public virtual returns (bool) {
    //查询余额
    _spendAllowance(msg.sender, to, amount);

    //交易收取手续费
    uint256 txFee = amount.mul(txFeeRatio).div(1000);
    //燃烧掉费用
    uint256 burnAmount = amount.mul(burnRatio).div(1000);
    //真实金额
    uint256 realAmount = amount.sub(txFee).sub(burnAmount);

    _transfer(msg.sender, to, realAmount);
    if (txFee > 0) {
      _transfer(msg.sender, feeAccount, txFee);
    }
    if (burnAmount > 0) {
      _burn(msg.sender, burnAmount);
    }
    return true;
  }

  //设置地址和交易费比例
  function setProjectAddress(address _feeAccount, uint256 _txFeeRatio, uint256 _burnRatio) external onlyOwner {
    feeAccount = _feeAccount;
    txFeeRatio = _txFeeRatio;
    burnRatio = _burnRatio;
  }
}
