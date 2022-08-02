import PropTypes from 'prop-types';
import React from 'react';
import {UseWalletProvider as UseWalletProviderWrapper} from 'use-wallet';

import {useEnvs} from '../../hooks';

export const WalletProvider = ({children}) => {
  const {pollBalanceInterval, POLL_BLOCK_NUMBER_INTERVAL, SUPPORTED_L1_CHAIN_ID} = useEnvs();
  return (
    <UseWalletProviderWrapper
      autoConnect={false}
      connectors={{
        injected: {
          chainId: [SUPPORTED_L1_CHAIN_ID]
        }
      }}
      pollBalanceInterval={pollBalanceInterval}
      pollBlockNumberInterval={POLL_BLOCK_NUMBER_INTERVAL}
    >
      {children}
    </UseWalletProviderWrapper>
  );
};

WalletProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
