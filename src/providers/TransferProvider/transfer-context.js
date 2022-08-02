import {NetworkType} from '@starkware-commons-js/enums';
import {createContext} from 'react';

import {initialState} from './transfer-reducer';

export const TransferContext = createContext({
  ...initialState,
  setAmount: amount => amount,
  selectToken: symbol => symbol,
  setActionType: actionType => actionType,
  setBridgeIsFull: bridgeIsFull => bridgeIsFull,
  isL1: false,
  isL2: false,
  fromNetwork: NetworkType.L1,
  toNetwork: NetworkType.L2,
  amount: 0
});
