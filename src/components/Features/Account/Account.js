import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';

import {LINKS} from '../../../constants';
import {useCompleteTransferToL1} from '../../../hooks';
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

export const Account = menuProps => {
  const {showTransferMenu} = useBridgeActions();
  const {account, chainId, resetWallet} = useWallets();
  const transfers = useAccountTransfers(account);
  const {isL1, isL2, fromNetwork} = useTransferData();
  const completeTransferToL1 = useCompleteTransferToL1();
  const {transferId} = menuProps;
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const renderTransfers = () => {
    return transfers.length
      ? transfers.map((transfer, index) => (
          <TransferLog
            key={index}
            transfer={transfer}
            onCompleteTransferClick={() => completeTransferToL1(transfer)}
          />
        ))
      : null;
  };

  const findIndexById = (array, id) => {
    return array.findIndex(item => item.id === id);
  };

  useEffect(() => {
    if (transferId) {
      const highlightedIndex = findIndexById(transfers, transferId);
      highlightedIndex ? setHighlightedIndex(highlightedIndex) : '';
    }
  }, [transferId]);

  return (
    <Menu>
      <div className={styles.account}>
        <BackButton onClick={showTransferMenu} />
        <MenuTitle text={TITLE_TXT(fromNetwork.name)} />
        <AccountAddress address={account} />
        {isL1 && (
          <LinkButton
            text={LINKS.ETHERSCAN.text}
            url={LINKS.ETHERSCAN.accountUrl(chainId, account)}
          />
        )}
        {isL2 && (
          <LinkButton text={LINKS.VOYAGER.text} url={LINKS.VOYAGER.accountUrl(chainId, account)} />
        )}
        <TransferLogContainer highlighted={highlightedIndex}>
          {renderTransfers()}
        </TransferLogContainer>
        <LogoutButton isDisabled={isL2} onClick={resetWallet} />
      </div>
    </Menu>
  );
};

Account.propTypes = {
  menuProps: PropTypes.object
};
