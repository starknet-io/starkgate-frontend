import React from 'react';

import {ReactComponent as StarkWareLogo} from '../../../assets/svg/starkware.svg';
import {toClasses} from '../../../utils';
import styles from './Footer.module.scss';
import {FOOTER_TXT} from './Footer.strings';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={toClasses(styles.copyright, 'row')}>
        <StarkWareLogo /> {FOOTER_TXT}
      </div>
    </footer>
  );
};
