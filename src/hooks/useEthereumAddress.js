import {useMemo} from 'react';

export const useEthereumAddress = () => useMemo(() => window?.ethereum?.selectedAddress, []);
