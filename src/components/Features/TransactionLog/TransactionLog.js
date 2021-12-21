import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {LINKS} from '../../../constants';
import {TransactionStatus} from '../../../enums';
import {useColors, useStrings} from '../../../hooks';
import {useWallets} from '../../../providers/WalletsProvider';
import {get24Time, getDate} from '../../../utils';
import {Button, CryptoLogo} from '../../UI';
import {CryptoLogoSize} from '../../UI/CryptoLogo/CryptoLogo.enums';
import {LinkButton} from '../../UI/LinkButton/LinkButton';
import {useTransferData} from '../Transfer/Transfer.hooks';
import styles from './TransactionLog.module.scss';
import {WITHDRAW_BTN_TXT} from './TransactionLog.strings';

export const TransactionLog = ({tx, onWithdrawClick}) => {
  const {symbol, timestamp, name, amount, status, eth_hash, starknet_hash} = tx;
  const [sign, setSign] = useState('');
  const {action, isEthereum} = useTransferData();
  const {chainId} = useWallets();

  useEffect(() => {
    setSign(tx.type === action ? '-' : '+');
  }, [action]);

  return (
    <>
      <div className={styles.transactionLog}>
        <div className={styles.left}>
          <CryptoLogo size={CryptoLogoSize.SMALL} symbol={symbol} />
          <div>
            {name}
            <div className={styles.data}>{`${getDate(timestamp)}, ${get24Time(timestamp)}`}</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.amount}>
            {sign} {amount} {symbol.toUpperCase()}
          </div>
          {status !== TransactionStatus.ACCEPTED_ON_L1 ? (
            <div className={styles.data}>{status.replaceAll('_', ' ')}</div>
          ) : (
            <div className={styles.links}>
              {eth_hash && (
                <LinkButton
                  text={LINKS.ETHERSCAN.text}
                  url={LINKS.ETHERSCAN.txUrl(chainId, eth_hash)}
                />
              )}
              {!eth_hash && isEthereum && <WithdrawButton onClick={onWithdrawClick} />}
              <LinkButton
                text={LINKS.VOYAGER.text}
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

const WithdrawButton = ({onClick}) => {
  const {colorBeta, colorAlpha3} = useColors();
  return (
    <Button
      colorBackground={colorAlpha3}
      colorBorder={colorBeta}
      colorText={colorBeta}
      height={10}
      style={{
        padding: '14px'
      }}
      text={WITHDRAW_BTN_TXT}
      onClick={onClick}
    />
  );
};

WithdrawButton.propTypes = {
  onClick: PropTypes.func
};

TransactionLog.propTypes = {
  tx: PropTypes.object,
  onWithdrawClick: PropTypes.func
};
