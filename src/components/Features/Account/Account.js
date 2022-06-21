import PropTypes from 'prop-types';
import React from 'react';

import {
  useAccountTracking,
  useCompleteTransferToL1,
  useConstants,
  useEnvs,
  useAccountTranslation
} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useTransfer} from '../../../providers/TransferProvider';
import {useAccountTransfersLog} from '../../../providers/TransfersLogProvider';
import {useWallets} from '../../../providers/WalletsProvider';
import {evaluate, findIndexById} from '../../../utils';
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

export const Account = ({transferId}) => {
  const {titleTxt} = useAccountTranslation();
  const [
    trackTxLinkClick,
    trackAccountLinkClick,
    trackViewTransfersLog,
    trackCompleteTransferClick,
    trackAddressCopied
  ] = useAccountTracking();
  const {etherscanAccountUrl, voyagerAccountUrl} = useEnvs();
  const {ETHERSCAN, VOYAGER} = useConstants();
  const {showTransferMenu} = useMenu();
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

  return (
    <Menu>
      <div>
        <BackButton onClick={() => showTransferMenu()} />
        <MenuTitle text={evaluate(titleTxt, {network: fromNetwork.name})} />
        <AccountAddress address={account} onClick={trackAddressCopied} />
        {isL1 && (
          <LinkButton
            text={ETHERSCAN}
            url={etherscanAccountUrl(account)}
            onClick={trackAccountLinkClick}
          />
        )}
        {isL2 && (
          <LinkButton
            text={VOYAGER}
            url={voyagerAccountUrl(account)}
            onClick={trackAccountLinkClick}
          />
        )}
        <TransferLogContainer
          transferIndex={findIndexById(transfers, transferId)}
          onShowTransfers={trackViewTransfersLog}
        >
          {renderTransfers()}
        </TransferLogContainer>
        <LogoutButton onClick={resetWallet} />
      </div>
    </Menu>
  );
};

Account.propTypes = {
  transferId: PropTypes.string
};
