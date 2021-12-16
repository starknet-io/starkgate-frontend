import PropTypes from 'prop-types';
import React from 'react';

import {formatBalance} from '../../../../utils';
import {Loading} from '../../../UI';
import {LoadingSize} from '../../../UI/Loading/Loading.enums';
import styles from './TokenBalance.module.scss';
import {TITLE_TXT} from './TokenBalance.strings';

export const TokenBalance = ({tokenData}) => {
  const {symbol, isLoading, balance} = tokenData;

  return (
    <div className={styles.tokenBalance}>
      <span>{TITLE_TXT}</span>
      {isLoading && (
        <>
          <br />
          <center>
            <Loading size={LoadingSize.SMALL} />
          </center>
        </>
      )}
      {!isLoading && (
        <div className={styles.balance}>
          {formatBalance(balance)} {symbol}
        </div>
      )}
    </div>
  );
};

TokenBalance.propTypes = {
  tokenData: PropTypes.object
};
