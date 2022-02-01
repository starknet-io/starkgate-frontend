import React from 'react';

import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import {useL1Wallet, useL2Wallet, useWallets} from '../../../providers/WalletsProvider';
import {toClasses} from '../../../utils';
import {useBridgeActions} from '../../Features/Bridge/Bridge.hooks';
import {useIsL1, useIsL2} from '../../Features/Transfer/Transfer.hooks';
import {WalletButton} from '../../UI';
import styles from './Header.module.scss';
import {CHAIN_TXT} from './Header.strings';

export const Header = () => {
  const {chainName, isConnected} = useWallets();
  const {showAccountMenu, showTransferMenu} = useBridgeActions();
  const [, swapToL1] = useIsL1();
  const [, swapToL2] = useIsL2();
  const {account: l1Account, isConnected: isL1AccountConnected, config: l1Config} = useL1Wallet();
  const {account: l2Account, isConnected: isL2AccountConnected, config: l2Config} = useL2Wallet();

  const onL2WalletButtonClick = () => {
    swapToL2();
    showAccountMenu();
  };

  const onL1WalletButtonClick = () => {
    swapToL1();
    showAccountMenu();
  };

  const onLogoClick = () => {
    showTransferMenu();
  };

  return (
    <div className={toClasses(styles.header, 'row')}>
      <div className={toClasses(styles.left, 'row')}>
        <div className={toClasses(styles.logo, 'row')} onClick={onLogoClick}>
          <StarkGateLogo />
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
