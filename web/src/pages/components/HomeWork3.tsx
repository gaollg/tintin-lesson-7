import Web3Helper from '@/helper/Web3Heper';
import { Button, Divider, Card, Space, InputNumber, Input } from 'antd';
import { useEffect, useState } from 'react';
let web3 = Web3Helper.instance();

let contractLesson6ERC20 = Web3Helper.getContractLesson7ERC20V3Factory();

export default function HomeWork3(props: {}) {
  let [historyList, setHistoryList] = useState<string[]>([]);
  let fresh = async () => {
    let accounts = await Web3Helper.instance().eth.getAccounts();
    if (accounts.length == 0) {
      return;
    }
    let res = await contractLesson6ERC20.methods.getTokenByUser(accounts[0]).call();
    setHistoryList(res[0]);
    console.log(res);
  };
  useEffect(() => {
    fresh();
    // let intervalId = setInterval(fresh, 3000); //不做事件响就了，就 3 秒一刷
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, []);

  return (
    <Card title="发币记录" className="mt-3">
      {(() => {
        if (historyList.length == 0) {
          return <div>暂示发币</div>;
        }
        return (
          <div>
            {historyList.map((item, index) => {
              return (
                <div key={index}>
                  <a href={'https://mumbai.polygonscan.com/address/' + item + '#code'} target="_blank">
                    {item}
                  </a>
                </div>
              );
            })}
          </div>
        );
      })()}
    </Card>
  );
}
