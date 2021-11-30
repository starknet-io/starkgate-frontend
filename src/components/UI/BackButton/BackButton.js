import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as BackIcon} from '../../../assets/svg/icons/back.svg';
import styles from './BackButton.module.scss';
import {BTN_TXT} from './BackButton.strings';

export const BackButton = ({onClick}) => {
  return (
    <div className={styles.backButton} onClick={onClick}>
      <BackIcon /> {BTN_TXT}
    </div>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func
};
