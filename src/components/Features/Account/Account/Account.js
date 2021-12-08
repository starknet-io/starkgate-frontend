import React from 'react';

import {useCombineWallets} from '../../../../providers/CombineWalletsProvider/hooks';
import {BackButton, Menu, MenuTitle} from '../../../UI';
import {useBridgeActions} from '../../Bridge/Bridge.hooks';
import {useTransferData} from '../../Transfer/Transfer/Transfer.hooks';
import {LinkButton} from '../LinkButton/LinkButton';
import {AccountAddress, LogoutButton, TransferLogContainer} from '../index';
import {LINKS} from './Account.constants';
import styles from './Account.module.scss';
import {TITLE_TXT} from './Account.strings';

export const Account = () => {
  const {showTransferMenu} = useBridgeActions();
  const {account, chainName, resetWallet} = useCombineWallets();
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
