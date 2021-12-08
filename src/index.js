import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App';
import {ModalProvider} from './components/Features';
import './index.scss';
import {Providers} from './providers';

ReactDOM.render(
  <Providers>
    <App />
    <ModalProvider />
  </Providers>,
  document.getElementById('root')
);
