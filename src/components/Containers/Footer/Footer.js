import React from 'react';
import useBreakpoint from 'use-breakpoint';

import {isMobile, Breakpoint} from '../../../enums';
import styles from './Footer.module.scss';
import {RIGHTS_TXT} from './Footer.strings';

export const Footer = () => {
  const {breakpoint} = useBreakpoint(Breakpoint);

  return !isMobile(breakpoint) ? (
    <footer className={styles.footer}>
      <div className={styles.copyright}>{RIGHTS_TXT}</div>
    </footer>
  ) : null;
};
