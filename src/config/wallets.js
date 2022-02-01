import {WalletType} from '../enums';

export default [
  {
    id: 'metamask',
    name: 'MetaMask',
    connectorId: 'injected',
    type: WalletType.L1,
    description: 'Login using a browser wallet',
    logoPath: 'wallets/metamask/logo.svg'
  },
  {
    id: 'argent',
    name: 'Argent X',
    type: WalletType.L2,
    description: 'Login using a browser wallet',
    logoPath: 'wallets/argent/logo.svg'
  }
];
