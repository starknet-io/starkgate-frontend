import React from 'react';

import {ReactComponent as WarningIcon} from '../../../../../assets/svg/icons/warning-2.svg';
import {useOnboardingModalTranslation} from '../../../../../hooks';
import styles from './Header.module.scss';

const Header = () => {
  const {titleTxt} = useOnboardingModalTranslation();

  return (
    <div className={styles.container}>
      <WarningIcon />
      <div className={styles.header}>{titleTxt}</div>
    </div>
  );
};

export default Header;
