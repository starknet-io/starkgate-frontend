import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';

import {useEthereumTokenBalance, useStarknetTokenBalance} from '../../hooks/useTokenBalance';
import {useEthereumWallet, useStarknetWallet} from '../WalletsProvider';
import {TokensContext} from './tokens-context';
import {actions, initialState, reducer} from './tokens-reducer';

export const TokensProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {account: ethereumAccount} = useEthereumWallet();
  const {account: starknetAccount} = useStarknetWallet();
  const getEthereumTokenBalance = useEthereumTokenBalance(ethereumAccount);
  const getStarknetTokenBalance = useStarknetTokenBalance(starknetAccount);

  useEffect(() => {
    fetchEthereumBalances();
    fetchStarknetBalances();
  }, []);

  const fetchEthereumBalances = () => {
    fetchTokensBalances(state.ethereumTokens, getEthereumTokenBalance, updateEthereumTokenState);
  };

  const fetchStarknetBalances = () => {
    fetchTokensBalances(state.starknetTokens, getStarknetTokenBalance, updateStarknetTokenState);
  };

  const fetchTokensBalances = (tokens, getBalance, updateState) => {
    for (let index = 0; index < tokens.length; index++) {
      updateState(index, {isLoading: true});
      getBalance(tokens[index].tokenAddress)
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
