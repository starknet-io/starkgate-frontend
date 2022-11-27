import {ChainType} from '@starkware-industries/commons-js-enums';
import {evaluate} from '@starkware-industries/commons-js-utils';

const env = {...process.env, ...window['__env__']};

export const ENV = env.REACT_APP_ENV;
export const AUTO_CONNECT = env.REACT_APP_AUTO_CONNECT === 'true';
export const POLL_BLOCK_NUMBER_INTERVAL = Number(env.REACT_APP_POLL_BLOCK_NUMBER_INTERVAL);
export const SUPPORTED_TOKENS = env.REACT_APP_SUPPORTED_TOKENS.split(',');
export const SUPPORTED_L1_CHAIN_ID = Number(env.REACT_APP_SUPPORTED_CHAIN_ID);
export const SUPPORTED_L2_CHAIN_ID =
  SUPPORTED_L1_CHAIN_ID === ChainType.L1.GOERLI ? ChainType.L2.GOERLI : ChainType.L2.MAIN;
export const STARKNET_CONTRACT_ADDRESS = env.REACT_APP_STARKNET_CONTRACT_ADDRESS;
export const ETHERSCAN_URL = env.REACT_APP_ETHERSCAN_URL;
export const ETHERSCAN_TX_URL = tx => evaluate(`${ETHERSCAN_URL}/tx/{{tx}}`, {tx});
export const ETHERSCAN_ACCOUNT_URL = address =>
  evaluate(`${ETHERSCAN_URL}/address/{{address}}`, {address});
export const VOYAGER_URL = env.REACT_APP_VOYAGER_URL;
export const VOYAGER_TX_URL = tx => evaluate(`${VOYAGER_URL}/tx/{{tx}}`, {tx});
export const VOYAGER_ACCOUNT_URL = contract =>
  evaluate(`${VOYAGER_URL}/contract/{{contract}}`, {contract});
export const STARKSCAN_URL = env.REACT_APP_STARKSCAN_URL;
export const STARKSCAN_TX_URL = tx => evaluate(`${STARKSCAN_URL}/tx/{{tx}}`, {tx});
export const STARKSCAN_ETH_TX_URL = tx => evaluate(`${STARKSCAN_URL}/eth-tx/{{tx}}`, {tx});
export const STARKSCAN_ACCOUNT_URL = contract =>
  evaluate(`${STARKSCAN_URL}/contract/{{contract}}`, {contract});
export const LOCAL_STORAGE_TRANSFERS_LOG_KEY = env.REACT_APP_LOCAL_STORAGE_TRANSFERS_LOG_KEY;
export const LOCAL_STORAGE_ACCEPT_TERMS_KEY = env.REACT_APP_LOCAL_STORAGE_ACCEPT_TERMS;
export const API_ENDPOINT_URL = env.REACT_APP_API_ENDPOINT_URL;
export const ENABLE_SCREENING = env.REACT_APP_ENABLE_SCREENING !== 'false';
