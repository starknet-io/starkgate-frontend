import React from 'react';

import {LINKS} from '../../../constants';
import {useTransactions} from '../../../providers/TransactionsProvider';
import {useWallets} from '../../../providers/WalletsProvider';
import {
  AccountAddress,
  BackButton,
  LogoutButton,
  Menu,
  MenuTitle,
  TransferLog,
  TransferLogContainer
} from '../../UI';
import {LinkButton} from '../../UI/LinkButton/LinkButton';
import {useBridgeActions} from '../Bridge/Bridge.hooks';
import {useTransferData} from '../Transfer/Transfer.hooks';
import styles from './Account.module.scss';
import {TITLE_TXT} from './Account.strings';

export const Account = () => {
  const {transactions} = useTransactions();
  const {showTransferMenu} = useBridgeActions();
  const {account, chainId, resetWallet} = useWallets();
  const {isEthereum, isStarknet} = useTransferData();

  const renderTransactions = () => {
    return transactions.length
      ? transactions.map((tx, index) => <TransferLog key={index} tx={tx} />)
      : null;
  };

  return (
    <Menu>
      <div className={styles.account}>
        <BackButton onClick={showTransferMenu} />
        <MenuTitle text={TITLE_TXT} />
        <AccountAddress address={account} />
        {isEthereum && (
          <LinkButton
            text={LINKS.ETHERSCAN.text}
            url={LINKS.ETHERSCAN.accountUrl(chainId, account)}
          />
        )}
        {isStarknet && (
          <LinkButton text={LINKS.VOYAGER.text} url={LINKS.VOYAGER.accountUrl(chainId, account)} />
        )}
        <TransferLogContainer>{renderTransactions()}</TransferLogContainer>
        <LogoutButton isDisabled={isStarknet} onClick={resetWallet} />
      </div>
    </Menu>
  );
};
