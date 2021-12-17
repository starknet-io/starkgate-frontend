import {useCallback, useContext, useEffect, useMemo, useState} from 'react';

import {useTransferData} from '../../components/Features/Transfer/Transfer/Transfer.hooks';
import {TokensContext} from './context';

export const useTokens = () => {
  const {isEthereum} = useTransferData();
  const {starknetTokens, ethereumTokens} = useContext(TokensContext);
  const [tokens, setTokens] = useState(isEthereum ? ethereumTokens : starknetTokens);
  useEffect(() => {
    setTokens(isEthereum ? ethereumTokens : starknetTokens);
  }, [isEthereum, starknetTokens, ethereumTokens]);
  return tokens;
};

export const useStarknetTokens = () => {
  const {starknetTokens} = useContext(TokensContext);
  return useMemo(() => starknetTokens, [starknetTokens]);
};

export const useEthereumTokens = () => {
  const {ethereumTokens} = useContext(TokensContext);
  return useMemo(() => ethereumTokens, [ethereumTokens]);
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
