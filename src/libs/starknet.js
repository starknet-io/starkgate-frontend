import {
  getStarknet,
  connect as getStarknetWallet,
  disconnect as resetStarknetWallet
} from 'get-starknet';
import * as starknet from 'starknet';

export {starknet, getStarknet, getStarknetWallet, resetStarknetWallet};
