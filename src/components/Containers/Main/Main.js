import React, {useEffect, useState} from 'react';

import {useVars, useWindowSize} from '../../../hooks';
import {useEthereumWallet, useStarknetWallet} from '../../../providers/WalletsProvider/hooks';
import {Bridge} from '../../Features';
import {Login} from '../../Features/Login';
import styles from './Main.module.scss';

export const Main = () => {
  const windowSize = useWindowSize();
  const {mainOffset} = useVars();
  const {isConnected: isEthereumConnected} = useEthereumWallet();
  const {isConnected: isStarknetConnected} = useStarknetWallet();
  const [height, setHeight] = useState(null);

  useEffect(() => {
    setHeight(document.body.offsetHeight - mainOffset);
  }, [windowSize]);

  return (
    <main className={styles.main} style={{height}}>
      {isEthereumConnected && isStarknetConnected ? <Bridge /> : <Login />}
    </main>
  );
};
