import React from 'react';
import useBreakpoint from 'use-breakpoint';

import {Breakpoint, isMobile} from '@enums';
import {useFooterTranslation} from '@hooks';
import {evaluate} from '@starkware-webapps/utils';

import styles from './Footer.module.scss';

export const Footer = () => {
  const {rightsTxt} = useFooterTranslation();
  const {breakpoint} = useBreakpoint(Breakpoint);

  return !isMobile(breakpoint) ? (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        {evaluate(rightsTxt, {fullYear: new Date().getFullYear()})}
      </div>
    </footer>
  ) : null;
};
