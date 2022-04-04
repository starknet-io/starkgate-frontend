import utils from '../utils';

const envs = {
  env: process.env.NODE_ENV,
  autoConnect: Boolean(process.env.REACT_APP_AUTO_CONNECT),
  pollBlockNumberInterval: Number(process.env.REACT_APP_POLL_BLOCK_NUMBER_INTERVAL),
  supportedTokens: process.env.REACT_APP_SUPPORTED_TOKENS.split(','),
  supportedChainIds: process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(' ').map(id => Number(id)),
  starknetContractAddress: process.env.REACT_APP_STARKNET_CONTRACT_ADDRESS,
  etherscanUrl: process.env.REACT_APP_ETHERSCAN_URL,
  etherscanTxUrl: tx =>
    utils.object.evaluate(`${process.env.REACT_APP_ETHERSCAN_URL}/tx/{{tx}}`, {tx}),
  etherscanAccountUrl: address =>
    utils.object.evaluate(`${process.env.REACT_APP_ETHERSCAN_URL}/address/{{address}}`, {address}),
  voyagerUrl: process.env.REACT_APP_VOYAGER_URL,
  voyagerTxUrl: tx => utils.object.evaluate(`${process.env.REACT_APP_VOYAGER_URL}/tx/{{tx}}`, {tx}),
  voyagerAccountUrl: contract =>
    utils.object.evaluate(`${process.env.REACT_APP_VOYAGER_URL}/contract/{{contract}}`, {contract}),
  localStorageTransfersLogKey: process.env.REACT_APP_LOCAL_STORAGE_TRANSFERS_LOG_KEY,
  localStorageOnboardingExpirationTimestampKey:
    process.env.REACT_APP_LOCAL_STORAGE_ONBOARDING_TIMESTAMP_KEY,
  onboardingModalTimeoutHrs: process.env.REACT_APP_ONBOARDING_MODAL_TIMEOUT_HRS
};

export default envs;
