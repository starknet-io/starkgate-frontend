import {AppProvider} from './AppProvider';
import {MenuProvider} from './MenuProvider';
import {ModalProvider} from './ModalProvider';
import {QueryClientProvider} from './QueryClientProvider/QueryClientProvider';
import {SourceProvider} from './SourceProvider';
import {TokensProvider} from './TokensProvider';
import {TransferLogProvider} from './TransferLogProvider';
import {TransferProvider} from './TransferProvider';
import {WalletProvider} from './WalletProvider/WalletProvider';
import {WalletsProvider} from './WalletsProvider';
import {combineProviders} from './combine-providers';

export * from './AppProvider';
export * from './combine-providers';
export * from './MenuProvider';
export * from './ModalProvider';
export * from './SourceProvider';
export * from './TokensProvider';
export * from './TransferLogProvider';
export * from './TransferProvider';
export * from './WalletProvider/WalletProvider';
export * from './WalletsProvider';

export const AppProviders = combineProviders([
  QueryClientProvider,
  AppProvider,
  MenuProvider,
  TransferProvider,
  ModalProvider,
  WalletProvider,
  WalletsProvider,
  TokensProvider,
  TransferLogProvider,
  SourceProvider
]);
