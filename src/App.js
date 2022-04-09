import React from 'react';
import {Route, Routes} from 'react-router-dom';

import styles from './App.module.scss';
import {Footer, Header} from './components/Containers';
import {Index, Terms} from './pages';

export const App = () => (
  <div className={styles.app}>
    <Header />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
    <Footer />
  </div>
);
