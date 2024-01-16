import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {DEV, GOOGLE_MEASURE_ID} from '@config/envs';
import {AppProviders} from '@providers';
import {getLogger, setLogLevel} from '@starkware-webapps/js-logger';
import '@starkware-webapps/ui/style.css';
import {promiseHandler} from '@starkware-webapps/utils';
import {
  getUrlParameter,
  loadGoogleAnalytics,
  printPackageInfo
} from '@starkware-webapps/utils-browser';
import {ModalWrapper} from '@ui';

import {App} from './App';
import './index.scss';

async function renderApp() {
  printPackageInfo(APP_NAME, APP_VERSION, '#734d7e');

  if (DEV || getUrlParameter('debugApp')) {
    setLogLevel(getLogger().DEBUG);
  }

  const [, error] = await promiseHandler(loadGoogleAnalytics(GOOGLE_MEASURE_ID));
  if (error) {
    getLogger().warn(error.message);
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <BrowserRouter>
      <AppProviders>
        <App />
        <ModalWrapper />
      </AppProviders>
    </BrowserRouter>
  );
}

renderApp();
