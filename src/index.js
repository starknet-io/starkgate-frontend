import splitbee from '@splitbee/web';
import {ChainType} from '@starkware-industries/commons-js-enums';
import {
  getLogger,
  getUrlParameter,
  printPackageInfo,
  setLogLevel
} from '@starkware-industries/commons-js-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {App} from './App';
import {ModalWrapper} from './components/UI';
import {ENV, SUPPORTED_L1_CHAIN_ID} from './config/envs';
import './index.scss';
import {AppProviders} from './providers';

printPackageInfo(process.env.REACT_APP_NAME, process.env.REACT_APP_VERSION, '#734d7e');

if (ENV !== 'development') {
  splitbee.init();
}

if (ENV === 'development' || getUrlParameter('debugApp')) {
  setLogLevel(getLogger().DEBUG);
}

document.title += `StarkGate ${
  SUPPORTED_L1_CHAIN_ID === ChainType.L1.GOERLI ? 'Goerli' : ''
} Alpha`;

ReactDOM.render(
  <BrowserRouter>
    <AppProviders>
      <App />
      <ModalWrapper />
    </AppProviders>
  </BrowserRouter>,
  document.getElementById('root')
);
