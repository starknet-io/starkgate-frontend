import {evaluate, findIndexById} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import {
  useAccountTracking,
  useCompleteTransferToL1,
  useConstantsWrapper,
  useEnvsWrapper,
  useAccountTranslation
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
  const {titleTxt} = useAccountTranslation();
  const [
    trackTxLinkClick,
    trackAccountLinkClick,
    trackViewTransfersLog,
    trackCompleteTransferClick,
    trackAddressCopied
  ] = useAccountTracking();
  const {ETHERSCAN_ACCOUNT_URL, VOYAGER_ACCOUNT_URL} = useEnvsWrapper();
  const {ETHERSCAN, VOYAGER} = useConstantsWrapper();
  const {showSourceMenu} = useMenu();
  const {account, resetWallet} = useWallets();
  const {isL1, isL2, fromNetwork} = useTransfer();
  const transfers = useAccountTransfersLog(account);
  const completeTransferToL1 = useCompleteTransferToL1();

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
    showSourceMenu();
    resetWallet();
  };

  return (
    <Menu>
      <div className={styles.accountMenu}>
        <BackButton onClick={() => showSourceMenu()} />
        <MenuTitle text={evaluate(titleTxt, {network: fromNetwork})} />
        <AccountAddress address={account} onClick={trackAddressCopied} />
        {isL1 && (
          <LinkButton
            text={ETHERSCAN}
            url={ETHERSCAN_ACCOUNT_URL(account)}
            onClick={trackAccountLinkClick}
          />
        )}
        {isL2 && (
          <LinkButton
            text={VOYAGER}
            url={VOYAGER_ACCOUNT_URL(account)}
            onClick={trackAccountLinkClick}
          />
        )}
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
