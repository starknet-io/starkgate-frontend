import React from 'react';

import {toChainName} from '../../../enums';
import {useTransactions} from '../../../providers/TransactionsProvider';
import {useWallets} from '../../../providers/WalletsProvider';
import {
  BackButton,
  Menu,
  MenuTitle,
  AccountAddress,
  LogoutButton,
  TransferLog,
  TransferLogContainer
} from '../../UI';
import {LinkButton} from '../../UI/LinkButton/LinkButton';
import {useBridgeActions} from '../Bridge/Bridge.hooks';
import {useTransferData} from '../Transfer/Transfer.hooks';
import {LINKS} from './Account.constants';
import styles from './Account.module.scss';
import {TITLE_TXT} from './Account.strings';

export const Account = () => {
  const transactions = useTransactions();
  const {showTransferMenu} = useBridgeActions();
  const {account, chainId, resetWallet} = useWallets();
  const {isEthereum, isStarknet} = useTransferData();

  const renderTransactions = () => {
    return transactions.length
      ? transactions.map((tx, index) => {
          return <TransferLog key={index} />;
        })
      : null;
  };

  let chainName = toChainName(chainId);
  chainName += chainName && '.';

  return (
    <Menu>
      <div className={styles.account}>
        <BackButton onClick={showTransferMenu} />
        <MenuTitle text={TITLE_TXT} />
        <AccountAddress address={account} />
        {isEthereum && (
          <LinkButton text={LINKS.ETHERSCAN.text} url={LINKS.ETHERSCAN.url(chainName, account)} />
        )}
        {isStarknet && (
          <LinkButton text={LINKS.VOYAGER.text} url={LINKS.VOYAGER.url(chainName, account)} />
        )}
        <TransferLogContainer>{renderTransactions()}</TransferLogContainer>
        <LogoutButton isDisabled={isStarknet} onClick={resetWallet} />
      </div>
    </Menu>
  );
};
