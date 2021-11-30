import React from 'react';

import {AccountAddress, LogoutButton, TransferLogContainer} from '.';
import {BackButton, Menu, MenuTitle} from '../../UI';
import {useBridgeActions} from '../Bridge/Bridge.hooks';
import {useTransferData} from '../Transfer/Transfer.hooks';
import {useWallets} from '../Wallet/Wallet.hooks';
import {LINKS} from './Account.constants';
import styles from './Account.module.scss';
import {TITLE_TXT} from './Account.strings';
import {LinkButton} from './LinkButton/LinkButton';

export const Account = () => {
  const {showTransferMenu} = useBridgeActions();
  const {account, chainName, resetWallet} = useWallets();
  const {isEthereum, isStarknet} = useTransferData();

  return (
    <Menu>
      <div className={styles.account}>
        <BackButton onClick={showTransferMenu} />
        <MenuTitle text={TITLE_TXT} />
        <AccountAddress address={account} />
        {isEthereum && (
          <LinkButton text={LINKS.ETHERSCAN.text} url={LINKS.ETHERSCAN.url(chainName, account)} />
        )}
        {isStarknet && <LinkButton text={LINKS.VOYAGER.text} url={LINKS.VOYAGER.url(account)} />}
        <TransferLogContainer />
        {isEthereum && <LogoutButton onClick={resetWallet} />}
      </div>
    </Menu>
  );
};
