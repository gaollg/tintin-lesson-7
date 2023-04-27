import Web3Helper from '@/helper/Web3Heper';
import { Button, Divider, Card } from 'antd';
import { useEffect, useState } from 'react';
let web3 = Web3Helper.instance();

export default function HomeWork1(props: {}) {
  return (
    <Card title="得分点" className="mt-3">
      <div className="">
        CloneFactory:{' '}
        <a
          href="https://mumbai.polygonscan.com/address/0x7522C532B511446a2387748b81eB5E73E2231c80#code"
          target="_blank"
        >
          0x7522C532B511446a2387748b81eB5E73E2231c80
        </a>
        <br />
        ERC20 模板合约：
        <a
          href="https://mumbai.polygonscan.com/address/0x159288596C68dDc8a97E18ECdd3d2eB0d6b21616#code"
          target="_blank"
        >
          0x159288596C68dDc8a97E18ECdd3d2eB0d6b21616
        </a>
        <br />
        创建代币工厂合约：
        <a
          href="https://mumbai.polygonscan.com/address/0xa7c7c2886171160145810436481c62bdd8d6beec#code"
          target="_blank"
        >
          0xa7c7c2886171160145810436481c62bdd8d6beec
        </a>
        <br />
        工厂合约的初始化设置：
        <a
          href="https://github.com/gaollg/tintin-lesson-7/blob/main/truffle/migrations/4_deploy_Lesson7ERC20V3Factory.js"
          target="_blank"
        >
          github.com/gaollg/.../4_deploy_Lesson7ERC20V3Factory.js
        </a>
      </div>
      <div className="mt-4">
        合约发布记录：
        <a href="https://mumbai.polygonscan.com/address/0x1c4f4a2055a7a2138cb063617fed8955da4b0d45" target="_blank">
          0x1c4f4a2055a7a2138cb063617fed8955da4b0d45
        </a>
      </div>
    </Card>
  );
}
