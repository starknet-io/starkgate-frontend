import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as ForwardIcon} from '../../../assets/svg/icons/forward.svg';
import utils from '../../../utils';
import {toClasses} from '../../../utils/object';
import {DynamicIcon} from '../index';
import styles from './WalletLogin.module.scss';

export const WalletLogin = ({name, description, logoPath, isDisabled, onClick}) => (
  <>
    <div
      className={toClasses(styles.walletLogin, isDisabled && styles.isDisabled)}
      onClick={onClick}
    >
      <div className={styles.left}>
        <DynamicIcon path={logoPath} size={41} />
        <div className={styles.text}>
          <div className={styles.title}>{utils.string.capitalize(name)}</div>
          <div className={styles.description}>{utils.string.capitalize(description)}</div>
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
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func
};
