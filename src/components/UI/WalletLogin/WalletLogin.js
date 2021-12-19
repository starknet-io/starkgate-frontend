import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as ForwardIcon} from '../../../assets/svg/icons/forward.svg';
import {capitalize} from '../../../utils';
import {DynamicIcon} from '../index';
import styles from './WalletLogin.module.scss';

export const WalletLogin = ({name, description, logoPath, onClick}) => (
  <>
    <div className={styles.walletLogin} onClick={onClick}>
      <div className={styles.left}>
        <DynamicIcon path={logoPath} size={41} />
        <div className={styles.text}>
          <div className={styles.title}>{capitalize(name)}</div>
          <div className={styles.description}>{capitalize(description)}</div>
        </div>
      </div>
      <ForwardIcon />
    </div>
    <div className={styles.separator} />
  </>
);

WalletLogin.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  logoPath: PropTypes.string,
  onClick: PropTypes.func
};
