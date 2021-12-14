import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App';
import {ModalProvider} from './components/Features';
import './index.scss';
import {Providers} from './providers';
import {getLogger, setLogLevel} from './services';
import {getUrlParameter, printPackageInfo} from './utils';

printPackageInfo(process.env.REACT_APP_NAME, process.env.REACT_APP_VERSION, '#734d7e');

if (process.env.NODE_ENV === 'development' || getUrlParameter('debugApp')) {
  setLogLevel(getLogger().DEBUG);
}

ReactDOM.render(
  <Providers>
    <App />
    <ModalProvider />
  </Providers>,
  document.getElementById('root')
);
