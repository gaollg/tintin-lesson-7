const Lesson4ERC20 = artifacts.require('Lesson4ERC20');

contract('Lesson4ERC20', (accounts) => {
  // console.log('Account', accounts.join('\n'));
  it('MintNFT', async () => {
    const instance = await Lesson4ERC20.deployed();

    const name = await instance.name.call();
    assert.equal(name, 'Study Mintable NFT');

    //转账并查账 accounts[1] 余额为 1000
    await instance.mint(accounts[1], 1000);
    const balance = await instance.balanceOf.call(accounts[1]);
    console.log(`accounts[1] balance = `, balance);
    assert.equal(balance, 1000);

    //TODO accounts[1] 转账 accounts[2] 1000，再查 accounts[1]==0 && accounts[2] == 998 && accounts[0]==1，并且销毁数量也是 1
    instance.transferFrom.call(accounts[1], accounts[2], 1000);
    // instance.transferFrom(accounts[2])
  });
});
