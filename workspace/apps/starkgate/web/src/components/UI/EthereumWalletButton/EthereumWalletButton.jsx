import {useEnvs} from '@hooks';
import {useIsL1, useL1Wallet} from '@providers';
import {ChainInfo, NetworkType} from '@starkware-webapps/enums';
import {NetworkWalletButton} from '@ui';

export const EthereumWalletButton = () => {
  const {account, config, error, status} = useL1Wallet();
  const {SUPPORTED_L1_CHAIN_ID} = useEnvs();
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
