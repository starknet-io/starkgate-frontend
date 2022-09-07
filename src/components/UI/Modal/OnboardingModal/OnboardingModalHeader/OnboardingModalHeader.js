import React from 'react';

import {ReactComponent as WarningIcon} from '../../../../../assets/svg/icons/warning-circle.svg';
import {useOnboardingModalTranslation} from '../../../../../hooks';
import styles from './OnboardingModalHeader.module.scss';

const OnboardingModalHeader = () => {
  const {titleTxt} = useOnboardingModalTranslation();

  return (
    <div className={styles.container}>
      <WarningIcon />
      <div className={styles.onboardingModalheader}>{titleTxt}</div>
    </div>
  );
};

export default OnboardingModalHeader;
