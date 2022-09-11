import React from 'react';

import {useOnboardingModalTranslation} from '../../../../../hooks';
import styles from './OnboardingModalBody.module.scss';

const OnboardingModalBody = () => {
  const {subtitleTxt, bulletsTxt, incognitoTxt} = useOnboardingModalTranslation();

  return (
    <div className={styles.onboardingModalBody}>
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

export default OnboardingModalBody;
