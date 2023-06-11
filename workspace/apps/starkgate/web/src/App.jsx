import {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {ReactComponent as DiscordIcon} from '@assets/svg/icons/discord.svg';
import {Footer, Header} from '@containers';
import {useGoogleFonts} from '@flyyer/use-googlefonts';
import {useAutoConnect, useConstants, useDiscordTabTracking} from '@hooks';
import {useApp, useUnsupportedModal} from '@providers';
import {Bridge, Faq, ProtectedRoute, Terms} from '@routes';
import {isMobile, openInNewTab} from '@starkware-webapps/utils-browser';
import {SideButton, StyledBackground} from '@ui';

import styles from './App.module.scss';

export const App = () => {
  const [trackDiscordClick] = useDiscordTabTracking();
  const {DISCORD_LINK_URL} = useConstants();
  const {isAcceptTerms, isScrollActive} = useApp();
  const showUnsupportedModal = useUnsupportedModal();
  useAutoConnect();
  useGoogleFonts([
    {
      family: 'Inter',
      styles: ['100..800']
    }
  ]);

  useEffect(() => {
    if (isMobile) {
      showUnsupportedModal();
    }
  }, []);

  const onDiscordClick = () => {
    trackDiscordClick();
    openInNewTab(DISCORD_LINK_URL);
  };

  return (
    <div className={styles.app}>
      {!isMobile && (
        <>
          <Header />
          <Footer />
          <StyledBackground withLightAccent={!isScrollActive}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute isAllowed={isAcceptTerms} redirectPath={'/terms'}>
                    <Bridge />
                  </ProtectedRoute>
                }
                path="/"
              />
              <Route element={<Terms />} path="/terms" />
              <Route element={<Faq />} path="/faq" />
              <Route element={<Navigate replace to="/" />} path="*" />
            </Routes>
          </StyledBackground>
          <SideButton icon={<DiscordIcon />} onClick={onDiscordClick} />
        </>
      )}
    </div>
  );
};
