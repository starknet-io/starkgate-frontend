import React from 'react';

import {useOnboardingModalTranslation} from '../../../../hooks';
import {IncognitoMessage} from '../ModalMessage';
import styles from './OnboardingModal.module.scss';

const OnboardingModal = () => {
  const {subtitleTxt, bulletsTxt} = useOnboardingModalTranslation();

  return (
    <div className={styles.onboardingModal}>
      <h3>{subtitleTxt}</h3>
      <ul>
        {bulletsTxt.map((bullet, i) => (
          <li key={`b-${i}`}>{bullet}</li>
        ))}
      </ul>
      <IncognitoMessage />
    </div>
  );
};

export default OnboardingModal;
