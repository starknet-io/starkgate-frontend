import {createContext} from 'react';

import {NetworkType} from '@starkware-webapps/enums';

import {initialState} from './transfer-reducer';

export const TransferContext = createContext({
  ...initialState,
  setAmount: amount => amount,
  selectToken: symbol => symbol,
  setTransferType: TransferType => TransferType,
  setBridgeIsFull: bridgeIsFull => bridgeIsFull,
  setAutoWithdrawal: autoWithdrawal => autoWithdrawal,
  setFastWithdrawal: fastWithdrawal => fastWithdrawal,
  isL1: false,
  isL2: false,
  fromNetwork: NetworkType.L1,
  toNetwork: NetworkType.L2,
  amount: 0
});
