import PropTypes from 'prop-types';
import React from 'react';

import {NetworkType} from '../../../../enums';
import {useStarknetToken} from '../../../../hooks';
import {useStarknetTokenBalance} from '../../../../hooks/useTokenBalance';
import {useEthereumWallet} from '../../../../providers/WalletsProvider/hooks';
import {useTransferData} from '../Transfer/Transfer.hooks';
import {NetworkMenu} from '../index';

export const StarknetNetwork = ({isTarget}) => {
  const {selectedToken} = useTransferData();
  const {account} = useEthereumWallet();
  const starknetTokenData = useStarknetToken(selectedToken.symbol);
  const getStarknetBalance = useStarknetTokenBalance(starknetTokenData.tokenAddress, account);

  return (
    <NetworkMenu
      getBalance={getStarknetBalance}
      isTarget={isTarget}
      isTransferring={false}
      networkData={NetworkType.STARKNET}
      onTransferClick={() => {}}
    />
  );
};

StarknetNetwork.propTypes = {
  isTarget: PropTypes.bool
};
