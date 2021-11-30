import {web3} from '../../web3';
import {abi} from './StarknetERC20Bridge.json';

const address = '';

export const starkNetERC20Bridge = new web3.eth.Contract(abi, address);
