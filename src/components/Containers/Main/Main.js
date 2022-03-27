import React, {useEffect, useState} from 'react';

import {useVars, useWindowSize} from '../../../hooks';
import {EventManagerProvider} from '../../../providers/EventManagerProvider';
import {TokensProvider} from '../../../providers/TokensProvider';
import {useL1Wallet, useL2Wallet} from '../../../providers/WalletsProvider';
import {Bridge, Login} from '../../Features';
import styles from './Main.module.scss';

export const Main = () => {
  const windowSize = useWindowSize();
  const {mainOffset} = useVars();
  const {isConnected: isL1Connected} = useL1Wallet();
  const {isConnected: isL2Connected} = useL2Wallet();
  const [height, setHeight] = useState(null);

  useEffect(() => {
    setHeight(document.body.offsetHeight - mainOffset);
  }, [windowSize]);

  return (
    <main className={styles.main} style={{height}}>
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
