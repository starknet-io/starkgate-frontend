import {useEffect, useState} from 'react';

import {useTransferData} from '../components/Features/Transfer/Transfer/Transfer.hooks';
import TokensEthereum from '../config/tokens/tokens.ethereum';
import TokensStarknet from '../config/tokens/tokens.starknet';

export const useTokens = () => {
  const {action, isEthereum} = useTransferData();
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    setTokens(isEthereum ? TokensEthereum : TokensStarknet);
  }, [action]);

  return tokens;
};
