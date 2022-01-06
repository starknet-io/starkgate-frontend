export default {
  autoConnect: Boolean(process.env.REACT_APP_AUTO_CONNECT),
  pollBalanceInterval: Number(process.env.REACT_APP_POLL_BALANCE_INTERVAL),
  pollBlockNumberInterval: Number(process.env.REACT_APP_POLL_BLOCK_NUMBER_INTERVAL),
  supportedChainIds: process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(' ').map(id => Number(id))
};
