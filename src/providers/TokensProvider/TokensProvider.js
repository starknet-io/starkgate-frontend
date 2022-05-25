import PropTypes from 'prop-types';
import React, {useReducer} from 'react';

import {useAccountChange, useConstants, useLogger} from '../../hooks';
import {useL1TokenBalance, useL2TokenBalance} from '../../hooks/useTokenBalance';
import {promiseHandler} from '../../utils';
import {useL1Wallet, useL2Wallet} from '../WalletsProvider';
import {TokensContext} from './tokens-context';
import {actions, initialState, reducer} from './tokens-reducer';

export const TokensProvider = ({children}) => {
  const logger = useLogger(TokensProvider.displayName);
  const {FETCH_TOKEN_BALANCE_MAX_RETRY} = useConstants();
  const [tokens, dispatch] = useReducer(reducer, initialState);
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const getL1TokenBalance = useL1TokenBalance(l1Account);
  const getL2TokenBalance = useL2TokenBalance(l2Account);

  useAccountChange(() => {
    fetchBalances(tokens);
  });

  const updateTokenBalance = symbol => {
    logger.log(symbol ? `Update ${symbol} token balance` : 'Update all tokens balances');
    const filteredTokens = tokens.filter(t => !symbol || t.symbol === symbol);
    fetchBalances(filteredTokens);
  };

  const fetchBalances = tokens => {
    logger.log('Tokens to update', tokens);
    tokens.forEach(token => {
      if (!token.isLoading) {
        updateToken(token.index, {isLoading: true});
        return fetchBalance(token.isL1 ? getL1TokenBalance : getL2TokenBalance, token);
      }
    });
  };

  const fetchBalance = async (fn, token, retry = 1) => {
    const [balance, error] = await promiseHandler(fn(token));
    if (error) {
      logger.error(`Failed to fetch token ${token.symbol} balance: ${error.message}, retry again`);
      if (retry === FETCH_TOKEN_BALANCE_MAX_RETRY) {
        return updateToken(token.index, {balance: null, isLoading: false});
      }
      return fetchBalance(fn, token, retry + 1);
    }
    logger.log(`New ${token.isL1 ? 'L1' : 'L2'} ${token.symbol} token balance is ${balance}`);
    return updateToken(token.index, {balance, isLoading: false});
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
