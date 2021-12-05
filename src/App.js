import React from 'react';

import styles from './App.module.scss';
import {Footer, Header, Main} from './components/Containers';

export const App = () => (
  <div className={styles.app}>
    <Header />
    <Main />
    <Footer />
  </div>
);
