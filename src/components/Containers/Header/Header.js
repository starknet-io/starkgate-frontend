import React from 'react';

import StarkNetLogoPath from '../../../assets/img/starknet.png';
import {ChainType} from '../../../enums';
import {toClasses} from '../../../utils';
import {WalletButton} from '../../Features';
import {useWallets} from '../../Features/Wallet/Wallet.hooks';
import {STARKNET_LOGO_SIZE} from './Header.constants';
import styles from './Header.module.scss';
import {CHAIN_TXT} from './Header.strings';

export const Header = () => {
  const {chainName} = useWallets();

  return (
    <div className={toClasses(styles.header, 'row')}>
      <div className={toClasses(styles.left, 'row')}>
        <img alt="" height={STARKNET_LOGO_SIZE} src={StarkNetLogoPath} />
        {chainName && (
          <div className={styles.chain}>
            {chainName !== ChainType.MAIN.name && CHAIN_TXT(chainName)}
          </div>
        )}
      </div>
      <div className={toClasses(styles.right, 'row')}>
        <WalletButton />
      </div>
    </div>
  );
};
