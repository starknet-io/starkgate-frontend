import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';

import {useEthereumTokenBalance, useStarknetTokenBalance} from '../../hooks/useTokenBalance';
import {useEthereumWallet, useStarknetWallet} from '../WalletsProvider';
import {TokensContext} from './tokens-context';
import {actions, initialState, reducer} from './tokens-reducer';

export const TokensProvider = ({children}) => {
  const [tokens, dispatch] = useReducer(reducer, initialState);
  const {account: ethereumAccount} = useEthereumWallet();
  const {account: starknetAccount} = useStarknetWallet();
  const getEthereumTokenBalance = useEthereumTokenBalance(ethereumAccount);
  const getStarknetTokenBalance = useStarknetTokenBalance(starknetAccount);

  useEffect(() => {
    updateTokens();
  }, []);

  const updateTokens = () => {
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];
      const getBalance = token.isEthereum ? getEthereumTokenBalance : getStarknetTokenBalance;
      updateTokenState(index, {isLoading: true});
      getBalance(tokens[index].tokenAddress)
        .then(balance => {
          updateTokenState(index, {balance, isLoading: false});
        })
        .catch(() => {
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

TokensProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
