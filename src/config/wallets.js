import {WalletIdL1, WalletIdL2} from '@starkware-industries/commons-js-enums';

export default {
  L1: [
    {
      id: WalletIdL1.METAMASK,
      name: 'MetaMask',
      connectorId: 'injected',
      logoPath: 'wallets/metamask.svg'
    },
    {
      id: WalletIdL1.COINBASE,
      name: 'Coinbase Wallet',
      connectorId: 'walletlink',
      logoPath: 'wallets/coinbase-wallet.svg'
    }
  ],
  L2: [
    {
      id: WalletIdL2.GSW,
      name: 'StarkNet Wallets',
      logoPath: 'wallets/gsw.svg'
    }
  ]
};
