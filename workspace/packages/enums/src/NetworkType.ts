export enum NetworkType {
  L1 = 'Ethereum',
  L2 = 'Starknet'
}

export const isL1Network = (network: NetworkType) => network === NetworkType.L1;
export const isL2Network = (network: NetworkType) => network === NetworkType.L2;
