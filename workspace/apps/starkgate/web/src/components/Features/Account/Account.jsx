import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {addAddressPadding} from 'starknet';

import {useAccountTracking, useAccountTranslation, useCompleteTransferToL1, useEnvs} from '@hooks';
import {useMenu, useTransfer, useTransferLog, useWallets} from '@providers';
import {useLogger} from '@starkware-webapps/ui';
import {evaluate, findIndexById} from '@starkware-webapps/utils';
import {
  AccountAddress,
  BackButton,
  LinkButton,
  LogoutButton,
  Menu,
  MenuTitle,
  TransferLogContainer
} from '@ui';

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
  const completeTransferToL1 = useCompleteTransferToL1();
  const {transfers, fetchNextPage, isLoading} = useTransferLog();

  useEffect(() => {
    !account && showSourceMenu();
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
          isLoading={isLoading}
          transferIndex={findIndexById(transfers, transferId)}
          onScrollEnd={fetchNextPage}
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
