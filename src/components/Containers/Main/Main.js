import React, {useEffect, useState} from 'react';
import {useBreakpoint} from 'use-breakpoint';

import {Breakpoints} from '../../../enums';
import {useVars} from '../../../hooks';
import {TokensProvider} from '../../../providers/TokensProvider';
import {useL1Wallet, useL2Wallet} from '../../../providers/WalletsProvider';
import {Bridge, Login} from '../../Features';
import styles from './Main.module.scss';

export const Main = () => {
  const {mainOffset, mainOffsetSmall} = useVars();
  const {isConnected: isL1Connected} = useL1Wallet();
  const {isConnected: isL2Connected} = useL2Wallet();
  const [height, setHeight] = useState(null);
  const {breakpoint} = useBreakpoint(Breakpoints);

  useEffect(() => {
    let offset = 0;
    offset = breakpoint === 'desktop' ? mainOffset : mainOffsetSmall;
    setHeight(document.body.offsetHeight - offset);
  }, [breakpoint]);

  return (
    <main className={styles.main} style={{height}}>
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
