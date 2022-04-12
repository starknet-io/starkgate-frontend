import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';

import styles from './App.module.scss';
import {Footer, Header} from './components/Containers';
import {StyledBackground} from './components/UI';
import {useApp} from './providers/AppProvider';
import {Faq, Bridge, Login, ProtectedRoute, Terms} from './routes';

export const App = () => {
  const {isLoggedIn, isAcceptTerms} = useApp();
  const {pathname} = useLocation();
  const informativeRoutes = ['/terms', '/faq'];

  return (
    <div className={styles.app}>
      <Header />
      <StyledBackground withLightAccent={!informativeRoutes.includes(pathname)}>
        <Routes>
          <Route
            element={
              <ProtectedRoute
                isAllowed={isLoggedIn && isAcceptTerms}
                redirectPath={isLoggedIn ? '/terms' : '/login'}
              >
                <Bridge />
              </ProtectedRoute>
            }
            path="/"
          />
          <Route element={<Terms />} path="/terms" />
          <Route element={<Login />} path="/login" />
          <Route element={<Faq />} path="/faq" />
        </Routes>
      </StyledBackground>
      <Footer />
    </div>
  );
};
