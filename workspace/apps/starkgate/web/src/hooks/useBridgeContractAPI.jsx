import {getStarknet} from 'get-starknet';
import {useCallback} from 'react';
import {SequencerProvider, number} from 'starknet';

import {RELAYER_CONTRACT_ADDRESS, SUPPORTED_L2_CHAIN_ID} from '@config/envs';
import {
  useConstants,
  useDaiTeleportGatewayContract,
  useEnvs,
  useGasCost,
  useL1TokenBridgeContract,
  useL2EthTokenContract,
  useL2TokenBridgeContract,
  useL2TokenContract,
  useTeleportOracleAuthContract
} from '@hooks';
import {useL1Token, useL1Wallet, useL2Token, useSelectedToken} from '@providers';
import {ChainType} from '@starkware-webapps/enums';
import {promiseHandler} from '@starkware-webapps/utils';
import {
  callContractL1,
  parseFromDecimals,
  parseToDecimals,
  parseToFelt,
  parseToUint256,
  sendTransactionL1,
  sendTransactionL2
} from '@starkware-webapps/web3-utils';
import {isDai} from '@utils';

const networkMap = {
  [ChainType.L2.MAIN]: 'mainnet-alpha',
  [ChainType.L2.GOERLI]: 'goerli-alpha'
};

const sequencerProvider = new SequencerProvider({
  network: networkMap[SUPPORTED_L2_CHAIN_ID]
});

export const useBridgeContractAPI = () => {
  const {account: accountL1} = useL1Wallet();
  const selectedToken = useSelectedToken();
  const getL1BridgeContract = useL1TokenBridgeContract();
  const getL2BridgeContract = useL2TokenBridgeContract();
  const getL2TokenContract = useL2TokenContract();
  const getL1Token = useL1Token();
  const getL2Token = useL2Token();
  const {DAI_TELEPORT_TARGET_DOMAIN} = useEnvs();
  const {TELEPORT_FEE_MULTIPLIER} = useConstants();
  const daiTeleportGatewayContract = useDaiTeleportGatewayContract();
  const teleportOracleAuthContract = useTeleportOracleAuthContract();
  const ethToken = useL2EthTokenContract();
  const fetchGasCost = useGasCost();

  const estimateMessageFee = async (recipient, amount) => {
    const {hexToDecimalString} = number;
    const {bridgeAddress: l1bridgeAddress, decimals, symbol} = selectedToken;
    const {low, high} = parseToUint256(amount, decimals);
    const payload = [recipient, low, high];
    isDai(symbol) && payload.push(hexToDecimalString(accountL1));
    const {bridgeAddress: l2bridgeAddress} = getL2Token(symbol);
    // TODO use get-starknet().provider once sequencer provider will be supported
    const {overall_fee: estimatedFee} = await sequencerProvider.estimateMessageFee({
      from_address: l1bridgeAddress,
      to_address: l2bridgeAddress,
      entry_point_selector: 'handle_deposit',
      payload
    });
    return Number(estimatedFee);
  };

  const deposit = useCallback(
    async ({recipient, amount, emitter}) => {
      const {bridgeAddress, decimals} = selectedToken;
      const contract = getL1BridgeContract(bridgeAddress);
      const estimatedL2Fee = await estimateMessageFee(recipient, amount);

      return sendTransactionL1(
        contract,
        'deposit',
        [parseToDecimals(amount, decimals), recipient],
        {from: accountL1, value: estimatedL2Fee},
        emitter
      );
    },
    [selectedToken, accountL1, getL1BridgeContract]
  );

  const depositEth = useCallback(
    async ({recipient, amount, emitter}) => {
      const {bridgeAddress} = selectedToken;
      const contract = getL1BridgeContract(bridgeAddress);
      const parsedAmount = parseToDecimals(amount);
      const estimatedL2Fee = await estimateMessageFee(recipient, amount);

      return sendTransactionL1(
        contract,
        'deposit',
        [parsedAmount, recipient],
        {
          from: accountL1,
          value: Number(parsedAmount) + estimatedL2Fee
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

      return sendTransactionL1(
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

      const [maxDeposit, error] = await promiseHandler(callContractL1(contract, 'maxDeposit'));
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
        callContractL1(contract, isDai(symbol) ? 'ceiling' : 'maxTotalBalance')
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
      const bridge = getL2BridgeContract(bridgeAddress);
      const token = getL2TokenContract(tokenAddress);
      const gasCost = await (autoWithdrawal ? fetchGasCost() : Promise.resolve(0));
      const transactions = [
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
        ...(autoWithdrawal
          ? [
              {
                contract: ethToken,
                method: 'transfer',
                args: {
                  user: parseToFelt(RELAYER_CONTRACT_ADDRESS),
                  amount: parseToUint256(parseFromDecimals(gasCost))
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
      ];
      return sendTransactionL2(getStarknet().account, transactions);
    },
    [selectedToken, getL2BridgeContract, getL2TokenContract, ethToken, fetchGasCost]
  );

  const initiateTeleport = useCallback(
    async ({recipient, amount}) => {
      const {tokenAddress, decimals} = selectedToken;
      const token = getL2TokenContract(tokenAddress);
      const transactions = [
        {
          contract: token,
          method: 'increaseAllowance',
          args: {
            spender: daiTeleportGatewayContract.address,
            amount: parseToUint256(amount, decimals)
          }
        },
        {
          contract: daiTeleportGatewayContract,
          method: 'initiate_teleport',
          args: {
            target_domain: DAI_TELEPORT_TARGET_DOMAIN,
            receiver: parseToFelt(recipient),
            amount: parseToDecimals(amount, decimals),
            operator: parseToFelt(recipient)
          }
        }
      ];
      return sendTransactionL2(getStarknet().account, transactions);
    },
    [selectedToken, getL2BridgeContract, getL2TokenContract]
  );

  const teleportThreshold = useCallback(async () => {
    const [threshold, error] = await promiseHandler(
      callContractL1(teleportOracleAuthContract, 'threshold')
    );
    if (error) {
      return Promise.reject(error);
    }
    return threshold;
  }, [teleportOracleAuthContract]);

  const requestMint = useCallback(
    async ({amount, customData, emitter}) => {
      const {decimals} = selectedToken;
      const maxFeePercentage = parseToDecimals(
        (TELEPORT_FEE_MULTIPLIER * amount).toFixed(decimals),
        decimals
      );
      return sendTransactionL1(
        teleportOracleAuthContract,
        'requestMint',
        [customData.teleportGUID, customData.signatures, maxFeePercentage, '0x0'],
        {from: accountL1},
        emitter
      );
    },
    [teleportOracleAuthContract, accountL1]
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
