import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';

import {useLogger, useConfig} from '../../hooks';
import {useL1TokenBalance, useL2TokenBalance} from '../../hooks/useTokenBalance';
import {useL1Wallet, useL2Wallet} from '../WalletsProvider';
import {TokensContext} from './tokens-context';
import {actions, initialState, reducer} from './tokens-reducer';

export const TokensProvider = ({children}) => {
  const {pollBalanceInterval} = useConfig();
  const logger = useLogger(TokensProvider.displayName);
  const [tokens, dispatch] = useReducer(reducer, initialState);
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const getL1TokenBalance = useL1TokenBalance(l1Account);
  const getL2TokenBalance = useL2TokenBalance(l2Account);

  useEffect(() => {
    updateTokens();
    const intervalId = setInterval(() => {
      updateTokens();
    }, pollBalanceInterval);
    return () => clearInterval(intervalId);
  }, [pollBalanceInterval]);

  const updateTokens = () => {
    logger.log(`It's time to update tokens balances!`);
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];
      if (token.isLoading) {
        logger.log('Token already loading, skip balance update');
        break;
      }
      logger.log(`Update balance for token ${token.symbol}`, {token});
      if (!('balance' in token)) {
        updateTokenState(index, {isLoading: true});
      } else {
        logger.log(`Token already have a balance of ${token.balance}, don't set isLoading prop`);
      }
      const getBalance = token.isL1 ? getL1TokenBalance : getL2TokenBalance;
      getBalance(token)
        .then(balance => {
          logger.log(`New ${token.symbol} token balance is ${balance}`);
          updateTokenState(index, {balance, isLoading: false});
        })
        .catch(ex => {
          logger.error(`Failed to fetch token ${token.symbol} balance: ${ex.message}`, {ex});
          updateTokenState(index, {balance: null, isLoading: false});
        });
    }
  };

  const updateTokenState = (index, args) => {
    dispatch({
      type: actions.UPDATE_TOKEN_STATE,
      payload: {
        index,
        args
      }
    });
  };

  const context = {
    tokens,
    updateTokens
  };

  return <TokensContext.Provider value={context}>{children}</TokensContext.Provider>;
};

TokensProvider.displayName = 'TokensProvider';

TokensProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
