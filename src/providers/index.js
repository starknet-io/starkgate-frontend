import {StoreProvider} from './StoreProvider/StoreProvider';
import {TransactionsProvider} from './TransactionsProvider/TransactionsProvider';
import {UseWalletProvider} from './UseWalletProvider/UseWalletProvider';
import {WalletsProvider} from './WalletsProvider/WalletsProvider';
import {combineProviders} from './combine-providers';

export const Providers = combineProviders([
  StoreProvider,
  UseWalletProvider,
  WalletsProvider,
  TransactionsProvider
]);
