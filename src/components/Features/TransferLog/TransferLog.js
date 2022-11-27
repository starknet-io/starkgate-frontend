import {
  isOnChain,
  isRejected,
  NetworkType,
  TransactionStatus,
  TransactionStatusFriendlyMessage,
  TransactionStatusStep
} from '@starkware-industries/commons-js-enums';
import {getFullTime, toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {useColors, useEnvs, useTransferLogTranslation} from '../../../hooks';
import {useTransfer} from '../../../providers/TransferProvider';
import {Button, CircleLogo, CircleLogoSize} from '../../UI';
import {LinkButton} from '../../UI/LinkButton/LinkButton';
import styles from './TransferLog.module.scss';

export const TransferLog = ({transfer, onCompleteTransferClick, onTxClick}) => {
  const {STARKSCAN_TX_URL, STARKSCAN_ETH_TX_URL} = useEnvs();
  const {symbol, timestamp, name, amount, status, l1hash, l2hash} = transfer;
  const [sign, setSign] = useState('');
  const {action, isL1} = useTransfer();

  useEffect(() => {
    setSign(transfer.type === action ? '-' : '+');
  }, [action]);

  const renderTransferStatus = () => {
    return (
      <div className={toClasses(styles.data, isRejected(status) && styles.error)}>
        {!isOnChain(status)
          ? TransactionStatusFriendlyMessage[status || TransactionStatus.NOT_RECEIVED]
          : ''}
      </div>
    );
  };

  const renderL1TxButton = () => {
    return !l1hash && isL1 && isOnChain(status) ? (
      <CompleteTransferButton onClick={onCompleteTransferClick} />
    ) : (
      <LinkButton
        isDisabled={!l1hash}
        text={`${NetworkType.L1} Tx`}
        url={STARKSCAN_ETH_TX_URL(l1hash)}
        onClick={onTxClick}
      />
    );
  };

  const renderL2TxButton = () => {
    return (
      <LinkButton
        isDisabled={
          !l2hash ||
          !status ||
          TransactionStatusStep[status] < TransactionStatusStep[TransactionStatus.RECEIVED]
        }
        text={`${NetworkType.L2} Tx`}
        url={STARKSCAN_TX_URL(l2hash)}
        onClick={onTxClick}
      />
    );
  };

  return (
    <>
      <div className={styles.transferLog}>
        <div className={styles.left}>
          <CircleLogo path={`tokens/${symbol}`} size={CircleLogoSize.XS} />
          <div>
            <div className={styles.label}>{name}</div>
            <div className={styles.data}>{`${getFullTime(timestamp)}`}</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.label}>
            {sign} {amount} {symbol.toUpperCase()}
          </div>
          {renderTransferStatus()}
          <div className={styles.links}>
            {renderL1TxButton()}
            {renderL2TxButton()}
          </div>
        </div>
      </div>
    </>
  );
};

const CompleteTransferButton = ({onClick}) => {
  const {completeTransferBtnTxt} = useTransferLogTranslation();
  const {colorOrangeSoda} = useColors();

  return (
    <Button
      colorBackground="transparent"
      colorBorder={colorOrangeSoda}
      colorText={colorOrangeSoda}
      style={{
        fontSize: '12px',
        padding: '0 8px',
        lineHeight: '18px',
        fontWeight: '400',
        borderRadius: '5px',
        margin: '0'
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
