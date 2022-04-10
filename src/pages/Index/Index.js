import React from 'react';

import {Bridge, Login} from '../../components/Features';
import {EventManagerProvider} from '../../providers/EventManagerProvider';
import {TokensProvider} from '../../providers/TokensProvider';
import {useL1Wallet, useL2Wallet} from '../../providers/WalletsProvider';
import styles from './Index.module.scss';

export const Index = () => {
  const {isConnected: isL1Connected} = useL1Wallet();
  const {isConnected: isL2Connected} = useL2Wallet();

  return (
    <main className={styles.main}>
      {isL1Connected && isL2Connected ? (
        <TokensProvider>
          <EventManagerProvider>
            <Bridge />
          </EventManagerProvider>
        </TokensProvider>
      ) : (
        <Login />
      )}
    </main>
  );
};
