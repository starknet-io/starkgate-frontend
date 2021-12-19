import {StoreProvider} from './StoreProvider/StoreProvider';
import {TransactionsProvider} from './TransactionsProvider';
import {WalletProvider} from './WalletProvider/WalletProvider';
import {WalletsProvider} from './WalletsProvider';
import {combineProviders} from './combine-providers';

export const Providers = combineProviders([
  StoreProvider,
  WalletProvider,
  WalletsProvider,
  TransactionsProvider
]);
