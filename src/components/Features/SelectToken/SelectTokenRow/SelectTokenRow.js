import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {useTokenBalance} from '../../../../hooks/useTokenBalance';
import {useCombineWallets} from '../../../../providers/CombineWalletsProvider/hooks';
import {formatBalance, toClasses} from '../../../../utils';
import {CryptoLogo, Loading} from '../../../UI';
import {CryptoLogoSize} from '../../../UI/CryptoLogo/CryptoLogo.enums';
import {LoadingSize} from '../../../UI/Loading/Loading.enums';
import styles from './SelectTokenRow.module.scss';

export const SelectTokenRow = ({tokenData, onClick}) => {
  const {name, symbol, address} = tokenData;
  const {account} = useCombineWallets();
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const getBalance = useTokenBalance(address);

  useEffect(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const bal = await getBalance(account);
      setBalance(bal);
    } catch (ex) {
      setError(ex);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div
      className={toClasses(styles.selectTokenRow, isLoading && styles.isLoading)}
      onClick={() => onClick({...tokenData, balance})}
    >
      <hr />
      <div className={styles.data}>
        <div className={styles.left}>
          <CryptoLogo size={CryptoLogoSize.MEDIUM} symbol={symbol} />
          <div>
            <div className={styles.symbol}>{symbol}</div>
            <div className={styles.name}>{name}</div>
          </div>
        </div>
        <div className={styles.right}>
          <>
            {!isLoading ? (
              <div className={styles.balance}>
                {formatBalance(balance)} {symbol}
              </div>
            ) : (
              <Loading size={LoadingSize.SMALL} />
            )}
          </>
        </div>
      </div>
    </div>
  );
};

SelectTokenRow.propTypes = {
  name: PropTypes.string,
  tokenData: PropTypes.object
};
