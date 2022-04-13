import PropTypes from 'prop-types';
import React from 'react';
import {UseWalletProvider as UseWalletProviderWrapper} from 'use-wallet';

import {useConfig} from '../../hooks';

export const WalletProvider = ({children}) => {
  const {pollBalanceInterval, pollBlockNumberInterval, supportedChainId} = useConfig();

  return (
    <UseWalletProviderWrapper
      autoConnect={false}
      connectors={{
        injected: {
          chainId: [supportedChainId]
        }
      }}
      pollBalanceInterval={pollBalanceInterval}
      pollBlockNumberInterval={pollBlockNumberInterval}
    >
      {children}
    </UseWalletProviderWrapper>
  );
};

WalletProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
