import {evaluate} from '../../../../utils';

export const LINKS = {
  ETHERSCAN: {
    text: 'etherscan',
    url: (chainName, account) =>
      evaluate('https://{{chainName}}.etherscan.io/address/{{account}}', {chainName, account})
  },
  VOYAGER: {
    text: 'voyager',
    url: account => evaluate('https://voyager.online/contract/{{account}}', {account})
  }
};
