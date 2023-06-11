export enum WalletStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error'
}

export const isConnected = (status: WalletStatus) => status === WalletStatus.CONNECTED;
export const isDisconnected = (status: WalletStatus) => status === WalletStatus.DISCONNECTED;
export const isConnecting = (status: WalletStatus) => status === WalletStatus.CONNECTING;
export const isError = (status: WalletStatus) => status === WalletStatus.ERROR;
