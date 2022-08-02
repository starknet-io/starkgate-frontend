import {web3} from '../libs';
import {getLogger, promiseHandler} from './index';

const logger = getLogger('Ethereum');

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

export const sendL1Transaction = (
  contract,
  method,
  args = [],
  options = {},
  callback = () => {},
  blockConfirmation = 0
) => {
  return new Promise((resolve, reject) => {
    const emitter = contract.methods?.[method](...args).send(options, callback);
    emitter.on('confirmation', (confirmationNumber, receipt) => {
      logger.log(`${confirmationNumber} block confirmations`);
      if (confirmationNumber === blockConfirmation) {
        emitter.off('confirmation');
        resolve(receipt);
      }
    });
    emitter.on('error', error => {
      reject(error);
    });
  });
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
