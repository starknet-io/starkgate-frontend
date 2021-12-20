import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';

import {pollBalanceInterval} from '../../config/config.json';
import {useLogger} from '../../hooks';
import {useEthereumTokenBalance, useStarknetTokenBalance} from '../../hooks/useTokenBalance';
import {useEthereumWallet, useStarknetWallet} from '../WalletsProvider';
import {TokensContext} from './tokens-context';
import {actions, initialState, reducer} from './tokens-reducer';

export const TokensProvider = ({children}) => {
  const logger = useLogger(TokensProvider.displayName);
  const [tokens, dispatch] = useReducer(reducer, initialState);
  const {account: ethereumAccount} = useEthereumWallet();
  const {account: starknetAccount} = useStarknetWallet();
  const getEthereumTokenBalance = useEthereumTokenBalance(ethereumAccount);
  const getStarknetTokenBalance = useStarknetTokenBalance(starknetAccount);

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
      const getBalance = token.isEthereum ? getEthereumTokenBalance : getStarknetTokenBalance;
      getBalance(tokens[index].tokenAddress)
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

  useEffect(() => {
    updateTokens();
    const intervalId = setInterval(() => {
      updateTokens();
    }, pollBalanceInterval);
    return () => clearInterval(intervalId);
  }, []);

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
