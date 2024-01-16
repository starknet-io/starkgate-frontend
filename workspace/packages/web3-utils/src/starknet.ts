import {Account, CallData, RawArgs, constants, validateAndParseAddress} from 'starknet';
import {isHexStrict} from 'web3-validator';

import {promiseHandler} from '@starkware-webapps/utils';

import {toHex256} from './index';

export type StarknetNetworkName = constants.NetworkName;
export type StarknetChainId = constants.StarknetChainId;

export const STARK_PRIME = 2n ** 251n + 17n * 2n ** 192n + 1n;
export const STARKNET_ADDRESS_LIMIT = 2n ** 251n - 256n;

type TransactionCall = {
  address: string;
  method: string;
  args: RawArgs;
};

export const sendTransactionL2 = async (
  account: Account,
  calls: Array<TransactionCall>
): Promise<any> => {
  const transactions = calls.map(({address, method, args = {}}) => ({
    contractAddress: address,
    entrypoint: method,
    calldata: CallData.compile(args)
  }));
  const [response, error] = await promiseHandler(account.execute(transactions));
  if (error) {
    return Promise.reject(error);
  }
  return response;
};

export const toStarknetAddress = (address: string) => {
  try {
    if (isHexStrict(address)) {
      // see https://github.com/starknet-io/starknet.js/issues/876
      if (BigInt(address) < STARKNET_ADDRESS_LIMIT) {
        return validateAndParseAddress(address);
      }
    }
  } catch {
    return;
  }
};

export const toStarknetNetwork = (network: string): StarknetNetworkName => {
  switch (network) {
    case 'main':
      return constants.NetworkName.SN_MAIN;
    case 'goerli':
      return constants.NetworkName.SN_GOERLI;
    case 'sepolia':
      return constants.NetworkName.SN_SEPOLIA;
    default:
      return constants.NetworkName.SN_GOERLI;
  }
};

export const toStarknetChainId = (network: string): StarknetChainId => {
  switch (network) {
    case 'main':
      return constants.StarknetChainId.SN_MAIN;
    case 'goerli':
      return constants.StarknetChainId.SN_GOERLI;
    case 'sepolia':
      return constants.StarknetChainId.SN_SEPOLIA;
    default:
      return constants.StarknetChainId.SN_GOERLI;
  }
};

export const generateRandomFeltNumber = () => {
  const u256 = Array(32)
    .fill(0)
    .map(() => Math.round(Math.random() * 0xff))
    .reduce((n, c, i) => n | (BigInt(c) << (BigInt(i) * 8n)), 0n);
  return u256 / STARK_PRIME;
};

export const generateRandomFelt252 = () => {
  const felt = generateRandomFeltNumber();
  return toHex256(felt.toString(16));
};

export function generateStarkSignature() {
  return [generateRandomFelt252(), generateRandomFelt252()];
}
