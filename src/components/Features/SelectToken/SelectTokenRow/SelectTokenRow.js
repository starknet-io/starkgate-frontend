import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {useTokenBalance} from '../../../../hooks/useTokenBalance';
import {useWallets} from '../../../../providers/WalletsProvider/hooks';
import {formatBalance, toClasses} from '../../../../utils';
import {CryptoLogo, Loading} from '../../../UI';
import {CryptoLogoSize} from '../../../UI/CryptoLogo/CryptoLogo.enums';
import {LoadingSize} from '../../../UI/Loading/Loading.enums';
import styles from './SelectTokenRow.module.scss';

export const SelectTokenRow = ({tokenData, onClick}) => {
  const {name, symbol, tokenAddress} = tokenData;
  const [mounted, setMounted] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const {account} = useWallets();
  const getBalance = useTokenBalance(tokenAddress);

  useEffect(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tokenBalance = await getBalance(account);
      if (!mounted) return;
      setBalance(tokenBalance);
    } catch (ex) {
      setError(ex);
    } finally {
      setIsLoading(false);
    }
    return () => setMounted(false);
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
  tokenData: PropTypes.object,
  onClick: PropTypes.func
};
