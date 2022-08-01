import splitbee from '@splitbee/web';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {App} from './App';
import {ModalWrapper} from './components/UI';
import {ENV} from './config/envs';
import './index.scss';
import {AppProviders} from './providers';
import {getLogger, getUrlParameter, printPackageInfo, setLogLevel} from './utils';

printPackageInfo(process.env.REACT_APP_NAME, process.env.REACT_APP_VERSION, '#734d7e');

if (ENV !== 'development') {
  splitbee.init();
}

if (ENV === 'development' || getUrlParameter('debugApp')) {
  setLogLevel(getLogger().DEBUG);
}

ReactDOM.render(
  <BrowserRouter>
    <AppProviders>
      <App />
      <ModalWrapper />
    </AppProviders>
  </BrowserRouter>,
  document.getElementById('root')
);
