import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import { Contract, ContractOptions } from 'web3-eth-contract';
import Lesson6ERC20AbiData from './Lesson6ERC20.json';

let contractAddress = '0x86Dd4C46766228BA10c6d98AB3649E9772e07D35';
let instanceWeb3: Web3;

let commUseGas = (method: string, fromAddress: string, toAddress: string, amount: string): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    let contractLesson6ERC20 = Web3Helper.getContractLesson6ERC20();
    let transferData = contractLesson6ERC20.methods[method](toAddress, instanceWeb3.utils.toWei(amount)).encodeABI();

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
  getContractLesson6ERC20: (): Contract => {
    let Contract = Web3Helper.instance().eth.Contract;
    //@ts-ignore
    let contract = new Contract(Lesson6ERC20AbiData.abi, contractAddress);
    return contract;
  },
  transfer: (fromAddress: string, toAddress: string, amount: string): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
      let contractLesson6ERC20 = Web3Helper.getContractLesson6ERC20();
      let transferData = contractLesson6ERC20.methods.transfer(toAddress, instanceWeb3.utils.toWei(amount)).encodeABI();

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
        alert('txHash:' + hash);
        resolve(hash);
      });
    });
  },
  mint: async (amount: string): Promise<string> => {
    let accounts = await instanceWeb3.eth.getAccounts();
    let result = await commUseGas('mint', accounts[0], accounts[0], amount);
    return result;
  },
  burn: async (amount: string): Promise<string> => {
    let accounts = await instanceWeb3.eth.getAccounts();
    let result = await commUseGas('burn', accounts[0], accounts[0], amount);
    return result;
  },
};

export default Web3Helper;
