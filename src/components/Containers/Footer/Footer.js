import React from 'react';

import styles from './Footer.module.scss';
import {RIGHTS_TXT} from './Footer.strings';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.copyright}>
      <center>{RIGHTS_TXT}</center>
    </div>
  </footer>
);
