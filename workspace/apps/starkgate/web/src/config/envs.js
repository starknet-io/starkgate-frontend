import {evaluate, mergeDeep} from '@starkware-webapps/utils';
import {toEthereumChainId, toStarknetChainId} from '@starkware-webapps/web3-utils';

const env = mergeDeep({}, import.meta.env, window['__env__']);

export const {DEV} = env;
export const SUPPORTED_TOKENS = env.VITE_APP_SUPPORTED_TOKENS.split(',');
export const CHAIN = env.VITE_APP_CHAIN;
export const SUPPORTED_L1_CHAIN_ID = toEthereumChainId(env.VITE_APP_CHAIN);
export const SUPPORTED_L2_CHAIN_ID = toStarknetChainId(env.VITE_APP_CHAIN);
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
export const VIEWBLOCK_URL = env.VITE_APP_VIEWBLOCK_URL;
export const VIEWBLOCK_TX_URL = tx => evaluate(VIEWBLOCK_URL, {path: `tx/${tx}`});
export const VIEWBLOCK_ACCOUNT_URL = contract =>
  evaluate(VIEWBLOCK_URL, {path: `contract/${contract}`});
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
export const DYNAMIC_ENV_ID = env.VITE_APP_DYNAMIC_ENV_ID;
export const RPC_PROVIDER_INFURA_API_KEY = env.VITE_APP_RPC_PROVIDER_INFURA_API_KEY;
export const RPC_PROVIDER_BLAST_API_KEY = env.VITE_APP_RPC_PROVIDER_BLAST_API_KEY;
export const RPC_PROVIDER_CHAINSTACK_API_KEY = env.VITE_APP_RPC_PROVIDER_CHAINSTACK_API_KEY;
export const ETHEREUM_GAS_MULTIPLIER = Number(env.VITE_APP_ETHEREUM_GAS_MULTIPLIER || 1.15);
