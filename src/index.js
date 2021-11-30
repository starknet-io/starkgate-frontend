import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {UseWalletProvider} from 'use-wallet';

import {App} from './App';
import {ModalProvider} from './components/Features';
import {WalletsProvider} from './components/Features/Wallet/WalletsProvider';
import supportedChains from './config/supported-chains.json';
import './index.scss';
import {store} from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <UseWalletProvider
      autoConnect={false}
      connectors={{
        injected: {
          chainId: supportedChains
        }
      }}
      pollBalanceInterval={2000}
      pollBlockNumberInterval={5000}
    >
      <WalletsProvider>
        <App />
        <ModalProvider />
      </WalletsProvider>
    </UseWalletProvider>
  </Provider>,
  document.getElementById('root')
);
