import {starknet} from '../libs';

export const hashEquals = (...data) => {
  return !!data.reduce((d1, d2) =>
    starknet.hash.computeHashOnElements(d1) === starknet.hash.computeHashOnElements(d2) ? d1 : ''
  );
};
