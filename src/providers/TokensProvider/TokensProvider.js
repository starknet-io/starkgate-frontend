import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';

import {useEthereumTokensBalances, useStarknetTokensBalances} from '../../hooks/useTokenBalance';
import {useEthereumWallet, useStarknetWallet} from '../WalletsProvider/hooks';
import {TokensContext} from './context';
import {actions, initialState, reducer} from './reducer';

export const TokensProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {account: ethereumAccount} = useEthereumWallet();
  const {account: starknetAccount} = useStarknetWallet();
  const getEthereumBalances = useEthereumTokensBalances(
    state.ethereumTokens.map(token => token.tokenAddress),
    ethereumAccount
  );
  const getStarknetBalances = useStarknetTokensBalances(
    state.starknetTokens.map(token => token.tokenAddress),
    starknetAccount
  );

  useEffect(() => {
    fetchEthereumBalances();
    fetchStarknetBalances();
  }, []);

  const fetchEthereumBalances = () => {
    fetchTokensBalances(state.ethereumTokens, getEthereumBalances, updateEthereumTokenState);
  };

  const fetchStarknetBalances = () => {
    fetchTokensBalances(state.starknetTokens, getStarknetBalances, updateStarknetTokenState);
  };

  const fetchTokensBalances = (tokens, getBalances, updateState) => {
    for (let index = 0; index < tokens.length; index++) {
      const getBalance = getBalances[index];
      updateState(index, {isLoading: true});
      getBalance()
        .then(balance => {
          updateState(index, {balance, isLoading: false});
        })
        .catch(() => {
          updateState(index, {balance: null, isLoading: false});
        });
    }
  };

  const updateEthereumTokenState = (index, args) => {
    updateTokenState(actions.UPDATE_ETHEREUM_TOKEN_STATE, index, args);
  };

  const updateStarknetTokenState = (index, args) => {
    updateTokenState(actions.UPDATE_STARKNET_TOKEN_STATE, index, args);
  };

  const updateTokenState = (type, index, args) => {
    dispatch({
      type,
      payload: {
        index,
        args
      }
    });
  };

  const context = {
    ...state,
    fetchEthereumBalances,
    fetchStarknetBalances
  };

  return <TokensContext.Provider value={context}>{children}</TokensContext.Provider>;
};

TokensProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
