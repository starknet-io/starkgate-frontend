import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Button, FullScreenContainer} from '../../components/UI';
import TermsOfUse from '../../config/terms';
import {useColors, useTermsTracking, useTermsTranslation} from '../../hooks';
import {useTerms} from '../../providers/AppProvider';
import {useL1Wallet, useL2Wallet} from '../../providers/WalletsProvider';
import styles from './Terms.module.scss';

export const Terms = () => {
  const [trackTermsScreen] = useTermsTracking();
  const containerRef = useRef();
  const {isAcceptTerms} = useTerms();
  const [isAcceptButtonEnabled, setIsAcceptButtonEnabled] = useState(false);

  useEffect(() => {
    trackTermsScreen();
  }, []);

  const onScroll = () => {
    if (containerRef.current) {
      const {scrollTop, scrollHeight, clientHeight} = containerRef.current;
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        setIsAcceptButtonEnabled(true);
      }
    }
  };

  return (
    <FullScreenContainer ref={containerRef} onScroll={onScroll}>
      <div className={styles.terms}>
        <Header />
        <div className={styles.text}>{TermsOfUse}</div>
      </div>
      {!isAcceptTerms && <AcceptButton isDisabled={!isAcceptButtonEnabled} />}
    </FullScreenContainer>
  );
};

const Header = () => {
  const {titleTxt, lastRevisedTxt} = useTermsTranslation();

  return (
    <div className={styles.titleContainer}>
      <div className={styles.lastRevised}>{lastRevisedTxt}</div>
      <div className={styles.title}>{titleTxt}</div>
    </div>
  );
};

const AcceptButton = ({isDisabled}) => {
  const [, trackAcceptClick] = useTermsTracking();
  const {acceptBtnTxt} = useTermsTranslation();
  const {acceptTerms} = useTerms();
  const {colorBrilliantAzure, colorWhite, colorBrightNavyBlue, colorLapizLazuli} = useColors();
  const {account: accountL1} = useL1Wallet();
  const {account: accountL2} = useL2Wallet();
  const navigate = useNavigate();
  const appUrl = window.location.origin;

  const accept = () => {
    trackAcceptClick({accountL1, accountL2});
    acceptTerms();
    navigate('/');
  };

  return (
    <div className={styles.acceptButtonContainer}>
      <div className={styles.content}>
        <Button
          colorBackground={isDisabled ? colorLapizLazuli : colorBrilliantAzure}
          colorBackgroundHover={colorBrightNavyBlue}
          colorBorder={colorBrightNavyBlue}
          colorText={colorWhite}
          isDisabled={isDisabled}
          text={acceptBtnTxt}
          onClick={accept}
        />
        <div className={toClasses(styles.text, isDisabled && styles.disabled)}>
          By clicking the &#34;I Accept&#34; button, you are accepting our{' '}
          <a href={`${appUrl}/terms`} rel="noreferrer" target="_blank">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

AcceptButton.propTypes = {
  isDisabled: PropTypes.bool
};
