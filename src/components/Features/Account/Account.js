import React from 'react';

import {LINKS} from '../../../constants';
import {useTransfer} from '../../../hooks';
import {useAccountTransfers} from '../../../providers/TransfersProvider';
import {useWallets} from '../../../providers/WalletsProvider';
import {
  AccountAddress,
  BackButton,
  LogoutButton,
  Menu,
  MenuTitle,
  TransferLogContainer
} from '../../UI';
import {LinkButton} from '../../UI/LinkButton/LinkButton';
import {useBridgeActions} from '../Bridge/Bridge.hooks';
import {useTransferData} from '../Transfer/Transfer.hooks';
import {TransferLog} from '../TransferLog/TransferLog';
import styles from './Account.module.scss';
import {TITLE_TXT} from './Account.strings';

export const Account = () => {
  const {showTransferMenu} = useBridgeActions();
  const {account, chainId, resetWallet} = useWallets();
  const transfers = useAccountTransfers(account);
  const {isEthereum, isStarknet, fromNetwork} = useTransferData();
  const {finalizeTransferFromStarknet} = useTransfer();

  const renderTransfers = () => {
    return transfers.length
      ? transfers.map((transfer, index) => (
          <TransferLog
            key={index}
            transfer={transfer}
            onWithdrawClick={() => finalizeTransferFromStarknet(transfer)}
          />
        ))
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
        <TransferLogContainer>{renderTransfers()}</TransferLogContainer>
        <LogoutButton isDisabled={isStarknet} onClick={resetWallet} />
      </div>
    </Menu>
  );
};
