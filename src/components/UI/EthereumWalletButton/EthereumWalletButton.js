import {ChainInfo, NetworkType} from '@starkware-industries/commons-js-enums';
import {useEffect} from 'react';
import {useEnvs, useEthereumAddress} from '../../../hooks';
import {useIsL1} from '../../../providers/TransferProvider';
import {useL1Wallet} from '../../../providers/WalletsProvider';
import {NetworkWalletButton} from '../index';
import Wallets from '../../../config/wallets.js';

export const EthereumWalletButton = () => {
  const {account, config, error, status, connectWallet} = useL1Wallet();
  const {SUPPORTED_L1_CHAIN_ID} = useEnvs();
  const [, swapToL1] = useIsL1();
  const ethereumAddress = useEthereumAddress();

  useEffect(() => {
    if (ethereumAddress) {
      connectWallet(Wallets.L1);
    }
  }, [ethereumAddress]);

  return (
    <NetworkWalletButton
      account={account}
      chain={ChainInfo.L1[SUPPORTED_L1_CHAIN_ID].NAME}
      error={error}
      logoPath={config?.logoPath || ''}
      network={NetworkType.L1}
      status={status}
      swapFn={swapToL1}
    />
  );
};
