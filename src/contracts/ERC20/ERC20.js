import {web3} from '../../web3';
import {abi} from './ERC20.json';

export const createERC20Contract = address => {
  return new web3.eth.Contract(abi, address);
};
