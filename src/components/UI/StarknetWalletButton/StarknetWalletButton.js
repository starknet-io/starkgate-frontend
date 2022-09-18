import {ChainInfo, NetworkType} from '@starkware-industries/commons-js-enums';
import React from 'react';

import {useEnvsWrapper} from '../../../hooks';
import {useIsL2} from '../../../providers/TransferProvider';
import {useL2Wallet} from '../../../providers/WalletsProvider';
import {NetworkWalletButton} from '../index';

export const StarknetWalletButton = () => {
  const {account, config, error, status} = useL2Wallet();
  const {SUPPORTED_L2_CHAIN_ID} = useEnvsWrapper();
  const [, swapToL2] = useIsL2();

  return (
    <NetworkWalletButton
      account={account}
      chain={ChainInfo.L2[SUPPORTED_L2_CHAIN_ID].NAME}
      error={error}
      logoPath={config?.logoPath || ''}
      network={NetworkType.L2}
      status={status}
      swapFn={swapToL2}
    />
  );
};
