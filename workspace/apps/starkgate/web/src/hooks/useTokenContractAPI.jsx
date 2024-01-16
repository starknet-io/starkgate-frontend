import {useCallback} from 'react';

import {useL1TokenContract, useSendEthereumTransaction} from '@hooks';
import {useEthereumWallet, useSelectedToken, useStarknetWallet} from '@providers';
import {promiseHandler} from '@starkware-webapps/utils';
import {parseFromDecimals, parseFromUint256} from '@starkware-webapps/web3-utils';

export const useTokenContractAPI = () => {
  const selectedToken = useSelectedToken();
  const getL1TokenContract = useL1TokenContract();
  const {ethereumAccount, getEthereumProvider} = useEthereumWallet();
  const {getStarknetProvider} = useStarknetWallet();
  const sendEthereumTransaction = useSendEthereumTransaction();

  const approve = useCallback(
    async ({spender, value}) => {
      const {tokenAddress} = selectedToken;
      const contract = await getL1TokenContract(tokenAddress);
      return await sendEthereumTransaction({
        contract,
        method: 'approve',
        transaction: {from: ethereumAccount},
        args: [spender, value]
      });
    },
    [selectedToken, ethereumAccount, getL1TokenContract, sendEthereumTransaction]
  );

  const allowance = useCallback(
    async ({owner, spender}) => {
      const {tokenAddress, decimals} = selectedToken;
      const contract = await getL1TokenContract(tokenAddress);
      const [allow, error] = await promiseHandler(contract.allowance(owner, spender));
      if (error) {
        return Promise.reject(error);
      }
      return parseFromDecimals(allow, decimals);
    },
    [selectedToken, getL1TokenContract]
  );

  const balanceOfEth = useCallback(
    async account => {
      const provider = await getEthereumProvider();
      if (provider) {
        const [balance, error] = await promiseHandler(provider.getBalance(account));
        if (error) {
          return Promise.reject(error);
        }
        return parseFromDecimals(balance);
      }
    },
    [getEthereumProvider]
  );

  const balanceOfL1 = useCallback(
    async ({account, token}) => {
      const {tokenAddress, decimals} = token || selectedToken;
      const contract = await getL1TokenContract(tokenAddress);
      const [balance, error] = await promiseHandler(contract.balanceOf(account));
      if (error) {
        return Promise.reject(error);
      }
      return parseFromDecimals(balance, decimals);
    },
    [selectedToken, getL1TokenContract]
  );

  const balanceOfL2 = useCallback(
    async ({account, token}) => {
      const provider = getStarknetProvider();
      const {tokenAddress, decimals} = token || selectedToken;
      const [response, error] = await promiseHandler(
        provider.callContract({
          contractAddress: tokenAddress,
          entrypoint: 'balanceOf',
          calldata: [account]
        })
      );
      if (error) {
        return Promise.reject(error);
      }
      const {
        result: [low, high]
      } = response;

      return parseFromUint256({low, high}, decimals);
    },
    [selectedToken, getStarknetProvider]
  );

  return {
    approve,
    allowance,
    balanceOfL1,
    balanceOfL2,
    balanceOfEth
  };
};
