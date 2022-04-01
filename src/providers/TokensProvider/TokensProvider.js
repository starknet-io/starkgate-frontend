import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';

import constants from '../../config/constants';
import {useLogger} from '../../hooks';
import {useL1TokenBalance, useL2TokenBalance} from '../../hooks/useTokenBalance';
import {useL1Wallet, useL2Wallet} from '../WalletsProvider';
import {TokensContext} from './tokens-context';
import {actions, initialState, reducer} from './tokens-reducer';

const {FETCH_TOKEN_BALANCE_MAX_RETRY} = constants;

export const TokensProvider = ({children}) => {
  const logger = useLogger(TokensProvider.displayName);
  const [tokens, dispatch] = useReducer(reducer, initialState);
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const getL1TokenBalance = useL1TokenBalance(l1Account);
  const getL2TokenBalance = useL2TokenBalance(l2Account);

  useEffect(() => {
    updateTokenBalance();
  }, []);

  const updateTokenBalance = symbol => {
    logger.log(symbol ? `Update ${symbol} token balance` : 'Update all tokens balances');
    const tokensToUpdate = tokens
      .map((t, index) => ({...t, index}))
      .filter(t => !symbol || t.symbol === symbol);
    logger.log('Tokens to update:', {tokensToUpdate});

    tokensToUpdate.forEach(token => {
      if (!token.isLoading) {
        updateToken(token.index, {isLoading: true});
        fetchBalance(token.isL1 ? getL1TokenBalance : getL2TokenBalance, token);
      }
    });
  };

  const fetchBalance = async (fn, token, retry = 1) => {
    try {
      const balance = await fn(token);
      logger.log(`New ${token.isL1 ? 'L1' : 'L2'} ${token.symbol} token balance is ${balance}`);
      return updateToken(token.index, {balance, isLoading: false});
    } catch (ex) {
      logger.error(`Failed to fetch token ${token.symbol} balance: ${ex.message}, retry again`, {
        ex
      });
      if (retry === FETCH_TOKEN_BALANCE_MAX_RETRY) {
        return updateToken(token.index, {balance: null, isLoading: false});
      }
      return fetchBalance(fn, token, retry + 1);
    }
  };

  const updateToken = (index, props) => {
    dispatch({
      type: actions.UPDATE_TOKEN,
      payload: {
        index,
        props
      }
    });
  };

  const context = {
    tokens,
    updateTokenBalance
  };

  return <TokensContext.Provider value={context}>{children}</TokensContext.Provider>;
};

TokensProvider.displayName = 'TokensProvider';

TokensProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
