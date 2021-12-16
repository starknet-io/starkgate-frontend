import React, {useEffect, useState} from 'react';

import {NetworkType} from '../../../../enums';
import {useTokens} from '../../../../providers/TokensProvider/hooks';
import {useTransferData} from '../Transfer/Transfer.hooks';
import {NetworkMenu} from '../index';

export const StarknetNetwork = () => {
  const {isStarknet, selectedStarknetToken} = useTransferData();
  const {starknetTokens} = useTokens();
  const [tokenData, setTokenData] = useState(selectedStarknetToken || starknetTokens[0]);

  useEffect(() => {
    setTokenData(selectedStarknetToken || starknetTokens[0]);
  }, [starknetTokens]);

  return (
    <NetworkMenu
      isTarget={!isStarknet}
      isTransferring={false}
      networkData={NetworkType.STARKNET}
      tokenData={tokenData}
      onTransferClick={() => {}}
    />
  );
};
