import {useMemo} from 'react';
import {useWallet} from 'use-wallet';
import Web3 from 'web3';

export const useWeb3 = () => {
  const {ethereum} = useWallet();
  // ethereum is the provider when there is only one wallet, otherwise is the ethereum.selectedProvider
  return useMemo(() => ethereum && new Web3(ethereum.selectedProvider || ethereum), [ethereum]);
};
