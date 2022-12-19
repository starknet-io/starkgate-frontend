import {useLogger} from '@starkware-industries/commons-js-hooks';
import {evaluate, findIndexById} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {addAddressPadding} from 'starknet';

import {
  useAccountTracking,
  useAccountTranslation,
  useCompleteTransferToL1,
  useEnvs
} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useTransfer} from '../../../providers/TransferProvider';
import {useAccountTransfersLog} from '../../../providers/TransfersLogProvider';
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
import {TransferLog} from '../TransferLog/TransferLog';
import styles from './Account.module.scss';

export const Account = ({transferId}) => {
  const logger = useLogger('Account');
  const {titleTxt, btnTxt} = useAccountTranslation();
  const [
    trackTxLinkClick,
    trackAccountLinkClick,
    trackViewTransfersLog,
    trackCompleteTransferClick,
    trackAddressCopied
  ] = useAccountTracking();
  const {ETHERSCAN_ACCOUNT_URL, STARKSCAN_ACCOUNT_URL} = useEnvs();
  const {showSourceMenu} = useMenu();
  const {account, resetWallet} = useWallets();
  const {isL1, isL2, fromNetwork} = useTransfer();
  const transfers = useAccountTransfersLog(account);
  const completeTransferToL1 = useCompleteTransferToL1();

  useEffect(() => {
    if (!account) {
      showSourceMenu();
    }
  }, [account]);

  const renderTransfers = () => {
    return transfers.length
      ? transfers.map((transfer, index) => (
          <TransferLog
            key={index}
            transfer={transfer}
            onCompleteTransferClick={() => onCompleteTransferClick(transfer)}
            onTxClick={trackTxLinkClick}
          />
        ))
      : null;
  };

  const onCompleteTransferClick = transfer => {
    trackCompleteTransferClick();
    completeTransferToL1(transfer);
  };

  const handleLogout = () => {
    logger.log(`logout ${fromNetwork} wallet`);
    showSourceMenu();
    resetWallet();
  };

  const renderExplorers = () => {
    const explorersL1 = [{text: btnTxt, url: ETHERSCAN_ACCOUNT_URL(account)}];
    const explorersL2 = [{text: btnTxt, url: STARKSCAN_ACCOUNT_URL(account)}];
    const explorers = isL1 ? explorersL1 : explorersL2;

    return (
      <div className={styles.linkButtons}>
        {explorers.map(({text, url}) => (
          <LinkButton key={text} text={text} url={url} onClick={trackAccountLinkClick} />
        ))}
      </div>
    );
  };

  return (
    <Menu>
      <div className={styles.accountMenu}>
        <BackButton onClick={() => showSourceMenu()} />
        <MenuTitle text={evaluate(titleTxt, {network: fromNetwork})} />
        <AccountAddress
          address={isL2 ? addAddressPadding(account) : account}
          onClick={trackAddressCopied}
        />
        {renderExplorers()}
        <TransferLogContainer
          transferIndex={findIndexById(transfers, transferId)}
          onShowTransfers={trackViewTransfersLog}
        >
          {renderTransfers()}
        </TransferLogContainer>
        <LogoutButton onClick={handleLogout} />
      </div>
    </Menu>
  );
};

Account.propTypes = {
  transferId: PropTypes.string
};
