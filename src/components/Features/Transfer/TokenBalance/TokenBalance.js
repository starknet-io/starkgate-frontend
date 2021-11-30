import PropTypes from 'prop-types';
import React from 'react';

import {useIsLoading} from '../../../../hooks';
import {formatBalance} from '../../../../utils';
import {Loading} from '../../../UI';
import {LoadingSize} from '../../../UI/Loading/Loading.enums';
import styles from './TokenBalance.module.scss';
import {TITLE_TXT} from './TokenBalance.strings';

export const TokenBalance = ({symbol, balance}) => {
  const isLoading = useIsLoading(symbol);

  return (
    <div className={styles.tokenBalance}>
      {isLoading && <Loading size={LoadingSize.SMALL} />}
      {!isLoading && (
        <>
          <span>{TITLE_TXT}</span>
          <div className={styles.balance}>
            {formatBalance(balance)} {symbol}
          </div>
        </>
      )}
    </div>
  );
};

TokenBalance.propTypes = {
  symbol: PropTypes.string,
  balance: PropTypes.number
};
