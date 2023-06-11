import {WalletIdL1, WalletIdL2} from '@starkware-webapps/enums';

export const walletsConfig = {
  L1: [
    {
      id: WalletIdL1.METAMASK,
      name: 'MetaMask',
      connectorId: 'injected',
      logoPath: 'wallets/metamask'
    },
    {
      id: WalletIdL1.COINBASE,
      name: 'Coinbase Wallet',
      connectorId: 'walletlink',
      logoPath: 'wallets/coinbase-wallet'
    }
  ],
  L2: [
    {
      id: WalletIdL2.GSW,
      name: 'Starknet Wallets',
      logoPath: 'chains/starknet'
    }
  ]
};
