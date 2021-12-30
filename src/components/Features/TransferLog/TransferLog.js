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
import {WITHDRAWAL_BTN_TXT} from './TransferLog.strings';

export const TransferLog = ({transfer, onWithdrawClick}) => {
  const {symbol, timestamp, name, amount, status, eth_hash, starknet_hash} = transfer;
  const [sign, setSign] = useState('');
  const {action, isEthereum} = useTransferData();
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

  const renderEthereumTxButton = () => {
    return !eth_hash && isEthereum && isOnChain(status) ? (
      <WithdrawalButton onClick={onWithdrawClick} />
    ) : (
      <LinkButton
        isDisabled={!eth_hash}
        text={`${NetworkType.ETHEREUM.name} Tx`}
        url={LINKS.ETHERSCAN.txUrl(chainId, eth_hash)}
      />
    );
  };

  const renderStarknetTxButton = () => {
    return (
      <>
        <LinkButton
          isDisabled={isPending(status)}
          text={`${NetworkType.STARKNET.name} Tx`}
          url={LINKS.VOYAGER.txUrl(chainId, starknet_hash)}
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
            {renderEthereumTxButton()}
            {renderStarknetTxButton()}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

const WithdrawalButton = ({onClick}) => {
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
      text={WITHDRAWAL_BTN_TXT}
      onClick={onClick}
    />
  );
};

WithdrawalButton.propTypes = {
  onClick: PropTypes.func
};

TransferLog.propTypes = {
  transfer: PropTypes.object,
  onWithdrawClick: PropTypes.func
};
