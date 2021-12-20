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
  TransactionLogContainer
} from '../../UI';
import {LinkButton} from '../../UI/LinkButton/LinkButton';
import {useBridgeActions} from '../Bridge/Bridge.hooks';
import {TransactionLog} from '../TransactionLog/TransactionLog';
import {useTransferData} from '../Transfer/Transfer.hooks';
import styles from './Account.module.scss';
import {TITLE_TXT} from './Account.strings';

export const Account = () => {
  const {transactions} = useTransactions();
  const {showTransferMenu} = useBridgeActions();
  const {account, chainId, resetWallet} = useWallets();
  const {isEthereum, isStarknet, fromNetwork} = useTransferData();

  const renderTransactions = () => {
    return transactions.length
      ? transactions.map((tx, index) => <TransactionLog key={index} tx={tx} />)
      : null;
  };

  return (
    <Menu>
      <div className={styles.account}>
        <BackButton onClick={showTransferMenu} />
        <MenuTitle text={TITLE_TXT(fromNetwork.name)} />
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
        <TransactionLogContainer>{renderTransactions()}</TransactionLogContainer>
        <LogoutButton isDisabled={isStarknet} onClick={resetWallet} />
      </div>
    </Menu>
  );
};
