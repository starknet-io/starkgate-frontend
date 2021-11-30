import PropTypes from 'prop-types';
import React from 'react';

import {CryptoLogo} from '../../../UI';
import {CryptoLogoSize} from '../../../UI/CryptoLogo/CryptoLogo.enums';
import styles from './TransferLog.module.scss';

export const TransferLog = ({name, symbol, amount, timestamp}) => {
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
        <div className={styles.amount}>
          {amount} {symbol.toUpperCase()}
        </div>
        <hr />
      </div>
    </>
  );
};

TransferLog.propTypes = {
  name: PropTypes.string,
  symbol: PropTypes.string,
  amount: PropTypes.number,
  timestamp: PropTypes.number
};
