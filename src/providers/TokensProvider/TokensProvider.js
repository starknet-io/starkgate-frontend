import PropTypes from 'prop-types';
import React, {useReducer} from 'react';

import {
  maxDeposit as fetchMaxDeposit,
  maxTotalBalance as fetchMaxTotalBalance
} from '../../api/bridge';
import {useAccountChange, useConstants, useL1TokenBridgeContract, useLogger} from '../../hooks';
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
  const getL1BridgeContract = useL1TokenBridgeContract();
  const getL1TokenBalance = useL1TokenBalance(l1Account);
  const getL2TokenBalance = useL2TokenBalance(l2Account);

  useAccountChange(() => {
    fetchTokensData(tokens.filter(t => t.isL1));
    fetchTokensBalance(tokens);
  });

  const updateTokenBalance = symbol => {
    logger.log(symbol ? `Update ${symbol} token balance` : 'Update all tokens balances');
    const filteredTokens = tokens.filter(t => !symbol || t.symbol === symbol);
    fetchTokensBalance(filteredTokens);
  };

  const fetchTokensBalance = tokens => {
    async function fetchBalance(fn, token, retry = 1) {
      const [balance, error] = await promiseHandler(fn(token));
      if (error) {
        logger.error(
          `Failed to fetch token ${token.symbol} balance: ${error.message}, retry again`
        );
        if (retry === FETCH_TOKEN_BALANCE_MAX_RETRY) {
          return updateToken(token.index, {balance: null, isLoading: false});
        }
        return fetchBalance(fn, token, retry + 1);
      }
      logger.log(`${token.symbol} (${token.isL1 ? 'L1' : 'L2'}) token balance is ${balance}`);
      return updateToken(token.index, {balance, isLoading: false});
    }

    logger.log('Updating tokens balance', tokens);
    tokens.forEach(token => {
      if (!token.isLoading) {
        updateToken(token.index, {isLoading: true});
        return fetchBalance(token.isL1 ? getL1TokenBalance : getL2TokenBalance, token);
      }
    });
  };

  const fetchTokensData = tokens => {
    async function fetchData(token) {
      const bridge = getL1BridgeContract(token.bridgeAddress);
      const [[maxTotalBalance, maxDeposit], error] = await promiseHandler(
        Promise.all([
          fetchMaxTotalBalance({...token, contract: bridge}),
          fetchMaxDeposit({
            ...token,
            contract: bridge
          })
        ])
      );
      if (!error) {
        logger.log(
          `${token.symbol} (${
            token.isL1 ? 'L1' : 'L2'
          }) token data is maxTotalBalance: ${maxTotalBalance}, maxDeposit: ${maxDeposit}`
        );
        return updateToken(token.index, {maxTotalBalance, maxDeposit});
      }
    }

    logger.log('Fetching tokens data', tokens);
    tokens.forEach(async token => fetchData(token));
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
