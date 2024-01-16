import PropTypes from 'prop-types';
import {useEffect, useMemo, useState} from 'react';
import {addAddressPadding} from 'starknet';

import {TransferLog} from '@features';
import {
  useAccountTracking,
  useAccountTranslation,
  useColors,
  useCompleteTransferToL1
} from '@hooks';
import {useMenu, useTransfer, useTransferLog, useWallet} from '@providers';
import {useLogger} from '@starkware-webapps/ui';
import {evaluate, findIndexById} from '@starkware-webapps/utils';
import {
  AccountAddress,
  BackButton,
  BlockExplorer,
  Button,
  Menu,
  MenuTitle,
  TransferLogContainer
} from '@ui';

import styles from './Account.module.scss';

export const Account = ({transferId}) => {
  const logger = useLogger('Account');
  const [
    trackTxLinkClick,
    trackAccountLinkClick,
    trackViewTransfersLog,
    trackCompleteTransferClick,
    trackAddressCopied
  ] = useAccountTracking();
  const {titleTxt, logoutBtnTxt} = useAccountTranslation();
  const {colorIndigo, colorWhite} = useColors();
  const {showSourceMenu} = useMenu();
  const {account, logout} = useWallet();
  const {isL1, isL2, fromNetwork} = useTransfer();
  const completeTransferToL1 = useCompleteTransferToL1();
  const {transfers, fetchNextPage, isLoading, error} = useTransferLog();
  const [isDisconnecting, setIsDisconnecting] = useState();
  const address = useMemo(() => (isL2 ? addAddressPadding(account) : account), [account]);

  useEffect(() => {
    !account && showSourceMenu();
  }, [account]);

  const renderTransfers = () => {
    return transfers.length
      ? transfers.map(transfer => (
          <TransferLog
            key={transfer.id}
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

  const handleLogout = async () => {
    logger.log(`logout ${fromNetwork} wallet`);
    setIsDisconnecting(true);
    await logout();
    setIsDisconnecting(false);
    showSourceMenu();
  };

  return (
    <Menu>
      <div className={styles.accountMenu}>
        <BackButton onClick={() => showSourceMenu()} />
        <MenuTitle text={evaluate(titleTxt, {network: fromNetwork})} />
        <AccountAddress address={address} onClick={trackAddressCopied} />
        <BlockExplorer account={address} isL1={isL1} onClick={trackAccountLinkClick} />
        <TransferLogContainer
          isError={!!error && !transfers.length}
          isLoading={isLoading}
          transferIndex={findIndexById(transfers, transferId)}
          onScrollEnd={fetchNextPage}
          onShowTransfers={trackViewTransfersLog}
        >
          {renderTransfers()}
        </TransferLogContainer>
        <Button
          colorBackground={colorIndigo}
          colorBorder={colorIndigo}
          colorText={colorWhite}
          height={50}
          isLoading={isDisconnecting}
          style={{
            margin: '0',
            width: '100%',
            borderRadius: '7px'
          }}
          text={logoutBtnTxt}
          onClick={handleLogout}
        />
      </div>
    </Menu>
  );
};

Account.propTypes = {
  transferId: PropTypes.string
};
