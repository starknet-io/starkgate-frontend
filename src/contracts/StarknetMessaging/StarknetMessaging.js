import {web3} from '../../web3';
import {abi} from './StarknetMessaging.json';

const address = '';

export const starkNetMessaging = new web3.eth.Contract(abi, address);
