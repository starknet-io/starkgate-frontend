import React from 'react';

import {TokensProvider} from '../../../providers/TokensProvider';
import {useL1Wallet, useL2Wallet} from '../../../providers/WalletsProvider';
import {Bridge, Login} from '../../Features';
import styles from './Main.module.scss';

export const Main = () => {
  const {isConnected: isL1Connected} = useL1Wallet();
  const {isConnected: isL2Connected} = useL2Wallet();

  return (
    <main className={styles.main}>
      {isL1Connected && isL2Connected ? (
        <TokensProvider>
          <Bridge />
        </TokensProvider>
      ) : (
        <Login />
      )}
    </main>
  );
};
