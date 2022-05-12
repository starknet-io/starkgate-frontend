import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import styles from './App.module.scss';
import {Footer, Header} from './components/Containers';
import {StyledBackground} from './components/UI';
import {useBuyProviders} from './hooks';
import {useApp, useLogin} from './providers/AppProvider';
import {Bridge, Buy, Faq, Login, ProtectedRoute, Terms} from './routes';

export const App = () => {
  const {isAcceptTerms} = useApp();
  const {pathname} = useLocation();
  const {isLoggedIn} = useLogin();
  const buyProviders = useBuyProviders();

  return (
    <div className={styles.app}>
      <Header />
      <StyledBackground withLightAccent={!['/terms', '/faq'].includes(pathname)}>
        <Routes>
          <Route
            element={
              <ProtectedRoute isAllowed={isAcceptTerms} redirectPath={'/terms'}>
                {isLoggedIn ? <Bridge /> : <Login />}
              </ProtectedRoute>
            }
            path="/"
          />
          <Route element={<Terms />} path="/terms" />
          <Route element={<Faq />} path="/faq" />
          {!!buyProviders.length && <Route element={<Buy />} path="/buy" />}
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </StyledBackground>
      <Footer />
    </div>
  );
};
