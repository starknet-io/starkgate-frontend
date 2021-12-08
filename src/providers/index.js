import {CombineWalletsProvider} from './CombineWalletsProvider/CombineWalletsProvider';
import {StoreProvider} from './StoreProvider/StoreProvider';
import {UseWalletProvider} from './UseWalletProvider/UseWalletProvider';
import {combineProviders} from './combine-providers';

export const Providers = combineProviders([
  StoreProvider,
  UseWalletProvider,
  CombineWalletsProvider
]);
