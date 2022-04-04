import {useCallback, useContext, useEffect, useMemo, useState} from 'react';

import {useTransfer} from '../TransferProvider';
import {TokensContext} from './tokens-context';

export const useTokens = () => {
  const {isL1} = useTransfer();
  const l2Tokens = useL2Tokens();
  const l1Tokens = useL1Tokens();
  const {updateTokenBalance} = useContext(TokensContext);
  const [tokens, setTokens] = useState(isL1 ? l1Tokens : l2Tokens);

  useEffect(() => {
    setTokens(isL1 ? l1Tokens : l2Tokens);
  }, [isL1, l2Tokens, l1Tokens]);

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
  const l2Tokens = useL2Tokens();

  return useCallback(symbol => l2Tokens.find(token => token.symbol === symbol), [l2Tokens]);
};

export const useL1Token = () => {
  const l1Tokens = useL1Tokens();

  return useCallback(symbol => l1Tokens.find(token => token.symbol === symbol), [l1Tokens]);
};
