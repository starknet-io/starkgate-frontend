import {generateRandomNumber} from '@starkware-webapps/utils';

import {toHexLength} from './parser';

export * from './ethereum';
export * from './parser';
export * from './starknet';
export * from './signature';

export const generateRandomHex = (max = 10_000_000_000) => {
  return toHexLength(generateRandomNumber(max).toString(16));
};
