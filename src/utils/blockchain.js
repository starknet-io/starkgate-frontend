import {isRejected, TransactionStatusStep} from '../enums';
import {getStarknet, starknet as starknetjs, web3} from '../libs';

const {compileCalldata, Contract, defaultProvider, stark} = starknetjs;

const starknet = {
  createContract: (address, ABI) => {
    return new Contract(ABI, address);
  },
  callContract: async (contract, method, args = [], blockIdentifier = null) => {
    try {
      return await contract.call(method, ...args, blockIdentifier);
    } catch (ex) {
      return Promise.reject(ex);
    }
  },
  sendTransaction: async (contract, method, args = {}) => {
    try {
      const methodSelector = stark.getSelectorFromName(method);
      const compiledCalldata = compileCalldata(args);
      return getStarknet().signer.invokeFunction(
        contract.connectedTo,
        methodSelector,
        compiledCalldata
      );
    } catch (ex) {
      return Promise.reject(ex);
    }
  },
  waitForTransaction: async (transactionHash, requiredStatus, retryInterval = 5000) => {
    return new Promise((resolve, reject) => {
      let processing = false;
      const intervalId = setInterval(async () => {
        if (processing) return;
        const statusPromise = defaultProvider.getTransactionStatus(transactionHash);
        processing = true;
        try {
          const {tx_status} = await statusPromise;
          if (
            tx_status === requiredStatus ||
            (TransactionStatusStep[tx_status] > TransactionStatusStep[requiredStatus] &&
              !isRejected(tx_status))
          ) {
            clearInterval(intervalId);
            resolve(tx_status);
          } else if (isRejected(tx_status)) {
            clearInterval(intervalId);
            reject();
          } else {
            processing = false;
          }
        } catch (ex) {
          processing = false;
        }
      }, retryInterval);
    });
  }
};

const ethereum = {
  createContract: (address, ABI) => {
    return new web3.eth.Contract(ABI, address);
  },
  callContract: async (contract, method, args = []) => {
    try {
      return await contract.methods?.[method](...args).call();
    } catch (ex) {
      return Promise.reject(ex);
    }
  },
  sendTransaction: async (contract, method, args = [], options = {}, cb = () => {}) => {
    try {
      return contract.methods?.[method](...args).send(options, cb);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }
};

const blockchain = {starknet, ethereum};

export default blockchain;
