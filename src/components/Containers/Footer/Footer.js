import React from 'react';

import {ReactComponent as StarkWareLogo} from '../../../assets/svg/starkware.svg';
import {toClasses} from '../../../utils';
import styles from './Footer.module.scss';
import {RIGHTS_TXT} from './Footer.strings';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={toClasses(styles.copyright, 'row')}>
      <StarkWareLogo /> {RIGHTS_TXT}
    </div>
  </footer>
);
