import PropTypes from 'prop-types';
import React from 'react';

import {track, TrackEvent} from '../../../analytics';
import constants from '../../../config/constants';
import envs from '../../../config/envs';
import {useCompleteTransferToL1} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useTransfer} from '../../../providers/TransferProvider';
import {useAccountTransfersLog} from '../../../providers/TransfersLogProvider';
import {useWallets} from '../../../providers/WalletsProvider';
import utils from '../../../utils';
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
import {TITLE_TXT} from './Account.strings';

const {etherscanAccountUrl, voyagerAccountUrl} = envs;

const {ETHERSCAN, VOYAGER} = constants;

export const Account = ({transferId}) => {
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
            onTxClick={onTxClick}
          />
        ))
      : null;
  };

  const onTxClick = () => {
    track(TrackEvent.ACCOUNT.TX_LINK_CLICK);
  };

  const onCompleteTransferClick = transfer => {
    track(TrackEvent.ACCOUNT.COMPLETE_TRANSFER_CLICK);
    completeTransferToL1(transfer);
  };

  const onAccountLinkClick = () => {
    track(TrackEvent.ACCOUNT.ACCOUNT_LINK_CLICK);
  };

  const onShowTransfers = () => {
    track(TrackEvent.ACCOUNT.VIEW_TRANSFERS_LOG);
  };

  const onAccountAddressClick = () => {
    track(TrackEvent.ACCOUNT.ADDRESS_COPIED);
  };

  return (
    <Menu>
      <div>
        <BackButton onClick={() => showTransferMenu()} />
        <MenuTitle text={TITLE_TXT(fromNetwork.name)} />
        <AccountAddress address={account} onClick={onAccountAddressClick} />
        {isL1 && (
          <LinkButton
            text={ETHERSCAN}
            url={etherscanAccountUrl(account)}
            onClick={onAccountLinkClick}
          />
        )}
        {isL2 && (
          <LinkButton
            text={VOYAGER}
            url={voyagerAccountUrl(account)}
            onClick={onAccountLinkClick}
          />
        )}
        <TransferLogContainer
          transferIndex={utils.object.findIndexById(transfers, transferId)}
          onShowTransfers={onShowTransfers}
        >
          {renderTransfers()}
        </TransferLogContainer>
        <LogoutButton isDisabled={isL2} onClick={resetWallet} />
      </div>
    </Menu>
  );
};

Account.propTypes = {
  transferId: PropTypes.string
};
