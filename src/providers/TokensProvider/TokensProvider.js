import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';

import {useLogger} from '../../hooks';
import {useL1TokenBalance, useL2TokenBalance} from '../../hooks/useTokenBalance';
import {useL1Wallet, useL2Wallet} from '../WalletsProvider';
import {TokensContext} from './tokens-context';
import {actions, initialState, reducer} from './tokens-reducer';

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
    const tokensToUpdate = symbol ? tokens.filter(token => token.symbol === symbol) : tokens;
    logger.log('Tokens to update', {tokensToUpdate});
    for (let index = 0; index < tokensToUpdate.length; index++) {
      const token = tokensToUpdate[index];
      if (token.isLoading) {
        logger.log('Token already loading, skip balance update');
        break;
      }
      logger.log(`Update balance for token ${token.symbol}`, {token});
      'balance' in token
        ? logger.log(`Token already have a balance of ${token.balance}, don't set isLoading prop`)
        : updateToken(index, {isLoading: true});
      fetchBalance(token.isL1 ? getL1TokenBalance : getL2TokenBalance, index, token);
    }
  };

  const fetchBalance = async (fn, index, token) => {
    try {
      const balance = await fn(token);
      logger.log(`New ${token.isL1 ? 'L1' : 'L2'} ${token.symbol} token balance is ${balance}`);
      updateToken(index, {balance, isLoading: false});
    } catch (ex) {
      logger.error(`Failed to fetch token ${token.symbol} balance: ${ex.message}, retry again`, {
        ex
      });
      return fetchBalance(fn, index, token);
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
