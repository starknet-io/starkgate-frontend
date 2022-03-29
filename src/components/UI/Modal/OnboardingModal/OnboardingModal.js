import React from 'react';

import styles from './OnboardingModal.module.scss';
import {SUBTITLE_TXT, BULLETS_TXT, INCOGNITO_TXT} from './OnboardingModal.strings';

const OnboardingModal = () => {
  return (
    <div className={styles.onboardingModal}>
      <h3>{SUBTITLE_TXT}</h3>
      <ul>
        {BULLETS_TXT.map((bullet, i) => (
          <li key={`b-${i}`}>{bullet}</li>
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{__html: INCOGNITO_TXT}} />
    </div>
  );
};

export default OnboardingModal;
