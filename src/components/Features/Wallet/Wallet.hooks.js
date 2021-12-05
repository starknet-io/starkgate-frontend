import {useContext} from 'react';

import {WalletsContext} from './Wallets.context';

export const useWallets = () => useContext(WalletsContext);
