export type IWalletId = {
  [wallet: string]: string;
};

export enum WalletIdL1 {
  METAMASK = 'metamask',
  COINBASE = 'coinbase'
}

export enum WalletIdL2 {
  GSW = 'gsw'
}

export type WalletIdType = {
  L1: IWalletId;
  L2: IWalletId;
};

export const WalletId: WalletIdType = {
  L1: WalletIdL1,
  L2: WalletIdL2
};
