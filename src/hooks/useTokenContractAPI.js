import {useCallback} from 'react';

import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import {
  callL1Contract,
  isDai,
  parseFromDecimals,
  parseToDecimals,
  parseToFelt,
  parseToUint256,
  promiseHandler,
  sendL1Transaction,
  sendL2Transaction
} from '../utils';
import {
  useL1TokenBridgeContract,
  useL1TokenContract,
  useL2TokenBridgeContract,
  useL2TokenContract
} from './useContract';

export const useTokenContractAPI = () => {
  const selectedToken = useSelectedToken();
  const getL1TokenContract = useL1TokenContract();
  const getL2TokenContract = useL2TokenContract();
  const {account: accountL1} = useL1Wallet();
  const {account: accountL2} = useL2Wallet();

  return {};
};
