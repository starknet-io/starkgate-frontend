import {useCallback, useContext, useEffect, useMemo, useState} from 'react';

import {useTransferData} from '../../components/Features/Transfer/Transfer.hooks';
import {TokensContext} from './tokens-context';

export const useTokens = () => {
  const {isEthereum} = useTransferData();
  const starknetTokens = useStarknetTokens();
  const ethereumTokens = useEthereumTokens();
  const {updateTokens} = useContext(TokensContext);
  const [tokens, setTokens] = useState(isEthereum ? ethereumTokens : starknetTokens);
  useEffect(() => {
    setTokens(isEthereum ? ethereumTokens : starknetTokens);
  }, [isEthereum, starknetTokens, ethereumTokens]);
  return {tokens, updateTokens};
};

export const useStarknetTokens = () => {
  const {tokens} = useContext(TokensContext);
  return useMemo(() => tokens.filter(t => t.isStarknet), [tokens]);
};

export const useEthereumTokens = () => {
  const {tokens} = useContext(TokensContext);
  return useMemo(() => tokens.filter(t => t.isEthereum), [tokens]);
};

export const useStarknetToken = () => {
  const starknetTokens = useStarknetTokens();
  return useCallback(
    symbol => starknetTokens.find(token => token.symbol === symbol),
    [starknetTokens]
  );
};

export const useEthereumToken = () => {
  const ethereumTokens = useEthereumTokens();
  return useCallback(
    symbol => ethereumTokens.find(token => token.symbol === symbol),
    [ethereumTokens]
  );
};
