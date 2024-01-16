import React, {useEffect} from 'react';

import {useEnvs, useHeadTranslation, useTermsTracking, useTermsTranslation, useTitle} from '@hooks';
import {FullScreenContainer} from '@ui';

import styles from './Terms.module.scss';
import TermsOfUse from './TermsOfUse';

export const Terms = () => {
  const [trackTermsScreen] = useTermsTracking();
  const titles = useHeadTranslation('title.terms');

  const {CHAIN} = useEnvs();
  useTitle(titles[CHAIN]);

  useEffect(() => {
    trackTermsScreen();
  }, []);

  return (
    <FullScreenContainer>
      <div className={styles.terms}>
        <Header />
        <div className={styles.text}>{TermsOfUse}</div>
      </div>
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
