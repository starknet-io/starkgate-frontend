import {Contract, ContractOptions, EventData, Filter, PastEventOptions} from 'web3-eth-contract';
import {isAddress, padLeft, toHex} from 'web3-utils';

import {EventNameL1} from '@starkware-webapps/enums';
import {promiseHandler} from '@starkware-webapps/utils';

export const callContractL1 = async (
  contract: Contract,
  method: string,
  args: Array<any> = []
): Promise<any> => {
  const [response, error] = await promiseHandler(contract.methods?.[method](...args).call());
  if (error) {
    return Promise.reject(error);
  }
  return response;
};

export const sendTransactionL1 = async (
  contract: Contract,
  method: string,
  args: Array<any> = [],
  options: ContractOptions = {},
  callback: () => void = () => undefined
): Promise<any> => {
  const [response, error] = await promiseHandler(
    contract.methods?.[method](...args).send(options, callback)
  );
  if (error) {
    return Promise.reject(error);
  }
  return response;
};

export const getPastEvents = ({
  contract,
  eventName,
  filter,
  options = {}
}: {
  contract: Contract;
  eventName: EventNameL1;
  filter: Filter;
  options: PastEventOptions;
}): Promise<EventData[]> => {
  return contract.getPastEvents(eventName, {
    filter,
    ...options
  });
};

export const toEthereumAddress = (address: string) => {
  if (isAddress(address)) {
    return padLeft(toHex(address), 40);
  }
};
