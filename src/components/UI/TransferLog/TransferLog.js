import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {LINKS} from '../../../constants';
import {TransactionStatus} from '../../../enums';
import {useWallets} from '../../../providers/WalletsProvider';
import {useTransferData} from '../../Features/Transfer/Transfer.hooks';
import {CryptoLogoSize} from '../CryptoLogo/CryptoLogo.enums';
import {LinkButton} from '../LinkButton/LinkButton';
import {CryptoLogo} from '../index';
import styles from './TransferLog.module.scss';

export const TransferLog = ({tx}) => {
  const {symbol, timestamp, name, amount, status, eth_hash, starknet_hash} = tx;
  const [sign, setSign] = useState('');
  const {action} = useTransferData();
  const {chainId} = useWallets();

  useEffect(() => {
    setSign(tx.type === action ? '-' : '+');
  }, [action]);

  return (
    <>
      <div className={styles.transferLog}>
        <div className={styles.left}>
          <CryptoLogo size={CryptoLogoSize.SMALL} symbol={symbol} />
          <div>
            {name}
            <div className={styles.data}>{new Date(timestamp).toLocaleString()}</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.amount}>
            {sign} {amount} {symbol.toUpperCase()}
          </div>
          {status !== TransactionStatus.ACCEPTED_ON_L1 ? (
            <div className={styles.data}>{status.replace('_', ' ')}</div>
          ) : (
            <div>
              <LinkButton
                text={LINKS.ETHERSCAN.text}
                url={LINKS.ETHERSCAN.txUrl(chainId, eth_hash)}
              />
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

TransferLog.propTypes = {
  tx: PropTypes.object
};
