export type IChainType = {
  [chain: string]: string | number;
};

export enum ChainTypeL1 {
  MAIN = 1,
  GOERLI = 5,
  SEPOLIA = 11155111
}

export enum ChainTypeL2 {
  MAIN = '0x534e5f4d41494e',
  GOERLI = '0x534e5f474f45524c49',
  SEPOLIA = '0x534e5f5345504f4c4941'
}

export type ChainsType = {
  L1: IChainType;
  L2: IChainType;
};

export const ChainType: ChainsType = {
  L1: ChainTypeL1,
  L2: ChainTypeL2
};

export const isL2Testnet = (chain: ChainTypeL2) =>
  chain === ChainTypeL2.GOERLI || chain === ChainTypeL2.SEPOLIA;
export const isL2Mainnet = (chain: ChainTypeL2) => chain === ChainTypeL2.MAIN;
export const isL1Testnet = (chain: ChainTypeL1) =>
  chain === ChainTypeL1.GOERLI || chain === ChainTypeL1.SEPOLIA;
export const isL1Mainnet = (chain: ChainTypeL1) => chain === ChainTypeL1.MAIN;
