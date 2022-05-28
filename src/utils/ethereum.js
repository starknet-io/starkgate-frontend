import {web3} from '../libs';
import {promiseHandler} from './index';

export const createL1Contract = (address, ABI) => {
  return new web3.eth.Contract(ABI, address);
};

export const callL1Contract = async (contract, method, args = []) => {
  const [response, error] = await promiseHandler(contract.methods?.[method](...args).call());
  if (error) {
    return Promise.reject(error);
  }
  return response;
};

export const sendL1Transaction = async (
  contract,
  method,
  args = [],
  options = {},
  callback = () => {}
) => {
  const [response, error] = await promiseHandler(
    contract.methods?.[method](...args).send(options, callback)
  );
  if (error) {
    return Promise.reject(error);
  }
  return response;
};

export const listenOnce = ({contract, eventName, filter, callback}) => {
  contract.once(eventName, {filter}, callback);
};

export const getPastEvents = ({contract, eventName, filter, options = {}}) => {
  return contract.getPastEvents(eventName, {
    filter,
    ...options
  });
};
