import {ChainInfo, NetworkType} from '@starkware-industries/commons-js-enums';

import {useEnvsWrapper} from '../../../hooks';
import {useIsL1} from '../../../providers/TransferProvider';
import {useL1Wallet} from '../../../providers/WalletsProvider';
import {NetworkWalletButton} from '../index';

export const EthereumWalletButton = () => {
  const {account, config, error, status} = useL1Wallet();
  const {SUPPORTED_L1_CHAIN_ID} = useEnvsWrapper();
  const [, swapToL1] = useIsL1();

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
