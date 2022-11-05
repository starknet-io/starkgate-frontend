import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {
  isOnChain,
  isRejected,
  NetworkType,
  TransactionStatus,
  TransactionStatusFriendlyMessage,
  TransactionStatusStep
} from '../../../enums';
import {useColors, useEnvs, useTransferLogTranslation} from '../../../hooks';
import {useTransfer} from '../../../providers/TransferProvider';
import {getFullTime, toClasses} from '../../../utils';
import {Button, CryptoLogo, CryptoLogoSize} from '../../UI';
import {LinkButton} from '../../UI/LinkButton/LinkButton';
import styles from './TransferLog.module.scss';

export const TransferLog = ({transfer, onCompleteTransferClick, onTxClick}) => {
  const {voyagerTxUrl, etherscanTxUrl} = useEnvs();
  const {symbol, timestamp, name, amount, status, l1hash, l2hash} = transfer;
  const [sign, setSign] = useState('');
  const {action, isL1} = useTransfer();

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
        url={etherscanTxUrl(l1hash)}
        onClick={onTxClick}
      />
    );
  };

  const renderL2TxButton = () => {
    return (
      <>
        <LinkButton
          isDisabled={TransactionStatusStep[status] > TransactionStatus.NOT_RECEIVED}
          text={`${NetworkType.L2.name} Tx`}
          url={voyagerTxUrl(l2hash)}
          onClick={onTxClick}
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
  const {completeTransferBtnTxt} = useTransferLogTranslation();
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
      text={completeTransferBtnTxt}
      onClick={onClick}
    />
  );
};

CompleteTransferButton.propTypes = {
  onClick: PropTypes.func
};

TransferLog.propTypes = {
  transfer: PropTypes.object,
  onCompleteTransferClick: PropTypes.func,
  onTxClick: PropTypes.func
};
