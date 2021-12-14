import {useEffect, useMemo, useState} from 'react';

import {useTransferData} from '../components/Features/Transfer/Transfer/Transfer.hooks';
import {EthereumTokens, StarknetTokens} from '../config/addresses';
import {NetworkType} from '../enums';

export const useTokens = () => {
  const {isEthereum} = useTransferData();
  const [tokens, setTokens] = useState([]);
  const ethereumTokens = useEthereumTokens();
  const starknetTokens = useStarknetTokens();

  useEffect(() => {
    setTokens(isEthereum ? ethereumTokens : starknetTokens);
  }, [isEthereum]);

  return tokens;
};

export const useStarknetTokens = () => useMemo(() => StarknetTokens, []);

export const useEthereumTokens = () => useMemo(() => [NetworkType.ETHEREUM, ...EthereumTokens], []);

export const useStarknetToken = symbol => {
  const starknetTokens = useStarknetTokens();

  return useMemo(() => starknetTokens.find(token => token.symbol === symbol), [symbol]);
};

export const useEthereumToken = symbol => {
  const ethereumTokens = useEthereumTokens();

  return useMemo(() => ethereumTokens.find(token => token.symbol === symbol), [symbol]);
};
