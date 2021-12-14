import {useEffect, useMemo, useState} from 'react';

import {useTransferData} from '../components/Features/Transfer/Transfer/Transfer.hooks';
import {EthereumTokens, StarknetTokens} from '../config/addresses';
import {NetworkType} from '../enums';

export const useTokens = () => {
  const {action, isEthereum} = useTransferData();
  const [tokens, setTokens] = useState([]);
  const memoizedStarknetTokens = useMemo(() => StarknetTokens, []);
  const memoizedEthereumTokens = useMemo(() => [NetworkType.ETHEREUM, ...EthereumTokens], []);

  useEffect(() => {
    setTokens(isEthereum ? memoizedEthereumTokens : memoizedStarknetTokens);
  }, [action]);

  return tokens;
};
