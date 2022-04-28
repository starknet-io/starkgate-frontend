import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import utils from '../../../utils';
import {toClasses} from '../../../utils/object';
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
            <Loading size={LoadingSize.SMALL} />
          ) : (
            utils.wallet.shortenBalance(utils.wallet.formatBalance(balance))
          )}
          <div className={styles.symbol}>{symbol}</div>
        </div>
        <RefreshIcon size={18} onClick={onRefreshClick} />
      </div>
    </div>
  );
};

TokenBalance.propTypes = {
  tokenData: PropTypes.object,
  onRefreshClick: PropTypes.func
};
