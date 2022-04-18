import React from 'react';
import useBreakpoint from 'use-breakpoint';

import {Breakpoint, isMobile} from '../../../enums';
import {useTranslation} from '../../../hooks';
import styles from './Footer.module.scss';

export const Footer = () => {
  const {rightsTxt} = useTranslation('containers.footer');
  const {breakpoint} = useBreakpoint(Breakpoint);

  return !isMobile(breakpoint) ? (
    <footer className={styles.footer}>
      <div className={styles.copyright}>{rightsTxt}</div>
    </footer>
  ) : null;
};
