import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import { Contract, ContractOptions } from 'web3-eth-contract';
import Lesson7ERC20V3FactoryAbiData from './Lesson7ERC20V3Factory.json';

let contractAddress = '0x86Dd4C46766228BA10c6d98AB3649E9772e07D35';
let instanceWeb3: Web3;

let commUseGas = (fromAddress: string, method: string, paramArray: any[]): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    let contractLesson6ERC20 = Web3Helper.getContractLesson7ERC20V3Factory();
    let fn = contractLesson6ERC20.methods[method];

    console.log(paramArray);
    let transferData = fn.apply({}, paramArray).encodeABI();

    let estimateGasRes = await instanceWeb3.eth.estimateGas({
      to: contractAddress,
      data: transferData,
      from: fromAddress,
      value: 0x0,
    });

    let chainId = await instanceWeb3.eth.getChainId();
    let gasPrice = await instanceWeb3.eth.getGasPrice();
    let nonce = await instanceWeb3.eth.getTransactionCount(fromAddress);
    let rawTransaction: TransactionConfig = {
      from: fromAddress,
      to: contractAddress,
      nonce: nonce, //instanceWeb3.utils.toHex(nonce),
      gasPrice: gasPrice,
      gas: estimateGasRes * 2,
      value: '0x0',
      data: transferData,
      chainId: chainId,
    };

    instanceWeb3.eth.sendTransaction(rawTransaction).on('transactionHash', (hash) => {
      console.log('txHash:', hash);
      resolve(hash);
    });
  });
};

let Web3Helper = {
  instance: (): Web3 => {
    if (instanceWeb3) {
      return instanceWeb3;
    }
    if (!window.ethereum) {
      throw `未安装钱包, 请安装钱包后重试`;
    }
    instanceWeb3 = new Web3(window.ethereum);
    return instanceWeb3;
  },
  getContractLesson7ERC20V3Factory: (): Contract => {
    let Contract = Web3Helper.instance().eth.Contract;
    //@ts-ignore
    let contract = new Contract(Lesson7ERC20V3FactoryAbiData.abi, contractAddress);
    return contract;
  },
  createStdERC20: async (param: {
    _erc20_template_: string;
    totalSupply: number;
    name: string;
    symbol: string;
    // decimals: number;
  }): Promise<string> => {
    let accounts = await instanceWeb3.eth.getAccounts();
    let result = await commUseGas(accounts[0], 'createStdERC20', [
      param._erc20_template_,
      param.totalSupply,
      param.name,
      param.symbol,
      0,
    ]);
    return result;
  },
};

export default Web3Helper;
