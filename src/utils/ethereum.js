import {web3} from '../libs';

export const createL1Contract = (address, ABI) => {
  return new web3.eth.Contract(ABI, address);
};

export const callL1Contract = async (contract, method, args = []) => {
  try {
    return await contract.methods?.[method](...args).call();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const sendL1Transaction = async (
  contract,
  method,
  args = [],
  options = {},
  cb = () => {}
) => {
  try {
    return contract.methods?.[method](...args).send(options, cb);
  } catch (ex) {
    return Promise.reject(ex);
  }
};
