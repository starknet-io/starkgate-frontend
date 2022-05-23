import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import styles from './App.module.scss';
import {TrackEvent} from './analytics';
import {ReactComponent as DiscordIcon} from './assets/svg/icons/discord.svg';
import {Footer, Header} from './components/Containers';
import {StyledBackground} from './components/UI';
import {SideButton} from './components/UI/SideButton/SideButton';
import {useBuyProviders, useConstants, useTracking} from './hooks';
import {useApp, useLogin} from './providers/AppProvider';
import {Bridge, Buy, Faq, Login, ProtectedRoute, Terms} from './routes';
import {openInNewTab} from './utils';

export const App = () => {
  const [trackDiscordClick] = useTracking(TrackEvent.DISCORD_TAB_CLICK);
  const {DISCORD_LINK_URL} = useConstants();
  const {isAcceptTerms} = useApp();
  const {pathname} = useLocation();
  const {isLoggedIn} = useLogin();
  const buyProviders = useBuyProviders();
  const isBridgeRoute = !['/terms', '/faq'].includes(pathname);

  const onDiscordClick = () => {
    trackDiscordClick();
    openInNewTab(DISCORD_LINK_URL);
  };

  return (
    <div className={styles.app}>
      <Header />
      <StyledBackground withLightAccent={isBridgeRoute}>
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
      {isBridgeRoute && <SideButton icon={<DiscordIcon />} onClick={onDiscordClick} />}
      <Footer />
    </div>
  );
};
