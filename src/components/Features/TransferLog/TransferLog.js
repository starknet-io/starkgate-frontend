import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {LINKS} from '../../../constants';
import {
  isOnChain,
  isPending,
  isRejected,
  NetworkType,
  TransactionStatusFriendlyMessage
} from '../../../enums';
import {useColors} from '../../../hooks';
import {useWallets} from '../../../providers/WalletsProvider';
import {getFullTime, toClasses} from '../../../utils';
import {Button, CryptoLogo} from '../../UI';
import {CryptoLogoSize} from '../../UI/CryptoLogo/CryptoLogo.enums';
import {LinkButton} from '../../UI/LinkButton/LinkButton';
import {useTransferData} from '../Transfer/Transfer.hooks';
import styles from './TransferLog.module.scss';
import {COMPLETE_TRANSFER_BTN_TXT} from './TransferLog.strings';

export const TransferLog = ({transfer, onCompleteTransferClick}) => {
  const {symbol, timestamp, name, amount, status, l1hash, l2hash} = transfer;
  const [sign, setSign] = useState('');
  const {action, isL1} = useTransferData();
  const {chainId} = useWallets();

  useEffect(() => {
    setSign(transfer.type === action ? '-' : '+');
  }, [action]);

  const renderTransferStatus = () => {
    return !isOnChain(status) ? (
      <div className={toClasses(styles.data, isRejected(status) && styles.error)}>
        {TransactionStatusFriendlyMessage[status]}
      </div>
    ) : null;
  };

  const renderL1TxButton = () => {
    return !l1hash && isL1 && isOnChain(status) ? (
      <CompleteTransferButton onClick={onCompleteTransferClick} />
    ) : (
      <LinkButton
        isDisabled={!l1hash}
        text={`${NetworkType.L1.name} Tx`}
        url={LINKS.ETHERSCAN.txUrl(chainId, l1hash)}
      />
    );
  };

  const renderL2TxButton = () => {
    return (
      <>
        <LinkButton
          isDisabled={isPending(status)}
          text={`${NetworkType.L2.name} Tx`}
          url={LINKS.VOYAGER.txUrl(chainId, l2hash)}
        />
      </>
    );
  };

  return (
    <>
      <div className={styles.transferLog}>
        <div className={styles.left}>
          <CryptoLogo size={CryptoLogoSize.SMALL} symbol={symbol} />
          <div>
            {name}
            <div className={styles.data}>{`${getFullTime(timestamp)}`}</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.amount}>
            {sign} {amount} {symbol.toUpperCase()}
          </div>
          {renderTransferStatus()}
          <div className={styles.links}>
            {renderL1TxButton()}
            {renderL2TxButton()}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

const CompleteTransferButton = ({onClick}) => {
  const {colorBeta} = useColors();
  return (
    <Button
      colorBackground="transparent"
      colorBorder={colorBeta}
      colorText={colorBeta}
      height={10}
      style={{
        fontSize: '12px',
        padding: '14px'
      }}
      text={COMPLETE_TRANSFER_BTN_TXT}
      onClick={onClick}
    />
  );
};

CompleteTransferButton.propTypes = {
  onClick: PropTypes.func
};

TransferLog.propTypes = {
  transfer: PropTypes.object,
  onCompleteTransferClick: PropTypes.func
};
