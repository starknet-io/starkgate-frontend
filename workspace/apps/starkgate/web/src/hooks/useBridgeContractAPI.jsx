import {BigNumber} from 'ethers';
import {useCallback} from 'react';
import {num} from 'starknet';

import {RELAYER_CONTRACT_ADDRESS} from '@config/envs';
import {
  useConstants,
  useEnvs,
  useGasCost,
  useL1TokenBridgeContract,
  useSendEthereumTransaction,
  useTeleportOracleAuthContract
} from '@hooks';
import {useL1Token, useL2Token, useSelectedToken, useWallets} from '@providers';
import {Tokens} from '@starkgate/shared';
import {promiseHandler} from '@starkware-webapps/utils';
import {
  parseFromDecimals,
  parseToDecimals,
  parseToFelt,
  parseToUint256,
  sendTransactionL2
} from '@starkware-webapps/web3-utils';
import {isDai} from '@utils';

const {hexToDecimalString} = num;

export const useBridgeContractAPI = () => {
  const {ethereumAccount, getStarknetSigner, getStarknetProvider} = useWallets();
  const sendEthereumTransaction = useSendEthereumTransaction();
  const selectedToken = useSelectedToken();
  const getL1BridgeContract = useL1TokenBridgeContract();
  const getL1Token = useL1Token();
  const getL2Token = useL2Token();
  const {TELEPORT_FEE_MULTIPLIER} = useConstants();
  const getTeleportOracleAuthContract = useTeleportOracleAuthContract();
  const fetchGasCost = useGasCost();
  const {SUPPORTED_L2_CHAIN_ID, DAI_TELEPORT_GATEWAY_CONTRACT_ADDRESS, DAI_TELEPORT_TARGET_DOMAIN} =
    useEnvs();

  const estimateMessageFee = useCallback(
    async (recipient, amount) => {
      const provider = getStarknetProvider();
      const {bridgeAddress: l1bridgeAddress, decimals, symbol} = selectedToken;
      const {low, high} = parseToUint256(amount, decimals);
      const payload = [recipient, low, high];
      isDai(symbol) && payload.push(hexToDecimalString(ethereumAccount));
      const {bridgeAddress: l2bridgeAddress} = getL2Token(symbol);
      const {overall_fee: estimatedFee} = await provider.estimateMessageFee({
        from_address: l1bridgeAddress,
        to_address: l2bridgeAddress,
        entry_point_selector: 'handle_deposit',
        payload
      });
      return Number(estimatedFee);
    },
    [selectedToken, getStarknetProvider, ethereumAccount, getL2Token]
  );

  const deposit = useCallback(
    async ({recipient, amount}) => {
      const {bridgeAddress, decimals} = selectedToken;
      const contract = await getL1BridgeContract(bridgeAddress);
      const estimatedL2Fee = await estimateMessageFee(recipient, amount);
      return await sendEthereumTransaction({
        contract,
        method: 'deposit(uint256,uint256)',
        args: [parseToDecimals(amount, decimals), recipient],
        transaction: {
          from: ethereumAccount,
          value: BigNumber.from(estimatedL2Fee).toString()
        }
      });
    },
    [selectedToken, ethereumAccount, getL1BridgeContract, sendEthereumTransaction]
  );

  const depositEth = useCallback(
    async ({recipient, amount}) => {
      const {bridgeAddress} = selectedToken;
      const contract = await getL1BridgeContract(bridgeAddress);
      const parsedAmount = parseToDecimals(amount);
      const estimatedL2Fee = await estimateMessageFee(recipient, amount);
      return await sendEthereumTransaction({
        contract,
        method: 'deposit(uint256,uint256)',
        args: [parsedAmount, recipient],
        transaction: {
          from: ethereumAccount,
          value: BigNumber.from(parsedAmount).add(estimatedL2Fee).toString()
        }
      });
    },
    [selectedToken, ethereumAccount, getL1BridgeContract, sendEthereumTransaction]
  );

  const withdraw = useCallback(
    async ({recipient, amount, symbol}) => {
      const {bridgeAddress, decimals} = symbol ? getL1Token(symbol) : selectedToken;
      const contract = await getL1BridgeContract(bridgeAddress);
      return await sendEthereumTransaction({
        contract,
        method: 'withdraw(uint256,address)',
        args: [parseToDecimals(amount, decimals), recipient],
        transaction: {
          from: ethereumAccount
        }
      });
    },
    [selectedToken, getL1BridgeContract, getL1Token, sendEthereumTransaction]
  );

  const maxDeposit = useCallback(
    async token => {
      const {bridgeAddress, decimals} = token || selectedToken;
      const contract = await getL1BridgeContract(bridgeAddress);
      const [maxDeposit, error] = await promiseHandler(contract.maxDeposit());
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
      const contract = await getL1BridgeContract(bridgeAddress);

      const [maxTotalBalance, error] = await promiseHandler(
        isDai(symbol) ? contract.ceiling() : contract.maxTotalBalance()
      );
      if (error) {
        return Promise.reject(error);
      }
      return parseFromDecimals(maxTotalBalance, decimals);
    },
    [selectedToken, getL1BridgeContract]
  );

  const initiateWithdraw = useCallback(
    async ({recipient, amount, autoWithdrawal}) => {
      const {bridgeAddress, tokenAddress, decimals, symbol} = selectedToken;
      const ethTokenAddress = Tokens.L2.ETH.tokenAddress[SUPPORTED_L2_CHAIN_ID];
      const gasCost = await (autoWithdrawal ? fetchGasCost() : Promise.resolve(0));
      const signer = await getStarknetSigner();
      const transactions = [
        ...(isDai(symbol)
          ? [
              {
                address: tokenAddress,
                method: 'increaseAllowance',
                args: {
                  spender: bridgeAddress,
                  amount: parseToUint256(amount, decimals)
                }
              }
            ]
          : []),
        ...(autoWithdrawal
          ? [
              {
                address: ethTokenAddress,
                method: 'transfer',
                args: {
                  user: parseToFelt(RELAYER_CONTRACT_ADDRESS),
                  amount: parseToUint256(parseFromDecimals(gasCost))
                }
              }
            ]
          : []),
        {
          address: bridgeAddress,
          method: 'initiate_withdraw',
          args: {
            l1Recipient: parseToFelt(recipient),
            amount: parseToUint256(amount, decimals)
          }
        }
      ];
      return sendTransactionL2(signer, transactions);
    },
    [selectedToken, fetchGasCost, getStarknetSigner]
  );

  const initiateTeleport = useCallback(
    async ({recipient, amount}) => {
      const {tokenAddress, decimals} = selectedToken;
      const signer = await getStarknetSigner();
      const transactions = [
        {
          address: tokenAddress,
          method: 'increaseAllowance',
          args: {
            spender: DAI_TELEPORT_GATEWAY_CONTRACT_ADDRESS,
            amount: parseToUint256(amount, decimals)
          }
        },
        {
          address: DAI_TELEPORT_GATEWAY_CONTRACT_ADDRESS,
          method: 'initiate_teleport',
          args: {
            target_domain: DAI_TELEPORT_TARGET_DOMAIN,
            receiver: parseToFelt(recipient),
            amount: parseToDecimals(amount, decimals),
            operator: parseToFelt(recipient)
          }
        }
      ];
      return sendTransactionL2(signer, transactions);
    },
    [selectedToken, getStarknetSigner]
  );

  const teleportThreshold = useCallback(async () => {
    const teleportOracleAuthContract = await getTeleportOracleAuthContract();
    const [threshold, error] = await promiseHandler(teleportOracleAuthContract.threshold());
    if (error) {
      return Promise.reject(error);
    }
    return threshold;
  }, [getTeleportOracleAuthContract]);

  const requestMint = useCallback(
    async ({amount, customData}) => {
      const teleportOracleAuthContract = await getTeleportOracleAuthContract();
      const {decimals} = selectedToken;
      const maxFeePercentage = parseToDecimals(
        (TELEPORT_FEE_MULTIPLIER * amount).toFixed(decimals),
        decimals
      );
      return teleportOracleAuthContract.requestMint(
        customData.teleportGUID,
        customData.signatures,
        maxFeePercentage,
        '0x0',
        {from: ethereumAccount}
      );
    },
    [getTeleportOracleAuthContract, ethereumAccount]
  );
  return {
    deposit,
    depositEth,
    withdraw,
    maxDeposit,
    maxTotalBalance,
    initiateWithdraw,
    initiateTeleport,
    teleportThreshold,
    requestMint
  };
};
