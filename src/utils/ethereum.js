import {getLogger} from '.';
import {envConfirmationNumber} from '../config/envs';
import {web3} from '../libs';
import {promiseHandler} from './index';

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
  callback = () => {}
) => {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    const [receipt, error] = await promiseHandler(
      contract.methods?.[method](...args).send(options, callback)
    );
    if (receipt) {
      const transactionBlockNumber = receipt.blockNumber;
      logger.log(`Transaction block is ${transactionBlockNumber}`);
      logger.log(`${envConfirmationNumber} Block confirmations required`);
      const emitter = web3.eth.subscribe('newBlockHeaders');
      emitter.on('data', async blockHeader => {
        let confirmationNumber = 0;
        const checkBlockRecursively = async block => {
          if (block.number === transactionBlockNumber) {
            logger.log(`${confirmationNumber} Block confirmations`);
            if (confirmationNumber === envConfirmationNumber) {
              emitter.unsubscribe();
              resolve(receipt);
            }
          } else if (confirmationNumber < envConfirmationNumber) {
            confirmationNumber++;
            const [parent] = await promiseHandler(web3.eth.getBlock(block.parentHash));
            if (parent) {
              await checkBlockRecursively(parent);
            } else {
              // todo
            }
          } else {
            // Didn't find the transaction block on the chain
            emitter.unsubscribe();
            resolve(receipt); // todo
          }
        };
        const [block] = await promiseHandler(web3.eth.getBlock(blockHeader.number));
        if (block) {
          logger.log(`A new block has published - ${block.number}`);
          await checkBlockRecursively(block);
        } else {
          // todo
        }
      });
      emitter.on('error', error => {
        emitter.unsubscribe();
      });
    } else {
      reject(error);
    }
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
