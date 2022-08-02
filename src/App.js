/* eslint-disable */
import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import styles from './App.module.scss';
import {TrackEvent} from './analytics';
import {ReactComponent as DiscordIcon} from './assets/svg/icons/discord.svg';
import {Footer, Header} from './components/Containers';
import {StyledBackground} from './components/UI';
import {SideButton} from './components/UI/SideButton/SideButton';
import {useLiquidityProviders, useConstants, useTracking} from './hooks';
import {useApp, useLogin} from './providers/AppProvider';
import {Bridge, Liquidity, Faq, Login, ProtectedRoute, Terms} from './routes';
import {openInNewTab} from './utils';

export const App = () => {
  const [trackDiscordClick] = useTracking(TrackEvent.DISCORD_TAB_CLICK);
  const {DISCORD_LINK_URL} = useConstants();
  const {isAcceptTerms, isScrollActive} = useApp();
  const {isLoggedIn} = useLogin();
  const liquidityProviders = useLiquidityProviders();

  const onDiscordClick = () => {
    trackDiscordClick();
    openInNewTab(DISCORD_LINK_URL);
  };

  return (
    <div className={styles.app}>
      <Header />
      <Footer />
      <StyledBackground withLightAccent={!isScrollActive}>
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
          {!!liquidityProviders.length && <Route element={<Liquidity />} path="/liquidity" />}
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </StyledBackground>
      {/*<SideButton icon={<DiscordIcon />} onClick={onDiscordClick} />*/}
    </div>
  );
};
