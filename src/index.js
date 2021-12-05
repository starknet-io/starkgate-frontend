import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {UseWalletProvider} from 'use-wallet';

import {App} from './App';
import {ModalProvider} from './components/Features';
import {WalletsProvider} from './components/Features/Wallet/WalletsProvider';
import {
  autoConnect,
  pollBalanceInterval,
  pollBlockNumberInterval,
  supportedChainIds
} from './config/config.json';
import './index.scss';
import {store} from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <UseWalletProvider
      autoConnect={autoConnect}
      connectors={{
        injected: {
          chainId: supportedChainIds
        }
      }}
      pollBalanceInterval={pollBalanceInterval}
      pollBlockNumberInterval={pollBlockNumberInterval}
    >
      <WalletsProvider>
        <App />
        <ModalProvider />
      </WalletsProvider>
    </UseWalletProvider>
  </Provider>,
  document.getElementById('root')
);
