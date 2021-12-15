import {useContext, useEffect, useMemo, useState} from 'react';

import {useTransferData} from '../../components/Features/Transfer/Transfer/Transfer.hooks';
import {TokensContext} from './context';

export const useTokens = () => {
  const {isEthereum} = useTransferData();
  const {starknetTokens, ethereumTokens} = useContext(TokensContext);
  const [tokens, setTokens] = useState(isEthereum ? ethereumTokens : starknetTokens);

  useEffect(() => {
    setTokens(isEthereum ? ethereumTokens : starknetTokens);
  }, [isEthereum, starknetTokens, ethereumTokens]);

  return {tokens, starknetTokens, ethereumTokens};
};

export const useStarknetTokens = () => {
  const {starknetTokens} = useContext(TokensContext);

  return starknetTokens;
};

export const useEthereumTokens = () => {
  const {ethereumTokens} = useContext(TokensContext);

  return ethereumTokens;
};

export const useStarknetToken = symbol => {
  const starknetTokens = useStarknetTokens();

  return useMemo(() => starknetTokens.find(token => token.symbol === symbol), [symbol]);
};

export const useEthereumToken = symbol => {
  const ethereumTokens = useEthereumTokens();

  return useMemo(() => ethereumTokens.find(token => token.symbol === symbol), [symbol]);
};
