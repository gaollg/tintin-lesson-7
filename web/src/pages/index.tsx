import Web3 from 'web3';
import Web3Login from '@/components/Web3Login';
import { useState } from 'react';
import MintHistory from './components/MintHistory';
import HomeWork1 from './components/HomeWork1';
import MintPanel from './components/MintPanel';

export default function HomePage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  if (!window.ethereum) {
    return <div>未安装钱包, 请安装钱包后重试</div>;
  }

  return (
    <div>
      <Web3Login
        onLogin={() => {
          setIsLogin(true);
          console.log('xxxxxxxxxxx');
        }}
      />
      {(() => {
        if (!isLogin) {
          return <div></div>;
        }

        return (
          <div>
            <HomeWork1 />
            <MintPanel />
            <MintHistory />
          </div>
        );
      })()}
    </div>
  );
}
