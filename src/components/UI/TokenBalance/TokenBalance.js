import PropTypes from 'prop-types';
import React from 'react';

import utils from '../../../utils';
import {toClasses} from '../../../utils/object';
import {LoadingSize} from '../Loading/Loading.enums';
import {Loading, RefreshIcon} from '../index';
import styles from './TokenBalance.module.scss';
import {TITLE_TXT} from './TokenBalance.strings';

export const TokenBalance = ({tokenData, onRefreshClick}) => {
  const {symbol, isLoading, balance} = tokenData;

  return (
    <div className={toClasses(styles.tokenBalance, isLoading && styles.loading)}>
      <span>{TITLE_TXT}</span>
      <div className={styles.balanceRow}>
        <div className={styles.balance}>
          {isLoading ? <Loading size={LoadingSize.SMALL} /> : utils.wallet.formatBalance(balance)}
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
