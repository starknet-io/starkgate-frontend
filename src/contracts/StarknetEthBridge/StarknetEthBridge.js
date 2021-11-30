import {web3} from '../../web3';
import {abi} from './StarknetEthBridge.json';

const address = '';

export const starkNetEthBridge = new web3.eth.Contract(abi, address);
