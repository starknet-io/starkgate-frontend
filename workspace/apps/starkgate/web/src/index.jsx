import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {DEV, SUPPORTED_L1_CHAIN_ID} from '@config/envs';
import {AppProviders} from '@providers';
import splitbee from '@splitbee/web';
import {isL1Testnet} from '@starkware-webapps/enums';
import {getLogger, setLogLevel} from '@starkware-webapps/js-logger';
import '@starkware-webapps/ui/style.css';
import {getUrlParameter, printPackageInfo} from '@starkware-webapps/utils-browser';
import {ModalWrapper} from '@ui';

import {App} from './App';
import './index.scss';

printPackageInfo(APP_NAME, APP_VERSION, '#734d7e');

if (!DEV) {
  splitbee.init();
}

if (DEV || getUrlParameter('debugApp')) {
  setLogLevel(getLogger().DEBUG);
}

document.title += `StarkGate ${isL1Testnet(SUPPORTED_L1_CHAIN_ID) ? 'Goerli' : ''} Alpha`;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AppProviders>
      <App />
      <ModalWrapper />
    </AppProviders>
  </BrowserRouter>
);
