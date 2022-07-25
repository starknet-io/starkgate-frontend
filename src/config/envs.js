import {ChainType} from '../enums';
import {evaluate} from '../utils';

const appUrlMap = {
  development: process.env.REACT_APP_URL_DEV,
  testing: process.env.REACT_APP_URL_TEST,
  production: process.env.REACT_APP_URL_PROD
};

export const env = process.env.REACT_APP_ENV;
export const appUrl = appUrlMap[env];
export const autoConnect = process.env.REACT_APP_AUTO_CONNECT === 'true';
export const pollBlockNumberInterval = Number(process.env.REACT_APP_POLL_BLOCK_NUMBER_INTERVAL);
export const supportedTokens = process.env.REACT_APP_SUPPORTED_TOKENS.split(',');
export const supportedL1ChainId = Number(process.env.REACT_APP_SUPPORTED_CHAIN_ID);
export const supportedL2ChainId =
  supportedL1ChainId === ChainType.L1.GOERLI ? ChainType.L2.GOERLI : ChainType.L2.MAIN;
export const starknetContractAddress = process.env.REACT_APP_STARKNET_CONTRACT_ADDRESS;
export const etherscanUrl = process.env.REACT_APP_ETHERSCAN_URL;
export const etherscanTxUrl = tx => evaluate(`${etherscanUrl}/tx/{{tx}}`, {tx});
export const etherscanAccountUrl = address =>
  evaluate(`${etherscanUrl}/address/{{address}}`, {address});
export const voyagerUrl = process.env.REACT_APP_VOYAGER_URL;
export const voyagerTxUrl = tx => evaluate(`${voyagerUrl}/tx/{{tx}}`, {tx});
export const voyagerAccountUrl = contract =>
  evaluate(`${voyagerUrl}/contract/{{contract}}`, {contract});
export const localStorageTransfersLogKey = process.env.REACT_APP_LOCAL_STORAGE_TRANSFERS_LOG_KEY;
export const localStorageAcceptTermsKey = process.env.REACT_APP_LOCAL_STORAGE_ACCEPT_TERMS;
export const supportedLiquidityProviders =
  process.env.REACT_APP_SUPPORTED_LIQUIDITY_PROVIDERS?.split(',') || [];
