import React from 'react';

import StarkNetLogoPath from '../../../assets/img/starknet.png';
import {ChainType} from '../../../enums';
import {useCombineWallets} from '../../../providers/CombineWalletsProvider/hooks';
import {toClasses} from '../../../utils';
import {useBridgeActions} from '../../Features/Bridge/Bridge.hooks';
import {WalletButton} from '../../UI';
import {STARKNET_LOGO_SIZE} from './Header.constants';
import styles from './Header.module.scss';
import {CHAIN_TXT} from './Header.strings';

export const Header = () => {
  const {chainName, account, isConnected, config} = useCombineWallets();
  const {showAccountMenu} = useBridgeActions();

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
        {isConnected && (
          <WalletButton account={account} logoPath={config?.logoPath} onClick={showAccountMenu} />
        )}
      </div>
    </div>
  );
};
