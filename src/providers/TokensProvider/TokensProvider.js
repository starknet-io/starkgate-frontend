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
    fetchEthereumTokensBalances();
    fetchStarknetTokensBalances();
  }, []);

  const fetchEthereumTokensBalances = () => {
    for (let index = 0; index < state.ethereumTokens.length; index++) {
      const getBalance = getEthereumBalances[index];
      updateEthereumTokenState(index, {isLoading: true});
      getBalance()
        .then(balance => {
          updateEthereumTokenState(index, {balance, isLoading: false});
        })
        .catch(() => {
          updateEthereumTokenState(index, {balance: null, isLoading: false});
        });
    }
  };

  const fetchStarknetTokensBalances = () => {
    for (let index = 0; index < state.starknetTokens.length; index++) {
      const getBalance = getStarknetBalances[index];
      updateStarknetTokenState(index, {isLoading: true});
      getBalance()
        .then(balance => {
          updateStarknetTokenState(index, {balance, isLoading: false});
        })
        .catch(() => {
          updateStarknetTokenState(index, {balance: null, isLoading: false});
        });
    }
  };

  const updateEthereumTokenState = (index, args) => {
    dispatch({
      type: actions.UPDATE_ETHEREUM_TOKEN_STATE,
      payload: {
        index,
        args
      }
    });
  };

  const updateStarknetTokenState = (index, args) => {
    dispatch({
      type: actions.UPDATE_STARKNET_TOKEN_STATE,
      payload: {
        index,
        args
      }
    });
  };

  const context = {
    ...state
  };

  return <TokensContext.Provider value={context}>{children}</TokensContext.Provider>;
};
