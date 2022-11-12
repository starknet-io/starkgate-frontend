import {ChainInfo, NetworkType} from '@starkware-industries/commons-js-enums';
import React, {useEffect} from 'react';

import {useEnvs, useStarknetAddress} from '../../../hooks';
import {useIsL2} from '../../../providers/TransferProvider';
import {useL2Wallet} from '../../../providers/WalletsProvider';
import {NetworkWalletButton} from '../index';
import Wallets from '../../../config/wallets.js';

export const StarknetWalletButton = () => {
  const {account, config, error, status, connectWallet} = useL2Wallet();
  const {SUPPORTED_L2_CHAIN_ID} = useEnvs();
  const [, swapToL2] = useIsL2();

  const address = useStarknetAddress();

  useEffect(() => {
    if (address) {
      connectWallet({
        ...Wallets.L2,
        starknetWalletOptions: {showList: false}
      });
    }
  }, [address]);

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
