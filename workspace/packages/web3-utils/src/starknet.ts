import {
  Account,
  Contract,
  RawArgs,
  SequencerProvider,
  hash,
  number,
  stark,
  validateAndParseAddress
} from 'starknet';
import {isHexStrict} from 'web3-utils';

import {
  ChainInfo,
  ChainTypeL2,
  TransactionHashPrefix,
  TransactionStatus,
  TransactionStatusStep,
  isRejected
} from '@starkware-webapps/enums';
import {promiseHandler} from '@starkware-webapps/utils';

type TransactionCall = {
  contract: Contract;
  method: string;
  args: RawArgs;
};

export const callContractL2 = async (
  contract: Contract,
  method: string,
  ...args: Array<any>
): Promise<any> => {
  const [response, error] = await promiseHandler(contract.call(method, args));
  if (error) {
    return Promise.reject(error);
  }
  return response;
};

export const sendTransactionL2 = async (
  account: Account,
  calls: Array<TransactionCall>
): Promise<any> => {
  const transactions = calls.map(({contract, method, args = {}}) => ({
    contractAddress: contract.address,
    entrypoint: method,
    calldata: stark.compileCalldata(args)
  }));
  const [response, error] = await promiseHandler(account.execute(transactions));
  if (error) {
    return Promise.reject(error);
  }
  return response;
};

export const waitForTransaction = async (
  provider: SequencerProvider,
  transactionHash: string,
  requiredStatus: TransactionStatus,
  retryInterval = 5000
): Promise<TransactionStatus> => {
  return new Promise((resolve, reject) => {
    let processing = false;
    const intervalId = setInterval(async () => {
      if (processing) return;
      processing = true;

      const [response, error] = await promiseHandler(
        provider.getTransactionStatus(transactionHash)
      );
      if (error) {
        processing = false;
        return;
      }
      const txStatus: TransactionStatus = TransactionStatus[response.tx_status];
      const txStatusValue: number = TransactionStatusStep[txStatus];
      const reqStatusValue: number = TransactionStatusStep[requiredStatus];
      if (
        txStatus === requiredStatus ||
        (txStatusValue > reqStatusValue && !isRejected(txStatus))
      ) {
        clearInterval(intervalId);
        resolve(txStatus);
      } else if (isRejected(txStatus)) {
        clearInterval(intervalId);
        reject();
      } else {
        processing = false;
      }
    }, retryInterval);
  });
};

export const getTransactionHash = (
  txHashPrefix: TransactionHashPrefix,
  fromAddress: string,
  toAddress: string,
  selector: string,
  payload: Array<string>,
  chainId: ChainTypeL2,
  ...additionalData: Array<any>
): string => {
  const calldata = [number.hexToDecimalString(fromAddress), ...payload];
  const calldataHash = hash.computeHashOnElements(calldata);
  return hash.computeHashOnElements([
    txHashPrefix,
    0, // version
    toAddress,
    selector,
    calldataHash,
    0, // max_fee
    ChainInfo.L2[chainId].ID_PREFIX,
    ...additionalData
  ]);
};

export const toStarknetAddress = (address: string) => {
  if (isHexStrict(address)) {
    return validateAndParseAddress(address);
  }
};
