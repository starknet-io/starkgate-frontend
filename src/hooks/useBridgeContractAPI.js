import {useCallback} from 'react';

import {useL1Token} from '../providers/TokensProvider';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet} from '../providers/WalletsProvider';
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
  useL2TokenBridgeContract,
  useL2TokenContract
} from './useContract';

export const useBridgeContractAPI = () => {
  const {account: accountL1} = useL1Wallet();
  const selectedToken = useSelectedToken();
  const getL1BridgeContract = useL1TokenBridgeContract();
  const getL2BridgeContract = useL2TokenBridgeContract();
  const getL2TokenContract = useL2TokenContract();
  const getL1Token = useL1Token();

  const deposit = useCallback(
    ({recipient, amount, emitter}) => {
      const {bridgeAddress, decimals} = selectedToken;
      const contract = getL1BridgeContract(bridgeAddress);

      return sendL1Transaction(
        contract,
        'deposit',
        [parseToDecimals(amount, decimals), recipient],
        {from: accountL1},
        emitter
      );
    },
    [selectedToken, accountL1, getL1BridgeContract]
  );

  const depositEth = useCallback(
    ({recipient, amount, emitter}) => {
      const {bridgeAddress} = selectedToken;
      const contract = getL1BridgeContract(bridgeAddress);

      return sendL1Transaction(
        contract,
        'deposit',
        [recipient],
        {
          from: accountL1,
          value: parseToDecimals(amount)
        },
        emitter
      );
    },
    [selectedToken, accountL1, getL1BridgeContract]
  );

  const withdraw = useCallback(
    ({recipient, amount, symbol, emitter}) => {
      const {bridgeAddress, decimals} = symbol ? getL1Token(symbol) : selectedToken;
      const contract = getL1BridgeContract(bridgeAddress);

      return sendL1Transaction(
        contract,
        'withdraw',
        [parseToDecimals(amount, decimals), recipient],
        {
          from: recipient
        },
        emitter
      );
    },
    [selectedToken, getL1BridgeContract, getL1Token]
  );

  const maxDeposit = useCallback(
    async token => {
      const {bridgeAddress, decimals} = token || selectedToken;
      const contract = getL1BridgeContract(bridgeAddress);

      const [maxDeposit, error] = await promiseHandler(callL1Contract(contract, 'maxDeposit'));
      if (error) {
        return Promise.reject(error);
      }
      return parseFromDecimals(maxDeposit, decimals);
    },
    [selectedToken, getL1BridgeContract]
  );

  const maxTotalBalance = useCallback(
    async token => {
      const {bridgeAddress, decimals, symbol} = token || selectedToken;
      const contract = getL1BridgeContract(bridgeAddress);

      const [maxTotalBalance, error] = await promiseHandler(
        callL1Contract(contract, isDai(symbol) ? 'ceiling' : 'maxTotalBalance')
      );
      if (error) {
        return Promise.reject(error);
      }
      return parseFromDecimals(maxTotalBalance, decimals);
    },
    [selectedToken, getL1BridgeContract]
  );

  const initiateWithdraw = useCallback(
    async ({recipient, amount}) => {
      const {bridgeAddress, tokenAddress, decimals, symbol} = selectedToken;
      const bridge = getL2BridgeContract(bridgeAddress);
      const token = getL2TokenContract(tokenAddress);

      return sendL2Transaction([
        ...(isDai(symbol)
          ? [
              {
                contract: token,
                method: 'increaseAllowance',
                args: {
                  spender: bridge.address,
                  amount: parseToUint256(amount, decimals)
                }
              }
            ]
          : []),
        {
          contract: bridge,
          method: 'initiate_withdraw',
          args: {
            l1Recipient: parseToFelt(recipient),
            amount: parseToUint256(amount, decimals)
          }
        }
      ]);
    },
    [selectedToken, getL2BridgeContract, getL2TokenContract]
  );

  return {
    deposit,
    depositEth,
    withdraw,
    maxDeposit,
    maxTotalBalance,
    initiateWithdraw
  };
};
