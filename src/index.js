import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App';
import {ModalWrapper} from './components/UI';
import './index.scss';
import {Providers} from './providers';
import utils from './utils';

utils.printPackageInfo(process.env.REACT_APP_NAME, process.env.REACT_APP_VERSION, '#734d7e');

if (process.env.NODE_ENV === 'development' || utils.browser.getUrlParameter('debugApp')) {
  utils.logger.setLogLevel(utils.logger.getLogger().DEBUG);
}

ReactDOM.render(
  <Providers>
    <App />
    <ModalWrapper />
  </Providers>,
  document.getElementById('root')
);
