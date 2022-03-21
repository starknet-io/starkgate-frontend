import utils from '../../../../utils';

export const ETHERSCAN_TX_URL = (chainName, transactionHash) =>
  utils.object.evaluate('https://{{chainName}}etherscan.io/tx/{{transactionHash}}', {
    chainName,
    transactionHash
  });
