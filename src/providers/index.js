import {BlockHashProvider} from './BlockHashProvider';
import {StoreProvider} from './StoreProvider/StoreProvider';
import {ThemeProvider} from './ThemeProvider/ThemeProvider';
import {TransfersProvider} from './TransfersProvider';
import {WalletProvider} from './WalletProvider/WalletProvider';
import {WalletsProvider} from './WalletsProvider';
import {combineProviders} from './combine-providers';

export const Providers = combineProviders([
  StoreProvider,
  WalletProvider,
  WalletsProvider,
  BlockHashProvider,
  TransfersProvider,
  ThemeProvider
]);
