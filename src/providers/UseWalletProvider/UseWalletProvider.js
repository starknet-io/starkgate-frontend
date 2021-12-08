import PropTypes from 'prop-types';
import React from 'react';
import {UseWalletProvider as UseWalletProviderWrapper} from 'use-wallet';

import {
  autoConnect,
  pollBalanceInterval,
  pollBlockNumberInterval,
  supportedChainIds
} from '../../config/config.json';

export const UseWalletProvider = ({children}) => (
  <UseWalletProviderWrapper
    autoConnect={autoConnect}
    connectors={{
      injected: {
        chainId: supportedChainIds
      }
    }}
    pollBalanceInterval={pollBalanceInterval}
    pollBlockNumberInterval={pollBlockNumberInterval}
  >
    {children}
  </UseWalletProviderWrapper>
);

UseWalletProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
