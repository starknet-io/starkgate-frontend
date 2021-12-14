import {evaluate} from '../../../../utils';

export const LINKS = {
  ETHERSCAN: {
    text: 'etherscan',
    url: (chainName, account) =>
      evaluate('https://{{chainName}}etherscan.io/address/{{account}}', {chainName, account})
  },
  VOYAGER: {
    text: 'voyager',
    url: (chainName, account) =>
      evaluate('https://{{chainName}}voyager.online/contract/{{account}}', {account})
  }
};
