import {formatBalance, shortenBalance, toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import {Loading, LoadingSize, RefreshIcon} from '../index';
import styles from './TokenBalance.module.scss';

export const TokenBalance = ({tokenData, onRefreshClick}) => {
  const {symbol, isLoading, balance} = tokenData;
  const {balanceTitleTxt} = useTransferTranslation();

  return (
    <div className={toClasses(styles.tokenBalance, isLoading && styles.loading)}>
      <span>{balanceTitleTxt}</span>
      <div className={styles.balanceRow}>
        <div className={styles.balance}>
          {isLoading ? (
            <div className={styles.loading}>
              <Loading size={LoadingSize.XS} />
            </div>
          ) : (
            shortenBalance(formatBalance(balance))
          )}
          <div className={styles.symbol}>{symbol}</div>
        </div>
        <RefreshIcon size={10} onClick={onRefreshClick} />
      </div>
    </div>
  );
};

TokenBalance.propTypes = {
  tokenData: PropTypes.object,
  onRefreshClick: PropTypes.func
};
