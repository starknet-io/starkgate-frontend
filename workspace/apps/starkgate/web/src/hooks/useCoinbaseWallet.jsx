import {walletsConfig} from '@config/wallets';
import {useWalletHandler} from '@hooks';
import {NetworkType, WalletIdL1} from '@starkware-webapps/enums';

const config = walletsConfig.L1.find(({id}) => id === WalletIdL1.COINBASE);

export const useCoinbaseWallet = () => {
  const walletHandler = useWalletHandler(config, NetworkType.L1);

  return {
    ...walletHandler,
    ...config
  };
};
