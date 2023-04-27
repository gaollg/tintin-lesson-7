import Web3Helper from '@/helper/Web3Heper';
import { Button, Divider, Card } from 'antd';
import { useEffect, useState } from 'react';
let web3 = Web3Helper.instance();

type TLoginInfo = {
  chainId: number;
  blockNumber: number;
  blockTimestamp: string | number;
  balance: string;
};

let contractLesson6ERC20 = Web3Helper.getContractLesson6ERC20();

export default function HomeWork1(props: {}) {
  return (
    <Card title="作业1: 提交js交互的代码。部署带有增发与销毁功能的erc20合约至测试网" className="mt-3">
      <div className="">
        <div>
          合约：
          <a
            href="https://mumbai.polygonscan.com/address/0x86dd4c46766228ba10c6d98ab3649e9772e07d35#code"
            target="_blank"
          >
            0x86dd4c46766228ba10c6d98ab3649e9772e07d35
          </a>
        </div>
        <div>
          代码：
          <a href="https://github.com/gaollg/tintin-lesson-6/blob/main/src/helper/Web3Heper.ts#L10" target="_blank">
            https://github.com/gaollg/tintin-lesson-6/blob/main/src/helper/Web3Heper.ts#L10
          </a>
        </div>
      </div>
    </Card>
  );
}
