export type IChainType = {
  [chain: string]: string | number;
};

export enum ChainTypeL1 {
  MAIN = 1,
  GOERLI = 5
}

export enum ChainTypeL2 {
  MAIN = 'SN_MAIN',
  GOERLI = 'SN_GOERLI'
}

export type ChainsType = {
  L1: IChainType;
  L2: IChainType;
};

export const ChainType: ChainsType = {
  L1: ChainTypeL1,
  L2: ChainTypeL2
};

export const isL2Testnet = (chain: ChainTypeL2) => chain === ChainTypeL2.GOERLI;
export const isL2Mainnet = (chain: ChainTypeL2) => chain === ChainTypeL2.MAIN;
export const isL1Testnet = (chain: ChainTypeL1) => chain === ChainTypeL1.GOERLI;
export const isL1Mainnet = (chain: ChainTypeL1) => chain === ChainTypeL1.MAIN;
