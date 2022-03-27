import React from 'react';
import useBreakpoint from 'use-breakpoint';

import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import {Breakpoint} from '../../../enums';
import {useMenu} from '../../../providers/MenuProvider';
import {useIsL1, useIsL2} from '../../../providers/TransferProvider';
import {useL1Wallet, useL2Wallet, useWallets} from '../../../providers/WalletsProvider';
import utils from '../../../utils';
import {WalletButton} from '../../UI';
import styles from './Header.module.scss';
import {CHAIN_TXT} from './Header.strings';

export const Header = () => {
  const {chainName, isConnected} = useWallets();
  const {showAccountMenu, showTransferMenu} = useMenu();
  const [, swapToL1] = useIsL1();
  const [, swapToL2] = useIsL2();
  const {account: l1Account, isConnected: isL1AccountConnected, config: l1Config} = useL1Wallet();
  const {account: l2Account, isConnected: isL2AccountConnected, config: l2Config} = useL2Wallet();
  const {breakpoint} = useBreakpoint(Breakpoint);

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
    <div className={utils.object.toClasses(styles.header, styles[breakpoint.toLowerCase()], 'row')}>
      <div className={utils.object.toClasses(styles.left, 'row')}>
        <div className={utils.object.toClasses(styles.logo, 'row')} onClick={onLogoClick}>
          <StarkGateLogo />
        </div>
        {isConnected && (
          <div className={utils.object.toClasses(styles.chain, 'row')}>{CHAIN_TXT(chainName)}</div>
        )}
      </div>

      <div className={utils.object.toClasses(styles.right, 'row')}>
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
