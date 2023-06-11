import PropTypes from 'prop-types';
import React from 'react';

import {formatBalance} from '@starkware-webapps/utils';
import {toClasses} from '@starkware-webapps/utils-browser';
import {CircleLogo, CircleLogoSize, Loading, LoadingSize} from '@ui';

import styles from './SelectTokenRow.module.scss';

export const SelectTokenRow = ({tokenData, onClick}) => {
  const {name, symbol, balance, isLoading} = tokenData;

  return (
    <div
      className={toClasses(styles.selectTokenRow, isLoading && styles.isLoading)}
      onClick={() => onClick(tokenData)}
    >
      <hr />
      <div className={styles.data}>
        <div className={styles.left}>
          <CircleLogo path={`tokens/${symbol}`} size={CircleLogoSize.SMALL} />
          <div>
            <div className={styles.symbol}>{symbol}</div>
            <div className={styles.name}>{name}</div>
          </div>
        </div>
        {
          <div className={styles.right}>
            <>
              {!isLoading ? (
                <div className={styles.balance}>
                  {balance !== undefined && (
                    <div>
                      {`${formatBalance(balance)} `}
                      {symbol}
                    </div>
                  )}
                </div>
              ) : (
                <Loading size={LoadingSize.SMALL} />
              )}
            </>
          </div>
        }
      </div>
    </div>
  );
};

SelectTokenRow.propTypes = {
  name: PropTypes.string,
  tokenData: PropTypes.object,
  onClick: PropTypes.func
};
