import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {LINKS} from '../../../constants';
import {NetworkType, TransactionStatus} from '../../../enums';
import {useColors} from '../../../hooks';
import {useWallets} from '../../../providers/WalletsProvider';
import {getFullTime} from '../../../utils';
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
          {status !== TransactionStatus.ACCEPTED_ON_L1 ? (
            <div className={styles.data}>{status && status.replaceAll('_', ' ')}</div>
          ) : (
            <div className={styles.links}>
              {eth_hash && (
                <LinkButton
                  text={`${NetworkType.ETHEREUM.name} Tx`}
                  url={LINKS.ETHERSCAN.txUrl(chainId, eth_hash)}
                />
              )}
              {!eth_hash && isEthereum && <WithdrawalButton onClick={onWithdrawClick} />}
              <LinkButton
                text={`${NetworkType.STARKNET.name} Tx`}
                url={LINKS.VOYAGER.txUrl(chainId, starknet_hash)}
              />
            </div>
          )}
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
