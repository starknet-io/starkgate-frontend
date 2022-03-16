import Web3 from 'web3';

let web3;
if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.ethereum || window.web3.currentProvider);
} else {
  web3 = new Web3();
}

web3 = {
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
  },
  ...web3
};

export {web3};
