import {BlockHashProvider} from './BlockHashProvider';
import {MenuProvider} from './MenuProvider';
import {StoreProvider} from './StoreProvider/StoreProvider';
import {TransfersProvider} from './TransfersProvider';
import {WalletProvider} from './WalletProvider/WalletProvider';
import {WalletsProvider} from './WalletsProvider';
import {combineProviders} from './combine-providers';

export const Providers = combineProviders([
  MenuProvider,
  StoreProvider,
  WalletProvider,
  WalletsProvider,
  BlockHashProvider,
  TransfersProvider
]);
