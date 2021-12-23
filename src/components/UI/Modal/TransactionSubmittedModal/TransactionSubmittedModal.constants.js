import {evaluate} from '../../../../utils';

export const ETHERSCAN_TX_URL = (chainName, transactionHash) =>
  evaluate('https://{{chainName}}etherscan.io/tx/{{transactionHash}}', {
    chainName,
    transactionHash
  });
