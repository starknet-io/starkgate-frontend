import {NetworkType} from '../enums';

export const isEth = tokenData => tokenData.symbol === NetworkType.ETHEREUM.symbol;
