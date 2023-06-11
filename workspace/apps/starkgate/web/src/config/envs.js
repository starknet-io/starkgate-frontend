import {ChainType, isL1Testnet} from '@starkware-webapps/enums';
import {evaluate} from '@starkware-webapps/utils';

const env = {...import.meta.env, ...window['__env__']};

export const {DEV} = env;
export const AUTO_CONNECT = import.meta.env.VITE_APP_AUTO_CONNECT === 'true';
export const POLL_BLOCK_NUMBER_INTERVAL = Number(env.VITE_APP_POLL_BLOCK_NUMBER_INTERVAL);
export const SUPPORTED_TOKENS = env.VITE_APP_SUPPORTED_TOKENS.split(',');
export const SUPPORTED_L1_CHAIN_ID = Number(env.VITE_APP_SUPPORTED_CHAIN_ID);
export const SUPPORTED_L2_CHAIN_ID = isL1Testnet(SUPPORTED_L1_CHAIN_ID)
  ? ChainType.L2.GOERLI
  : ChainType.L2.MAIN;
export const STARKNET_CONTRACT_ADDRESS = env.VITE_APP_STARKNET_CONTRACT_ADDRESS;
export const ETHERSCAN_URL = env.VITE_APP_ETHERSCAN_URL;
export const ETHERSCAN_TX_URL = tx => evaluate(`${ETHERSCAN_URL}/tx/{{tx}}`, {tx});
export const ETHERSCAN_ACCOUNT_URL = address =>
  evaluate(`${ETHERSCAN_URL}/address/{{address}}`, {address});
export const VOYAGER_URL = env.VITE_APP_VOYAGER_URL;
export const VOYAGER_TX_URL = tx => evaluate(`${VOYAGER_URL}/tx/{{tx}}`, {tx});
export const VOYAGER_ACCOUNT_URL = contract =>
  evaluate(`${VOYAGER_URL}/contract/{{contract}}`, {contract});
export const STARKSCAN_URL = env.VITE_APP_STARKSCAN_URL;
export const STARKSCAN_TX_URL = tx => evaluate(`${STARKSCAN_URL}/tx/{{tx}}`, {tx});
export const STARKSCAN_ETH_TX_URL = tx => evaluate(`${STARKSCAN_URL}/eth-tx/{{tx}}`, {tx});
export const STARKSCAN_ACCOUNT_URL = contract =>
  evaluate(`${STARKSCAN_URL}/contract/{{contract}}`, {contract});
export const LOCAL_STORAGE_ACCEPT_TERMS_KEY = env.VITE_APP_LOCAL_STORAGE_ACCEPT_TERMS;
export const API_ENDPOINT_URL = env.VITE_APP_API_ENDPOINT_URL;
export const SCREENING_SERVICE_URL = evaluate(`${API_ENDPOINT_URL}`, {
  service: env.VITE_APP_SCREENING_SERVICE_NAME
});
export const TRANSFER_LOG_SERVICE_URL = evaluate(`${API_ENDPOINT_URL}`, {
  service: env.VITE_APP_TRANSFER_LOG_SERVICE_NAME
});
export const ENABLE_SCREENING = env.VITE_APP_ENABLE_SCREENING !== 'false';
export const ENABLE_FAST_WITHDRAWAL = env.VITE_APP_ENABLE_FAST_WITHDRAWAL !== 'false';
export const ENABLE_AUTO_WITHDRAWAL = env.VITE_APP_ENABLE_AUTO_WITHDRAWAL !== 'false';
export const DAI_TELEPORT_GATEWAY_CONTRACT_ADDRESS =
  env.VITE_APP_DAI_TELEPORT_GATEWAY_CONTRACT_ADDRESS;
export const DAI_TELEPORT_TARGET_DOMAIN = env.VITE_APP_DAI_TELEPORT_TARGET_DOMAIN;
export const TELEPORT_ORACLE_AUTH_CONTRACT_ADDRESS =
  env.VITE_APP_TELEPORT_ORACLE_AUTH_CONTRACT_ADDRESS;
export const ATTESTATIONS_ORACLE_URL = env.VITE_APP_ATTESTATIONS_ORACLE_URL;
export const GOOGLE_MEASURE_ID = env.VITE_APP_GOOGLE_MEASURE_ID;
export const RELAYER_CONTRACT_ADDRESS = env.VITE_APP_RELAYER_CONTRACT_ADDRESS;
export const RELAYER_GAS_COST_URL = env.VITE_APP_RELAYER_GAS_COST_URL;
