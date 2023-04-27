import Web3Helper from '@/helper/Web3Heper';
import { Button, Divider, Card, Space, InputNumber, Input } from 'antd';
import { useEffect, useState } from 'react';
let web3 = Web3Helper.instance();

type TLoginInfo = {
  chainId: number;
  blockNumber: number;
  blockTimestamp: string | number;
  balance: string;
};

let contractLesson6ERC20 = Web3Helper.getContractLesson6ERC20();

export default function HomeWork3(props: {}) {
  let [info, setInfo] = useState<{
    tokenSymbol: string;
    totalSupply: string;
  }>();
  let [queryAddress, setQueryAddress] = useState<string>('0x5Ee9F4Fe59aDd6b33bbe41fDaa26BC43af51681c');
  let fresh = async () => {
    let tokenSymbol = await contractLesson6ERC20.methods.symbol().call();
    let totalSupply = await contractLesson6ERC20.methods.totalSupply().call();
    setInfo({
      tokenSymbol: tokenSymbol,
      totalSupply: totalSupply,
    });
  };
  useEffect(() => {
    fresh();
    let intervalId = setInterval(fresh, 3000); //不做事件响就了，就 3 秒一刷
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Card title="作业3：前端可读取当前合约的最新状态（totalSupply），可读取输入的账户地址当前余额。" className="mt-3">
      <div className="">
        <div className="flex flex-row  mt-2">
          <div className="flex-1">单位</div>
          <div className="flex-1 text-gray-400">{info?.tokenSymbol}</div>
        </div>
        <div className="flex flex-row  mt-2">
          <div className="flex-1">总供应</div>
          <div className="flex-1 text-gray-400">{info?.totalSupply}</div>
        </div>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={queryAddress}
            onChange={(e) => {
              setQueryAddress(e.target.value);
            }}
          />
          <Button
            type="primary"
            onClick={async () => {
              let result = await contractLesson6ERC20.methods.balanceOf(queryAddress).call();
              console.log('余额：', result);
              alert('余额：' + JSON.stringify(result, null, 2));
            }}
          >
            查询
          </Button>
        </Space.Compact>
      </div>
    </Card>
  );
}
