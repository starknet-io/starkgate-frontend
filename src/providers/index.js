import {BlockHashProvider} from './BlockHashProvider';
import {MenuProvider} from './MenuProvider';
import {StoreProvider} from './StoreProvider/StoreProvider';
import {TransferProvider} from './TransferProvider';
import {TransfersLogProvider} from './TransfersLogProvider';
import {WalletProvider} from './WalletProvider/WalletProvider';
import {WalletsProvider} from './WalletsProvider';
import {combineProviders} from './combine-providers';

export const Providers = combineProviders([
  MenuProvider,
  TransferProvider,
  StoreProvider,
  WalletProvider,
  WalletsProvider,
  BlockHashProvider,
  TransfersLogProvider
]);
