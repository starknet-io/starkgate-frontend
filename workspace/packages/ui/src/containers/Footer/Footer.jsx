import React, {useMemo} from 'react';

import {useTranslation} from '@hooks';
import {evaluate} from '@starkware-webapps/utils';

import styles from './Footer.module.scss';

export const Footer = () => {
  const {RIGHTS_TXT} = useTranslation('Footer');
  const fullYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <center>{evaluate(RIGHTS_TXT, {fullYear})}</center>
      </div>
    </footer>
  );
};
