import PropTypes from 'prop-types';
import React from 'react';

import styles from './MaxButton.module.scss';
import {BTN_TXT} from './MaxButton.strings';

export const MaxButton = ({onClick}) => (
  <div className={styles.maxButton} onClick={onClick}>
    {BTN_TXT}
  </div>
);

MaxButton.propTypes = {
  onClick: PropTypes.func
};
