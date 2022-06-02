import {useCallback, useContext, useEffect, useMemo, useState} from 'react';

import {useTransfer} from '../TransferProvider';
import {TokensContext} from './tokens-context';

export const useTokens = () => {
  const {isL1} = useTransfer();
  const tokensL1 = useL1Tokens();
  const tokensL2 = useL2Tokens();
  const {updateTokenBalance} = useContext(TokensContext);
  const [tokens, setTokens] = useState(isL1 ? tokensL1 : tokensL2);

  useEffect(() => {
    setTokens(isL1 ? tokensL1 : tokensL2);
  }, [isL1, tokensL2, tokensL1]);

  return {tokens, updateTokenBalance};
};

export const useL2Tokens = () => {
  const {tokens} = useContext(TokensContext);

  return useMemo(() => tokens.filter(t => t.isL2), [tokens]);
};

export const useL1Tokens = () => {
  const {tokens} = useContext(TokensContext);

  return useMemo(() => tokens.filter(t => t.isL1), [tokens]);
};

export const useL2Token = () => {
  const tokensL2 = useL2Tokens();

  return useCallback(symbol => tokensL2.find(token => token.symbol === symbol), [tokensL2]);
};

export const useL1Token = () => {
  const tokensL1 = useL1Tokens();

  return useCallback(symbol => tokensL1.find(token => token.symbol === symbol), [tokensL1]);
};
