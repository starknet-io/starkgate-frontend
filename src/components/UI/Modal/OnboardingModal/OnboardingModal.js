import React from 'react';

import {useOnboardingModalTranslation} from '../../../../hooks';
import styles from './OnboardingModal.module.scss';

const OnboardingModal = () => {
  const {subtitleTxt, bulletsTxt, incognitoTxt} = useOnboardingModalTranslation();

  return (
    <div className={styles.onboardingModal}>
      <h3>{subtitleTxt}</h3>
      <ul>
        {bulletsTxt.map((bullet, i) => (
          <li key={`b-${i}`}>{bullet}</li>
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{__html: incognitoTxt}}></p>
    </div>
  );
};

export default OnboardingModal;
