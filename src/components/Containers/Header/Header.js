import React from 'react';

import L2LogoPath from '../../../assets/img/starknet.png';
import {useL1Wallet, useL2Wallet, useWallets} from '../../../providers/WalletsProvider';
import {toClasses} from '../../../utils';
import {useBridgeActions} from '../../Features/Bridge/Bridge.hooks';
import {useIsL1, useIsL2} from '../../Features/Transfer/Transfer.hooks';
import {WalletButton} from '../../UI';
import {L2_LOGO_SIZE} from './Header.constants';
import styles from './Header.module.scss';
import {CHAIN_TXT} from './Header.strings';

export const Header = () => {
  const {chainName, isConnected} = useWallets();
  const {showAccountMenu, showTransferMenu} = useBridgeActions();
  const [, setL1] = useIsL1();
  const [, setL2] = useIsL2();
  const {account: l1Account, isConnected: isL1AccountConnected, config: l1Config} = useL1Wallet();
  const {account: l2Account, isConnected: isL2AccountConnected, config: l2Config} = useL2Wallet();

  const onL2WalletButtonClick = () => {
    setL2();
    showAccountMenu();
  };

  const onL1WalletButtonClick = () => {
    setL1();
    showAccountMenu();
  };

  const onLogoClick = () => {
    showTransferMenu();
  };

  return (
    <div className={toClasses(styles.header, 'row')}>
      <div className={toClasses(styles.left, 'row')}>
        <div className={toClasses(styles.logo, 'row')} onClick={onLogoClick}>
          <img alt="" height={L2_LOGO_SIZE} src={L2LogoPath} />
          <div className={styles.bridge}>Bridge</div>
        </div>
        {isConnected && (
          <div className={toClasses(styles.chain, 'row')}>{CHAIN_TXT(chainName)}</div>
        )}
      </div>

      <div className={toClasses(styles.right, 'row')}>
        {isL1AccountConnected && (
          <WalletButton
            account={l1Account}
            logoPath={l1Config?.logoPath}
            onClick={onL1WalletButtonClick}
          />
        )}
        {isL2AccountConnected && (
          <WalletButton
            account={l2Account}
            logoPath={l2Config?.logoPath}
            onClick={onL2WalletButtonClick}
          />
        )}
      </div>
    </div>
  );
};
